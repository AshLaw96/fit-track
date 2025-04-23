from rest_framework import generics, permissions, viewsets
from django.shortcuts import get_object_or_404
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
    UserReportSerializer, FriendSerializer, WorkoutPlanSerializer
)


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
    API view to list, create, update, and delete exercises.
    """
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer


# --- Meal Views ---
class MealListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create meals.
    """
    serializer_class = MealSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    def get_queryset(self):
        return Meal.objects.filter(user=self.request.user)


# --- SleepLog Views ---
class SleepLogListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create sleep logs.
    """
    serializer_class = SleepLogSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    def get_queryset(self):
        return SleepLog.objects.filter(user=self.request.user)


# --- Achievement Views ---
class AchievementListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create achievements.
    """
    serializer_class = AchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user)


# --- UserActivity Views ---
class UserActivityListCreateView(generics.ListCreateAPIView):
    """
    API view to list and create user activities.
    """
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

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
        return Challenge.objects.all()


class ChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a challenge.
    """
    serializer_class = ChallengeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Challenge.objects.all()


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
        # Filter reports for the requesting user
        return UserReport.objects.filter(user=self.request.user)


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
        # Filter friends for the requesting user
        return Friend.objects.filter(user=self.request.user)

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
        # Return friends for the requesting user
        return Friend.objects.filter(user=self.request.user)


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
