from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileView, GoalListView, GoalDetailView, ExerciseViewSet,
    MealListCreateView, MealDetailView, SleepLogListCreateView,
    SleepLogDetailView, AchievementListCreateView, AchievementDetailView,
    UserActivityDetailView, GoalProgressListCreateView,
    GoalProgressDetailView, UserStreakView, DailyLogDetailView,
    DailyLogListView, NutritionLogListView, NutritionLogDetailView,
    ChallengeListView, ChallengeDetailView, UserChallengeListView,
    UserChallengeDetailView, UserReportListView, UserReportDetailView,
    FriendListView, FriendDetailView, WorkoutPlanListView,
    WorkoutPlanDetailView, RegisterView, CustomPasswordResetView,
    CustomPasswordResetConfirmView, CustomTokenObtainPairView,
    DashboardView, upload_profile_image, PublicChallengeListView,
    ChallengeLeaderboardView, CurrentUserChallengeView, DeleteAccountView,
    UserActivityStreakView, ChangePasswordView, SleepScheduleView,
    NotificationListView, MarkAllNotificationsRead
)

#  Create a router and register viewset with it
router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet)

urlpatterns = [
    # Auth
    path('register/', RegisterView.as_view(), name='register'),
    path(
        'token/',
        CustomTokenObtainPairView.as_view(),
        name='token_obtain_pair',
    ),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(
        'password-reset/',
        CustomPasswordResetView.as_view(),
        name='password_reset',
    ),
    path(
        'password-reset-confirm/',
        CustomPasswordResetConfirmView.as_view(),
        name='password_reset_confirm',
    ),
    path(
        'change-password/',
        ChangePasswordView.as_view(),
        name='change_password',
    ),
    # User Profile
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    # Goals
    path('goals/', GoalListView.as_view(), name='goal_list'),
    path('goals/<int:pk>/', GoalDetailView.as_view(), name='goal_detail'),
    # Include all exercise routes
    path('', include(router.urls)),
    # Meals
    path('meals/', MealListCreateView.as_view(), name='meal_list_create'),
    path('meals/<int:pk>/', MealDetailView.as_view(), name='meal_detail'),
    # Sleep Logs
    path(
        'sleep_logs/',
        SleepLogListCreateView.as_view(),
        name='sleep_log_list_create',
    ),
    path(
        'sleep_logs/<int:pk>/',
        SleepLogDetailView.as_view(),
        name='sleep_log_detail',
    ),
    path(
        'sleep/schedule/',
        SleepScheduleView.as_view(),
        name='sleep_schedule',
    ),
    # Achievements
    path(
        'achievements/',
        AchievementListCreateView.as_view(),
        name='achievement_list_create',
    ),
    path(
        'achievements/<int:pk>/',
        AchievementDetailView.as_view(),
        name='achievement_detail',
    ),
    # User Activity
    path(
        'activity/',
        UserActivityDetailView.as_view(),
        name='user_activity',
    ),
    path(
        'activity/streak/',
        UserActivityStreakView.as_view(),
        name='user_activity_streak',
    ),
    # Goal Progress
    path(
        'progress/',
        GoalProgressListCreateView.as_view(),
        name='goal_progress_list',
    ),
    path(
        'progress/<int:pk>/',
        GoalProgressDetailView.as_view(),
        name='goal_progress_detail',
    ),
    # User Streak
    path('streak/', UserStreakView.as_view(), name='user_streak'),
    # Daily Logs
    path(
        'daily_logs/',
        DailyLogListView.as_view(),
        name='daily_log_list',
    ),
    path(
        'daily_logs/<int:pk>/',
        DailyLogDetailView.as_view(),
        name='daily_log_detail',
    ),
    # Nutrition Logs
    path(
        'nutrition_logs/',
        NutritionLogListView.as_view(),
        name='nutrition_log_list',
    ),
    path(
        'nutrition_logs/<int:pk>/',
        NutritionLogDetailView.as_view(),
        name='nutrition_log_detail',
    ),
    # Challenges
    path('challenges/', ChallengeListView.as_view(), name='challenge_list'),
    path(
        'challenges/<int:pk>/',
        ChallengeDetailView.as_view(),
        name='challenge_detail',
    ),
    # User Challenges
    path(
        'user_challenges/',
        UserChallengeListView.as_view(),
        name='user_challenge_list',
    ),
    path(
        'user_challenges/<int:pk>/',
        UserChallengeDetailView.as_view(),
        name='user_challenge_detail',
    ),
    # Public Challenges
    path(
        'challenges/public/',
        PublicChallengeListView.as_view(),
        name='public_challenge_list',
    ),
    # Current User Challenge
    path(
        'user_challenges/current/',
        CurrentUserChallengeView.as_view(),
        name='user_current_challenge',
    ),
    # Challenge Leaderboard
    path(
        'user_challenges/leaderboard/<int:challenge_id>/',
        ChallengeLeaderboardView.as_view(),
        name='challenge_leaderboard',
    ),
    # User Reports
    path(
        'user_reports/',
        UserReportListView.as_view(),
        name='user_report_list',
    ),
    path(
        'user_reports/<int:pk>/',
        UserReportDetailView.as_view(),
        name='user_report_detail',
    ),
    # Friends
    path('friends/', FriendListView.as_view(), name='friend_list'),
    path(
        'friends/<int:pk>/',
        FriendDetailView.as_view(),
        name='friend_detail',
    ),
    # Workout Plans
    path(
        'workout_plans/',
        WorkoutPlanListView.as_view(),
        name='workout_plan_list',
    ),
    path(
        'workout_plans/<int:pk>/',
        WorkoutPlanDetailView.as_view(),
        name='workout_plan_detail',
    ),
    # Dashboard
    path(
        'dashboard/',
        DashboardView.as_view(),
        name='dashboard',
    ),
    # Profile Image Upload
    path(
        'upload_profile_image/',
        upload_profile_image,
        name='upload_profile_image',
    ),
    # Delete Account
    path(
        'delete_account/',
        DeleteAccountView.as_view(),
        name='delete_account',
    ),
    # Notification
    path(
        'notifications/',
        NotificationListView.as_view(),
        name='notifications',
    ),
    path(
        'notifications/mark_read/',
        MarkAllNotificationsRead.as_view(),
        name='mark_all_notifications_read',
    ),
]
