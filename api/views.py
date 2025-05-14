from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils.timezone import now
from datetime import timedelta
from collections import defaultdict
from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
import os
import logging
from .models import (
    CustomUser, Goal, Exercise, Meal, SleepLog, Achievement, UserActivity,
    GoalProgress, UserStreak, DailyLog, NutritionLog, Challenge, UserChallenge,
    UserReport, Friend, WorkoutPlan
)
from .serializers import (
    UserSerializer, GoalSerializer, ExerciseSerializer, MealSerializer,
    SleepLogSerializer, AchievementSerializer, UserActivitySerializer,
    GoalProgressSerializer, UserStreakSerializer, DailyLogSerializer,
    NutritionLogSerializer, ChallengeSerializer, UserChallengeSerializer,
    UserReportSerializer, FriendSerializer, WorkoutPlanSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    GoalWithProgressSerializer
)

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
        logger.debug(f"RegisterView incoming data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(
                f"RegisterView validation errors: {serializer.errors}"
            )
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

    queryset = Exercise.objects.all()

    def create(self, request, *args, **kwargs):
        logger.info("Exercise POST data: %s", request.data)
        logger.info("User on request: %s", request.user)
        return super().create(request, *args, **kwargs)

    def get_queryset(self):
        return Exercise.objects.filter(user=self.request.user)

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
        serializer.save(user=self.request.user)


class MealDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a meal.
    """
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Meal.objects.none()

    def get_queryset(self):
        return Meal.objects.filter(user=self.request.user)


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
        serializer.save(user=self.request.user)


class SleepLogDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a sleep log.
    """
    serializer_class = SleepLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = SleepLog.objects.none()

    def get_queryset(self):
        return SleepLog.objects.filter(user=self.request.user)


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


# --- UserActivity Views ---
class UserActivityListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create user activities.
    """
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = UserActivity.objects.none()

    def get_queryset(self):
        return UserActivity.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserActivityDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a user activity.
    """
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = UserActivity.objects.none()

    def get_queryset(self):
        return UserActivity.objects.filter(user=self.request.user)


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
        serializer.save()


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
    API view to list and create challenges.
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only show challenges owned by the current user
        return Challenge.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Set the owner to the currently authenticated user
        serializer.save(owner=self.request.user)


class ChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a challenge.
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Limit access to challenges the user owns
        return Challenge.objects.filter(owner=self.request.user)


# --- User Challenge Views ---
class UserChallengeListView(generics.ListCreateAPIView):
    """
    API view to list and create user challenges.
    """
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter user challenges for the requesting user
        return UserChallenge.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user to the currently authenticated user
        serializer.save(user=self.request.user)


class UserChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a user challenge.
    """
    serializer_class = UserChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter user challenges for the requesting user
        return UserChallenge.objects.filter(user=self.request.user)


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


# --- Friend Views ---
class FriendListView(generics.ListCreateAPIView):
    """
    API view to list and create friends.
    """
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only allow users to access their own friendships
        return (
            Friend.objects.filter(user=self.request.user) |
            Friend.objects.filter(friend_user=self.request.user)
        )

    def perform_create(self, serializer):
        # Set the user to the currently authenticated user
        serializer.save(user=self.request.user)


class FriendDetailView(generics.RetrieveDestroyAPIView):
    """
    API view to retrieve or delete a friend.
    """
    serializer_class = FriendSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Ensure the user can only delete friendships they created
        return Friend.objects.filter(user=self.request.user)

    def perform_destroy(self, instance):
        # Ensure the user is the owner of the friendship
        if instance.user != self.request.user:
            raise PermissionDenied("You can only delete your own friendships.")
        instance.delete()


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


class WorkoutPlanDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a workout plan.
    """
    serializer_class = WorkoutPlanSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter workout plans for the requesting user
        return WorkoutPlan.objects.filter(user=self.request.user)


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

        # Logs
        daily_logs = DailyLog.objects.filter(
            user=user,
            date__range=[week_ago, today]
        )
        nutrition_logs = NutritionLog.objects.filter(
            user=user,
            date__range=[week_ago, today]
        )

        # Challenges
        active_challenges = Challenge.objects.filter(
            owner=user, end_date__gte=today
        )
        user_challenges = UserChallenge.objects.select_related("challenge") \
            .filter(user=user)

        # Goals
        goals = Goal.objects.filter(user=user).order_by("-created_at")

        # Stats
        total_steps = sum(log.steps for log in daily_logs)
        avg_sleep = sum(
            log.sleep_hours or 0 for log in daily_logs
        ) / max(len(daily_logs), 1)
        avg_water = sum(
            log.water_intake_l or 0 for log in daily_logs
        ) / max(len(daily_logs), 1)
        avg_calories = sum(
            log.calories for log in nutrition_logs
        ) / max(len(nutrition_logs), 1)

        # Weekly Trends
        steps_by_day = defaultdict(int)
        sleep_by_day = defaultdict(float)
        calories_by_day = defaultdict(int)

        for log in daily_logs:
            steps_by_day[log.date] = log.steps
            sleep_by_day[log.date] = log.sleep_hours or 0
        for log in nutrition_logs:
            calories_by_day[log.date] = log.calories

        weekly_trends = {
            "dates": [d.strftime("%Y-%m-%d") for d in dates],
            "steps": [steps_by_day[d] for d in dates],
            "sleep_hours": [sleep_by_day[d] for d in dates],
            "calories": [calories_by_day[d] for d in dates],
        }

        # Challenges with completion %
        challenges_joined = [
            {
                "id": uc.id,
                "title": uc.challenge.title,
                "progress": uc.progress,
                "target_value": uc.challenge.target_value,
                "completion_percent": round(
                    (uc.progress / uc.challenge.target_value) * 100, 2
                )
                if uc.challenge.target_value else 0.0
            }
            for uc in user_challenges
        ]

        return Response({
            "user": {
                "first_name": user.first_name,
            },
            "activity_summary": {
                "logs": DailyLogSerializer(
                    daily_logs.order_by("-date")[:5], many=True
                ).data,
                "total_steps": total_steps,
                "avg_sleep_hours": round(avg_sleep, 2),
                "avg_water_l": round(avg_water, 2),
                "weight": (
                    daily_logs.latest("date").weight
                    if daily_logs.exists()
                    else None
                ),
            },
            "workout_nutrition": {
                "logs": NutritionLogSerializer(
                    nutrition_logs.order_by("-date")[:5], many=True
                ).data,
                "avg_calories": round(avg_calories, 2),
            },
            "daily_goals": {
                "daily": {
                    "steps": {
                        "goal": 10000,
                        "current": (
                            daily_logs.latest("date").steps
                            if daily_logs.exists()
                            else 0
                        )
                    },
                    "water": {
                        "goal": 2.5,
                        "current": (
                            daily_logs.latest("date").water_intake_l
                            if daily_logs.exists()
                            else 0
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
                    active_challenges, many=True
                ).data,
                "joined": challenges_joined,
            }
        })
