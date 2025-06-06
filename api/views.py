from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.db import IntegrityError
from django.db.models import F
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils.timezone import now
from rest_framework import generics, permissions, viewsets, status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from collections import defaultdict
from datetime import timedelta, datetime
import logging
import os
from .models import (
    CustomUser, Goal, Exercise, Meal, SleepLog, Achievement, UserActivity,
    GoalProgress, UserStreak, DailyLog, NutritionLog, Challenge, UserChallenge,
    UserReport, WorkoutPlan, SleepSchedule, Notification, DailyWorkout
)
from .serializers import (
    UserSerializer, GoalSerializer, ExerciseSerializer, MealSerializer,
    SleepLogSerializer, AchievementSerializer, UserActivitySerializer,
    GoalProgressSerializer, UserStreakSerializer, DailyLogSerializer,
    NutritionLogSerializer, ChallengeSerializer, UserChallengeSerializer,
    UserReportSerializer, WorkoutPlanSerializer,
    RegisterSerializer, CustomTokenObtainPairSerializer,
    GoalWithProgressSerializer, SleepScheduleSerializer,
    NotificationSerializer, UserPreferenceSerializer
)
from .utils.activity import calculate_user_streak
from .utils.notifications import send_notification
from .utils.leaderboard import check_and_notify_leaderboard_change
from .utils.sleep import update_daily_sleep_log
from .utils.fitness import estimate_steps_from_exercise

logger = logging.getLogger(__name__)
User = get_user_model()


# --- Password Reset Views ---
@method_decorator(csrf_exempt, name='dispatch')
class CustomPasswordResetView(APIView):
    """
    Custom password reset view to send email with password reset link.
    """
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            reset_link = (
                (
                    f"{os.getenv('FRONTEND_URL')}/reset-password-confirm/"
                    f"{uid}/{token}/"
                )
            )

            send_mail(
                subject='Reset Your FitTrack Password',
                message=(
                    f"Click the link below to reset your password:\n"
                    f"{reset_link}"
                ),
                from_email=os.getenv('EMAIL_HOST_USER'),
                recipient_list=[user.email],
                fail_silently=False,
            )

            return Response(
                {'message': 'Password reset link sent!'},
                status=status.HTTP_200_OK
            )

        except User.DoesNotExist:
            return Response(
                {'error': 'User with that email not found'},
                status=status.HTTP_404_NOT_FOUND
            )


