from django.test import TestCase
from django.utils import timezone
from django.contrib.auth import get_user_model
from api.models import (
    Goal,
    Exercise,
    Meal,
    SleepLog,
    Achievement,
    Challenge,
    UserChallenge,
    UserActivity,
    DailyLog,
    NutritionLog,
    GoalProgress,
    UserStreak,
    UserReport,
    Friend,
    WorkoutPlan,
)

CustomUser = get_user_model()


class ModelTests(TestCase):
    """
    Test cases for the models in the app.
    """

    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.exercise = Exercise.objects.create(
            name="Running",
            duration=30,
            calories_burned=250,
            date=timezone.now().date(),
        )

    def test_custom_user_str(self):
        self.assertEqual(str(self.user), "testuser")

    def test_goal_creation(self):
        goal = Goal.objects.create(
            user=self.user,
            goal_type='fitness',
            target_value=100,
            current_value=100
        )
        self.assertEqual(str(goal), f"{self.user.username} - fitness goal")
        self.assertEqual(goal.status, 'achieved')

    def test_goal_progress_str(self):
        goal = Goal.objects.create(
            user=self.user,
            goal_type='fitness',
            target_value=50
        )
        progress = GoalProgress.objects.create(goal=goal, progress_value=10)
        self.assertIn("goal", str(progress).lower())

    def test_exercise_str(self):
        self.assertIn("Running", str(self.exercise))

    def test_meal_str(self):
        meal = Meal.objects.create(user=self.user, name="Lunch", calories=500)
        self.assertEqual(str(meal), f"Lunch - {self.user.username}")

    def test_sleep_log_str(self):
        log = SleepLog.objects.create(
            user=self.user,
            duration_hours=7.5,
            quality_rating=3
        )
        self.assertIn(self.user.username, str(log))

    def test_achievement_str(self):
        achievement = Achievement.objects.create(
            user=self.user, category="fitness", title="First Workout"
        )
        self.assertEqual(
            str(achievement),
            f"{self.user.username} - fitness - First Workout"
        )

    def test_user_activity_str(self):
        activity = UserActivity.objects.create(user=self.user, streak_count=5)
        self.assertIn("5", str(activity))

    def test_user_streak_str(self):
        streak = UserStreak.objects.create(user=self.user, current_streak=3)
        self.assertIn("3", str(streak))

    def test_daily_log_unique(self):
        log = DailyLog.objects.create(user=self.user, steps=8000)
        self.assertEqual(log.steps, 8000)

    def test_nutrition_log(self):
        log = NutritionLog.objects.create(
            user=self.user,
            carbs_g=200,
            protein_g=100,
            fats_g=80
        )
        self.assertEqual(log.calories, 0)

    def test_challenge_str(self):
        challenge = Challenge.objects.create(
            title="10K Steps", metric="steps", target_value=10000,
            start_date=timezone.now().date(), end_date=timezone.now().date()
        )
        self.assertIn("10K Steps", str(challenge))

    def test_user_challenge_creation(self):
        challenge = Challenge.objects.create(
            title="Water Intake", metric="litres", target_value=3,
            start_date=timezone.now().date(), end_date=timezone.now().date()
        )
        user_challenge = UserChallenge.objects.create(
            user=self.user,
            challenge=challenge
        )
        self.assertFalse(user_challenge.completed)

    def test_user_report_str(self):
        report = UserReport.objects.create(
            user=self.user, total_steps=15000, avg_calories=2000,
            total_sleep_hours=8.0, avg_water_intake_l=2.5
        )
        self.assertIn("Report for", str(report))

    def test_workout_plan_str(self):
        plan = WorkoutPlan.objects.create(
            user=self.user, title="Beginner Plan"
        )
        plan.exercises.add(self.exercise)
        self.assertIn("Beginner Plan", str(plan))

    def test_friend_str(self):
        friend = CustomUser.objects.create_user(
            username='frienduser', password='pass'
        )
        friendship = Friend.objects.create(user=self.user, friend_user=friend)
        self.assertIn("Friends", str(friendship))
