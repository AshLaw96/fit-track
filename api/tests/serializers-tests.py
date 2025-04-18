from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from datetime import date, timedelta
from rest_framework.exceptions import ValidationError
from io import BytesIO
from PIL import Image
from api.serializers import (
    UserSerializer,
    GoalSerializer,
    ExerciseSerializer,
    SleepLogSerializer,
    AchievementSerializer,
    GoalProgressSerializer,
    UserStreakSerializer,
    DailyLogSerializer,
    NutritionLogSerializer,
    UserReportSerializer,
    FriendSerializer,
    WorkoutPlanSerializer
)
from api.models import Exercise

User = get_user_model()


def generate_test_image():
    # Create an image and return it as a SimpleUploadedFile
    image = Image.new("RGB", (100, 100), color="red")
    byte_io = BytesIO()
    image.save(byte_io, format='JPEG')
    byte_io.seek(0)
    return SimpleUploadedFile(
        "test.jpg", byte_io.read(), content_type="image/jpeg"
    )


class TestSerializers(TestCase):

    def setUp(self):
        # Create a user for testing
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='pass',
            dob=date(1990, 1, 1),
        )

    def test_user_serializer(self):
        # Mock a valid image file
        image = generate_test_image()
        data = {
            'username': self.user.username,
            'email': self.user.email,
            'dob': self.user.dob,
            'height_cm': 175,
            'weight_kg': 70,
            'profile_image': image,
        }
        serializer = UserSerializer(
            instance=self.user,
            data=data,
            partial=True
        )

        is_valid = serializer.is_valid()

        # Check if the serializer is valid
        self.assertTrue(
            is_valid, f"Validation failed with errors: {serializer.errors}"
        )
        self.assertEqual(serializer.validated_data['username'], 'testuser')

    def test_goal_serializer_validation(self):
        data = {
            'name': 'Lose Weight',
            'target_value': -5,
            'goal_type': 'weight',
            'deadline': date.today() + timedelta(days=30),
        }
        serializer = GoalSerializer(data=data, context={'request': None})
        self.assertFalse(serializer.is_valid())
        self.assertIn('target_value', serializer.errors)

    def test_exercise_serializer_validation(self):
        data = {
            'name': 'Jogging',
            'duration': -30,
            'calories_burned': -100
        }
        serializer = ExerciseSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('duration', serializer.errors)
        self.assertIn('calories_burned', serializer.errors)

    def test_sleep_log_serializer_valid(self):
        data = {
            'duration_hours': 7,
            'quality_rating': 3,
        }
        mock_request = type('Request', (), {'user': self.user})()
        serializer = SleepLogSerializer(
            data=data,
            context={'request': mock_request}
        )

        is_valid = serializer.is_valid()
        self.assertTrue(
            is_valid,
            f"Validation failed with errors: {serializer.errors}"
        )

    def test_achievement_serializer_sets_user(self):
        # Create a simple in-memory image
        image_io = BytesIO()
        image = Image.new('RGB', (100, 100), color='blue')
        image.save(image_io, format='JPEG')
        image_io.seek(0)

        uploaded_image = SimpleUploadedFile(
            'icon.jpg', image_io.read(), content_type='image/jpeg'
        )

        data = {
            'category': 'fitness',
            'title': 'First Step',
            'description': 'Completed first workout',
            'icon': uploaded_image,
        }
        mock_request = type('Request', (), {'user': self.user})()
        serializer = AchievementSerializer(
            data=data,
            context={'request': mock_request})

        is_valid = serializer.is_valid()
        self.assertTrue(
            is_valid, f"Validation failed with errors: {serializer.errors}"
        )
        instance = serializer.save()
        self.assertEqual(instance.user, self.user)

    def test_goal_progress_invalid_goal(self):
        serializer = GoalProgressSerializer(data={
            'goal_id': 999,
            'progress_value': 20,
            'completed': False,
        }, context={'request': type('req', (), {'user': self.user})})
        self.assertFalse(serializer.is_valid())
        self.assertIn('goal_id', serializer.errors)

    def test_user_streak_serializer_create_sets_user(self):
        serializer = UserStreakSerializer(data={
            'current_streak': 5,
            'last_logged_date': date.today()
        }, context={'request': type('req', (), {'user': self.user})})
        self.assertTrue(serializer.is_valid())
        streak = serializer.save()
        self.assertEqual(streak.user, self.user)

    def test_daily_log_validations(self):
        serializer = DailyLogSerializer(data={
            'steps': -10,
            'sleep_hours': 25,
            'water_intake_l': -1,
            'weight_kg': -50
        })
        self.assertFalse(serializer.is_valid())
        self.assertIn('steps', serializer.errors)
        self.assertIn('sleep_hours', serializer.errors)
        self.assertIn('water_intake_l', serializer.errors)
        self.assertIn('weight_kg', serializer.errors)

    def test_nutrition_log_validation(self):
        serializer = NutritionLogSerializer(data={
            'carbs_g': -10,
            'protein_g': -10,
            'fats_g': -5,
            'calories': -100
        })
        self.assertFalse(serializer.is_valid())

    def test_user_report_serializer_sets_user(self):
        data = {
            'total_steps': 10000,
            'avg_calories': 2200,
            'total_sleep_hours': 7.5,
            'avg_water_intake_l': '2.5',
        }
        serializer = UserReportSerializer(
            data=data,
            context={'request': type('req', (), {'user': self.user})}
        )
        self.assertTrue(
            serializer.is_valid(),
            f"Validation failed with errors: {serializer.errors}"
        )
        instance = serializer.save()
        self.assertEqual(instance.user, self.user)

    def test_friend_serializer_self_friend(self):
        serializer = FriendSerializer(
            data={'friend_user': self.user.id},
            context={'request': type('req', (), {'user': self.user})}
        )
        with self.assertRaises(ValidationError):
            serializer.is_valid(raise_exception=True)

    def test_workout_plan_create_sets_user_and_exercises(self):
        ex1 = Exercise.objects.create(
            name="Pushups", duration=10, calories_burned=50
        )
        ex2 = Exercise.objects.create(
            name="Situps", duration=5, calories_burned=30
        )
        data = {
            'title': 'Morning Routine',
            'description': 'Quick workout',
            'exercises': [ex1.id, ex2.id],
        }
        serializer = WorkoutPlanSerializer(
            data=data,
            context={'request': type('req', (), {'user': self.user})}
        )
        self.assertTrue(serializer.is_valid())
        plan = serializer.save()
        self.assertEqual(plan.user, self.user)
        self.assertEqual(set(plan.exercises.all()), {ex1, ex2})