@method_decorator(csrf_exempt, name='dispatch')
class CustomPasswordResetConfirmView(APIView):
    """
    Custom password reset confirm view to reset the user's password.
    """
    def post(self, request):
        uidb64 = request.data.get('uid')
        token = request.data.get('token')
        new_password = request.data.get('new_password')
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response(
                    {'error': 'Invalid or expired token'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user.set_password(new_password)
            user.save()
            return Response({'message': 'Password has been reset.'})
        except Exception:
            return Response(
                {'error': 'Invalid request'},
                status=status.HTTP_400_BAD_REQUEST
            )


# --- Authentication Views ---
class RegisterView(generics.CreateAPIView):
    """
    API view to register a new user.
    """
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# --- Token Authentication Views ---
class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom token obtain pair view to include user information in the token.
    """
    serializer_class = CustomTokenObtainPairSerializer


# --- User Profile Views ---
class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    API view to retrieve and update user profile.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


# --- Goal Views ---
class GoalListView(generics.ListCreateAPIView):
    """
    API view to list and create goals.
    """
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a goal.
    """
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)


# --- Exercise Views ---
class ExerciseViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, update, and delete user-specific exercises.
    """
    serializer_class = ExerciseSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Exercise.objects.none()

    def get_queryset(self):
        user = self.request.user
        queryset = Exercise.objects.filter(user=user)

        date_str = self.request.query_params.get("date")
        if date_str:
            try:
                date = datetime.strptime(date_str, "%Y-%m-%d").date()
                queryset = queryset.filter(date=date)
            except ValueError:
                pass

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# --- Meal Views ---
class MealListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create meals.
    """
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Dummy queryset for DRF compatibility
    queryset = Meal.objects.none()

    def get_queryset(self):
        return Meal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        meal = serializer.save(user=self.request.user)

        print(
            f"[DEBUG] Meal Created: {meal}, "
            f"Type: {meal.meal_type}, "
            f"Water: {meal.water_amount}"
        )

        # Automatically update DailyLog water intake if it's a drink
        if meal.meal_type == "drink" and getattr(meal, "water_amount", 0):
            from datetime import date
            daily_log, _ = DailyLog.objects.get_or_create(
                user=self.request.user,
                date=meal.date or date.today()
            )
            daily_log.water_intake_l = (
                (daily_log.water_intake_l or 0) + meal.water_amount
            )
            daily_log.save()

            print(
                f"[DEBUG] Updated DailyLog water_intake_l to "
                f"{daily_log.water_intake_l}"
            )


class MealDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a meal.
    Automatically adjusts DailyLog water intake for drinks.
    """
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Meal.objects.none()

    def get_queryset(self):
        return Meal.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        old_meal = self.get_object()
        old_water = (
            old_meal.water_amount if old_meal.meal_type == "drink" else 0
        )

        updated_meal = serializer.save()

        new_water = (
            updated_meal.water_amount
            if updated_meal.meal_type == "drink"
            else 0
        )
        delta = new_water - old_water

        if delta != 0:
            from datetime import date
            daily_log, _ = DailyLog.objects.get_or_create(
                user=self.request.user,
                date=updated_meal.date or date.today()
            )
            daily_log.water_intake_l = (daily_log.water_intake_l or 0) + delta
            daily_log.save()

    def perform_destroy(self, instance):
        if instance.meal_type == "drink" and instance.water_amount:
            try:
                daily_log = DailyLog.objects.get(
                    user=self.request.user,
                    date=instance.date
                )
                daily_log.water_intake_l = max(
                    (daily_log.water_intake_l or 0) - instance.water_amount,
                    0
                )
                daily_log.save()
            except DailyLog.DoesNotExist:
                # Nothing to update
                pass

        instance.delete()


# --- SleepLog Views ---
class SleepLogListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create sleep logs.
    """
    serializer_class = SleepLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Prevent DRF errors
    queryset = SleepLog.objects.none()

    def get_queryset(self):
        return SleepLog.objects.filter(
            user=self.request.user
        ).order_by('-date')

    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        update_daily_sleep_log(
            user=self.request.user,
            date=instance.date
        )


class SleepLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a sleep log.
    """
    serializer_class = SleepLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = SleepLog.objects.none()

    def get_queryset(self):
        return SleepLog.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.save(user=self.request.user)
        update_daily_sleep_log(user=self.request.user, date=instance.date)

    def perform_destroy(self, instance):
        user = instance.user
        date = instance.date
        instance.delete()
        update_daily_sleep_log(user=user, date=date)


class SleepScheduleView(generics.RetrieveUpdateAPIView):
    """
    API view to retrieve and update sleep schedule.
    """
    serializer_class = SleepScheduleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj, _ = SleepSchedule.objects.get_or_create(user=self.request.user)
        return obj

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


# --- Achievement Views ---
class AchievementListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create achievements.
    """
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Achievement.objects.none()

    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class AchievementDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete an achievement.
    """
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Achievement.objects.none()

    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user)


# --- User activity streak View ---
class UserActivityStreakView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        activity, _ = UserActivity.objects.get_or_create(user=request.user)
        calculate_user_streak(activity)
        return Response({"streak_count": activity.streak_count})


class UserActivityDetailView(generics.RetrieveUpdateAPIView):
    """
    API view to retrieve or update a user's activity.
    """
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(UserActivity, user=self.request.user)


# --- Goal Progress Views ---
class GoalProgressListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create goal progress entries.
    """
    serializer_class = GoalProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GoalProgress.objects.filter(goal__user=self.request.user)

    def perform_create(self, serializer):
        progress = serializer.save()
        goal = progress.goal

        # Recalculate total progress
        total_progress = sum(
            entry.progress_value for entry in goal.progress_entries.all()
        )
        goal.current_value = total_progress

        # If not already achieved and now meets/exceeds target
        if goal.status != 'achieved' and total_progress >= goal.target_value:
            goal.status = 'achieved'
            goal.save()

            send_notification(
                user=goal.user,
                title="Daily Goal Achieved 🎯",
                message="You've completed today's goal!",
                type="goal"
            )
        else:
            goal.save()


# Retrieve, update or delete a specific progress entry
class GoalProgressDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a goal progress entry.
    """
    serializer_class = GoalProgressSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GoalProgress.objects.filter(goal__user=self.request.user)


# --- User Streak Views ---
class UserStreakView(generics.ListCreateAPIView):
    """
    API view to list and create user streaks.
    """
    serializer_class = UserStreakSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return the streak for the authenticated user
        return UserStreak.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically assign the authenticated user during creation
        serializer.save(user=self.request.user)


# --- Daily Log Views ---
class DailyLogListView(generics.ListCreateAPIView):
    """
    API view to list and create daily logs.
    """
    serializer_class = DailyLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = DailyLog.objects.filter(user=user)

        start_date = self.request.query_params.get('start')
        end_date = self.request.query_params.get('end')

        if start_date and end_date:
            queryset = queryset.filter(date__range=[start_date, end_date])

        return queryset

    def perform_create(self, serializer):
        # Set the user to the currently authenticated user
        serializer.save(user=self.request.user)


class DailyLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a daily log.
    """
    serializer_class = DailyLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter daily logs for the requesting user to ensure users can only
        # access their own logs
        return DailyLog.objects.filter(user=self.request.user)


# --- Nutrition Log Views ---
class NutritionLogListView(generics.ListCreateAPIView):
    """
    API view to list and create nutrition logs.
    """
    serializer_class = NutritionLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter nutrition logs for the requesting user
        return NutritionLog.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user to the currently authenticated user
        serializer.save(user=self.request.user)


class NutritionLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a nutrition log.
    """
    serializer_class = NutritionLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter nutrition logs for the requesting user to ensure users can
        # only access their own logs
        return NutritionLog.objects.filter(user=self.request.user)


# --- Challenge Views ---
class ChallengeListView(generics.ListCreateAPIView):
    """
    API view to list and create challenges owned by the user.
    Enforces only one active challenge at a time for the user when creating.
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only show challenges owned by the current user
        return Challenge.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        user = self.request.user
        today = timezone.now().date()

        # Check if user already has an active challenge
        has_active = UserChallenge.objects.filter(
            user=user,
            challenge__start_date__lte=today,
            challenge__end_date__gte=today
        ).exists()

        if has_active:
            raise ValidationError("You already have an active challenge.")

        challenge = serializer.save(owner=user)

        # Automatically join the user to the created challenge
        UserChallenge.objects.create(user=user, challenge=challenge)


class ChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a challenge.
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Limit access to challenges the user owns
        return Challenge.objects.filter(owner=self.request.user)


# --- Public Challenge List View ---
class PublicChallengeListView(generics.ListAPIView):
    """
    List all challenges not yet joined by the user (public feed).
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        joined_ids = (
            UserChallenge.objects
            .filter(user=user)
            .values_list('challenge_id', flat=True)
        )
        return (
            Challenge.objects
            .filter(is_public=True)
            .exclude(id__in=joined_ids)
            .exclude(owner=user)
        )


# --- Challenge Leaderboard View ---
class ChallengeLeaderboardView(generics.ListAPIView):
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        challenge_id = self.kwargs["challenge_id"]
        return (
            UserChallenge.objects
            .filter(challenge__id=challenge_id)
            .select_related("user")
            # rank by user points
            .order_by("-user__points")
        )


# --- User Challenge Views ---
class UserChallengeListView(generics.ListCreateAPIView):
    """
    API view to list and create user challenges.
    """
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        print(
            f"[DEBUG] Fetching all user challenges for user: {user} "
            f"(ID: {user.id})"
        )
        try:
            queryset = (
                UserChallenge.objects
                .filter(user=user)
                .select_related("challenge", "user")
            )
            print(f"[DEBUG] Found {queryset.count()} user challenges")
            return queryset
        except Exception as e:
            import traceback
            print(
                "[ERROR] Exception in get_queryset of "
                "UserChallengeListView:", e
            )
            traceback.print_exc()
            raise

    def perform_create(self, serializer):
        try:
            instance = serializer.save(user=self.request.user)
            print(
                f"[DEBUG] Created UserChallenge for user: "
                f"{self.request.user}, "
                f"challenge: {instance.challenge}"
            )
        except IntegrityError as e:
            print("[ERROR] IntegrityError when creating UserChallenge:", e)
            raise serializers.ValidationError(
                "You have already joined this challenge."
            )


class UserChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a user challenge.
    """
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter user challenges for the requesting user
        return UserChallenge.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        instance = serializer.save()

        if instance.progress >= instance.target and not instance.completed:
            instance.completed = True
            instance.save(update_fields=["completed"])

            User = get_user_model()
            User.objects.filter(id=instance.user.id).update(
                points=F('points') + 1
            )

        try:
            check_and_notify_leaderboard_change(
                instance.challenge_id,
                self.request.user
            )
        except Exception as e:
            # Log the error to help debug
            import logging
            logger = logging.getLogger(__name__)
            logger.error(f"Error in leaderboard check: {e}", exc_info=True)
            # Optionally, re-raise or ignore depending on your needs


class IncrementProgressView(APIView):
    """
    Increment the progress of a user challenge.
    If the progress meets or exceeds the target, mark it as completed.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        user_challenge = get_object_or_404(
            UserChallenge,
            pk=pk,
            user=request.user
        )
        user_challenge.progress += 1

        if (
            user_challenge.progress >= user_challenge.challenge.target
            and not user_challenge.completed
        ):
            user_challenge.completed = True
            user_challenge.save(update_fields=['progress', 'completed'])
            request.user.points = F('points') + 1
            request.user.save(update_fields=['points'])

        else:
            user_challenge.save(update_fields=['progress'])

        return Response({
            'progress': user_challenge.progress,
            'completed': user_challenge.completed
        })


class ActiveUserChallengesView(generics.ListAPIView):
    """
    Return all active challenges for the current user
    (i.e., ones that are ongoing and the user has joined).
    """
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        today = timezone.now().date()
        print(f"[DEBUG] Fetching active challenges for user {user} on {today}")
        try:
            qs = UserChallenge.objects.filter(
                user=user,
                challenge__start_date__lte=today,
                challenge__end_date__gte=today
            ).select_related('challenge')
            print(f"[DEBUG] Found {qs.count()} active challenges")
            return qs
        except Exception as e:
            import traceback
            print("[ERROR] Failed to fetch active challenges:", e)
            traceback.print_exc()
            raise


# --- User Report Views ---
class UserReportListView(generics.ListCreateAPIView):
    """
    API view to list and create user reports.
    """
    serializer_class = UserReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserReport.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save()


class UserReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a user report.
    """
    serializer_class = UserReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter reports for the requesting user
        return UserReport.objects.filter(user=self.request.user)


# --- Workout Plan Views ---
class WorkoutPlanListView(generics.ListCreateAPIView):
    """
    API view to list and create workout plans.
    """
    serializer_class = WorkoutPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter workout plans for the requesting user
        return WorkoutPlan.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError:
            raise ValidationError({
                "detail": (
                    "You already have a workout plan with this title."
                )
            })


class WorkoutPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a workout plan.
    """
    serializer_class = WorkoutPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter workout plans for the requesting user
        return WorkoutPlan.objects.filter(user=self.request.user)


class RepeatWorkoutPlanView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        print(f"[DEBUG] User {user.id} requested repeat workout plan id={pk}")
        try:
            plan = WorkoutPlan.objects.get(id=pk, user=user)
        except WorkoutPlan.DoesNotExist:
            print("[DEBUG] Workout plan not found for user.")
            return Response({"detail": "Workout plan not found."}, status=404)

        # Duplicate the plan
        new_plan = WorkoutPlan.objects.create(
            user=user,
            title=f"{plan.title} (Week of {now().date() + timedelta(days=7)})",
            description=plan.description
        )

        # Duplicate daily workouts with shifted dates
        for dw in plan.daily_workouts.all():
            DailyWorkout.objects.create(
                workout_plan=new_plan,
                date=dw.date + timedelta(days=7),
                time=dw.time,
                activity=dw.activity,
                duration=dw.duration
            )

        return Response({
            "detail": "Workout plan repeated for next week.",
            "new_plan_id": new_plan.id
        }, status=status.HTTP_201_CREATED)


# --- Custom dashboard view ---
class DashboardView(APIView):
    """
    Custom dashboard view to provide a summary of user activity.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        today = now().date()
        week_ago = today - timedelta(days=6)
        dates = [today - timedelta(days=i) for i in range(6, -1, -1)]

        daily_logs = DailyLog.objects.filter(
            user=user,
            date__range=[week_ago, today]
        )
        nutrition_logs = NutritionLog.objects.filter(
            user=user,
            date__range=[week_ago, today]
        )
        todays_meals = Meal.objects.filter(user=user, date=today)

        todays_macros = {
            "protein": sum(m.protein or 0 for m in todays_meals),
            "carbs": sum(m.carbs or 0 for m in todays_meals),
            "fats": sum(m.fats or 0 for m in todays_meals),
        }

        exercise_logs = Exercise.objects.filter(
            user=user,
            date__range=[week_ago, today]
        )
        total_exercise_calories = sum(
            ex.calories_burned or 0 for ex in exercise_logs
        )

        today_log = daily_logs.filter(date=today).first()
        today_steps = today_log.steps if today_log else 0

        today_exercise_logs = [ex for ex in exercise_logs if ex.date == today]
        today_estimated_steps = sum(
            estimate_steps_from_exercise(ex) for ex in today_exercise_logs
        )

        active_challenges = Challenge.objects.filter(
            owner=user,
            end_date__gte=today
        )
        user_challenges = (
            UserChallenge.objects
            .select_related("challenge")
            .filter(user=user)
        )

        goals = Goal.objects.filter(user=user).order_by("-created_at")

        avg_sleep = (
            sum(log.sleep_hours or 0 for log in daily_logs)
            / max(len(daily_logs), 1)
        )
        avg_water = (
            sum(log.water_intake_l or 0 for log in daily_logs)
            / max(len(daily_logs), 1)
        )
        avg_calories = (
            sum(log.calories for log in nutrition_logs) /
            max(len(nutrition_logs), 1)
        )

        # --- Weekly Trends ---
        steps_by_day = defaultdict(int)
        sleep_by_day = defaultdict(float)
        calories_by_day = defaultdict(int)
        water_by_day = defaultdict(float)

        for log in daily_logs:
            steps_by_day[log.date] = log.steps or 0
            sleep_by_day[log.date] = log.sleep_hours or 0
            # Note: no longer set water here; we'll add it below

        # Add water from DailyLogs
        for log in daily_logs:
            water_by_day[log.date] += log.water_intake_l or 0

        # Add water from drink-type meals
        drink_meals = Meal.objects.filter(
            user=user,
            date__range=[week_ago, today],
            meal_type="drink"
        )
        for meal in drink_meals:
            if meal.water_amount:
                water_by_day[meal.date] += float(meal.water_amount)

        # Add nutrition calories
        for log in nutrition_logs:
            calories_by_day[log.date] += log.calories or 0

        # Add exercise calories
        for ex in exercise_logs:
            calories_by_day[ex.date] += ex.calories_burned or 0

        # Add estimated steps from exercises
        exercises_by_day = defaultdict(list)
        for ex in exercise_logs:
            exercises_by_day[ex.date].append(ex)

        for d in dates:
            estimated = sum(
                estimate_steps_from_exercise(ex)
                for ex in exercises_by_day[d]
            )
            steps_by_day[d] += estimated

        weekly_trends = {
            "dates": [d.strftime("%Y-%m-%d") for d in dates],
            "steps": [steps_by_day[d] for d in dates],
            "sleep_hours": [sleep_by_day[d] for d in dates],
            "calories_burned": [calories_by_day[d] for d in dates],
            "water_intake": [water_by_day[d] for d in dates],
        }

        challenges_joined = [
            {
                "id": uc.id,
                "title": uc.challenge.title,
                "progress": uc.progress,
                "target_value": uc.challenge.target_value,
                "completion_percent": (
                    round((uc.progress / uc.challenge.target_value) * 100, 2)
                    if uc.challenge.target_value else 0.0
                )
            }
            for uc in user_challenges
        ]

        all_plans = (
            WorkoutPlan.objects
            .filter(user=user)
            .prefetch_related("daily_workouts")
            .order_by("-date_created")
        )

        plans_data = []
        for plan in all_plans:
            # Find the earliest daily workout date as the week start (or None)
            first_workout = plan.daily_workouts.order_by("date").first()
            week_start = first_workout.date if first_workout else None

            serialized_plan = WorkoutPlanSerializer(plan).data
            serialized_plan["week_start"] = (
                week_start.strftime("%Y-%m-%d") if week_start else None
            )
            plans_data.append(serialized_plan)

        # Fallback for backwards compatibility,
        # just pick the latest plan's data if exists
        if plans_data:
            workout_plan_data = plans_data[0]
        else:
            workout_plan_data = {
                "daily_workouts": [],
                "user_id": user.id,
                "workout_plan_id": None,
            }

        return Response({
            "user": {
                "first_name": user.first_name,
            },
            "activity_summary": {
                "logs": DailyLogSerializer(
                    daily_logs.order_by("-date")[:5],
                    many=True
                ).data,
                "avg_sleep_hours": round(avg_sleep, 2),
                "avg_water_l": round(avg_water, 2),
                "weight": (
                    daily_logs.latest("date").weight_kg
                    if daily_logs.exists() else None
                ),
                "steps": today_steps + today_estimated_steps,
                "calories_burned": total_exercise_calories
            },
            "workout_nutrition": {
                **workout_plan_data,
                "all_plans": plans_data,
                "logs": NutritionLogSerializer(
                    nutrition_logs.order_by("-date")[:5],
                    many=True
                ).data,
                "avg_calories": round(avg_calories, 2),
                "todays_macros": todays_macros,
            },
            "daily_goals": {
                "daily": {
                    "steps": {
                        "goal": 10000,
                        "current": (today_log.steps if today_log else 0)
                    },
                    "water": {
                        "goal": 2.5,
                        "current": (
                            (
                                daily_logs.latest("date").water_intake_l
                                if daily_logs.exists() else 0
                            )
                        )
                    }
                },
                "goals": GoalWithProgressSerializer(goals, many=True).data
            },
            "analytics": {
                "total_daily_logs": daily_logs.count(),
                "total_nutrition_logs": nutrition_logs.count(),
                "weekly_trends": weekly_trends,
            },
            "challenges": {
                "created": ChallengeSerializer(
                    active_challenges, many=True, context={"request": request}
                ).data,
                "joined": challenges_joined,
            }
        })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_profile_image(request):
    """
    Upload a profile image to Cloudinary and assign it to the current user.
    """
    from django.core.files.storage import default_storage
    from django.core.files.base import ContentFile

    file = request.FILES.get('image')
    if not file:
        return Response(
            {'error': 'No image file provided'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Save directly to Cloudinary
    path = f"profile_pics/user_{request.user.id}_{file.name}"
    saved_path = default_storage.save(path, ContentFile(file.read()))
    cloudinary_url = default_storage.url(saved_path)

    # Assign the image URL only to the current authenticated user
    request.user.profile_image_url = cloudinary_url
    request.user.save()

    return Response({'image_url': cloudinary_url}, status=status.HTTP_200_OK)


def custom_404_view(request, exception):
    """
    Custom 404 error view.
    """
    return JsonResponse(
        {'error': 'Resource not found'},
        status=404
    )


def custom_500_view(request):
    """
    Custom 500 error view.
    """
    return JsonResponse(
        {'error': 'Internal server error'},
        status=500
    )


class DeleteAccountView(APIView):
    """
    API view to delete the user's account.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response(
            {'message': 'Account deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )


@method_decorator(csrf_exempt, name='dispatch')
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not current_password or not new_password:
            return Response(
                {'detail': 'Both current and new password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.check_password(current_password):
            return Response(
                {'detail': 'Current password is incorrect.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()
        return Response(
            {'detail': 'Password updated successfully.'},
            status=status.HTTP_200_OK
        )


class NotificationListView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Notification.objects
            .filter(user=self.request.user, read=False)
            .order_by('-timestamp')
        )


class MarkAllNotificationsRead(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Notification.objects.filter(
            user=request.user, read=False
        ).update(read=True)
        return Response({"status": "success"})


class UserPreferenceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserPreferenceSerializer(request.user)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserPreferenceSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
