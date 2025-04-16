from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from datetime import date, timedelta
from api.models import (
    Goal,
    Meal,
    SleepLog,
    Achievement,
    Challenge,
    UserChallenge,
    DailyLog,
    NutritionLog,
    GoalProgress,
    UserReport,
    Friend,
    WorkoutPlan,
    Exercise
)

User = get_user_model()


class UserProfileViewTest(APITestCase):
    """
    Test case for the UserProfileView.
    This test case verifies the functionality of retrieving and updating
    the user profile.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="pass1234"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("user_profile")

    def test_retrieve_user_profile(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], "testuser")

    def test_update_user_profile(self):
        response = self.client.patch(self.url, {"username": "updateduser"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "updateduser")


class GoalViewTests(APITestCase):
    """
    Test case for the GoalListView and GoalDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting goals.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="pass1234"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("goal_list")

    def test_create_goal(self):
        data = {
            "goal_type": "sleep",
            "target_value": 8.0
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["goal_type"], "sleep")
        self.assertEqual(response.data["user"], self.user.id)

    def test_list_goals(self):
        Goal.objects.create(
            user=self.user,
            goal_type="sleep",
            target_value=7.0
        )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        goals = response.data.get("results", response.data)
        self.assertEqual(len(goals), 1)
        self.assertTrue(
            all(goal["user"] == self.user.id for goal in goals)
        )


class GoalDetailViewTests(APITestCase):
    """
    Test case for the GoalDetailView.
    This test case verifies the functionality of retrieving,
    updating, and deleting a specific goal.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="pass1234"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.goal = Goal.objects.create(
            user=self.user,
            goal_type="diet",
            target_value=1200
        )
        self.url = reverse("goal_detail", args=[self.goal.id])

    def test_retrieve_goal(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["goal_type"], "diet")

    def test_update_goal(self):
        response = self.client.put(
            self.url, {"goal_type": "fitness", "target_value": 2000}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["goal_type"], "fitness")

    def test_delete_goal(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Goal.objects.filter(id=self.goal.id).exists())


class MealViewTests(APITestCase):
    """
    Test case for the MealListCreateView and MealDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting meals.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="mealuser", password="test123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("meal_list_create")
        self.meal = Meal.objects.create(
            user=self.user, name="Lunch", calories=500
        )

    def test_list_meals(self):
        Meal.objects.create(
            user=self.user, name="Breakfast", calories=300
        )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        meals = response.data["results"]
        self.assertEqual(len(meals), 2)
        self.assertTrue(
            all(meal["user"] == self.user.id for meal in meals)
        )

    def test_create_meal(self):
        data = {"name": "Dinner", "calories": 650}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["name"], "Dinner")

    def test_retrieve_meal(self):
        url = reverse("meal_detail", args=[self.meal.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Lunch")

    def test_update_meal(self):
        url = reverse("meal_detail", args=[self.meal.id])
        response = self.client.put(url, {"name": "Brunch", "calories": 550})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["name"], "Brunch")

    def test_delete_meal(self):
        url = reverse("meal_detail", args=[self.meal.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(Meal.objects.filter(id=self.meal.id).exists())


class SleepLogViewTests(APITestCase):
    """
    Test case for the SleepLogListCreateView and SleepLogDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting sleep logs.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="sleeper", password="pass123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("sleep_log_list_create")

        # Clear out any existing sleep logs for the user
        # before running the test
        SleepLog.objects.filter(user=self.user).delete()

        # Create a single sleep log entry for this user
        self.log = SleepLog.objects.create(
            user=self.user,
            duration_hours=7.5,
            quality_rating=2,
        )

    def tearDown(self):
        # Ensure proper cleanup after each test
        # to avoid cross-test contamination
        SleepLog.objects.filter(user=self.user).delete()

    def test_list_sleep_logs(self):
        # Fetch all sleep logs for the authenticated user
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)

        # Get the logs from the response
        logs = response.data["results"]

        # Assert only 1 log is returned
        self.assertEqual(len(logs), 1)

        # Ensure that all logs belong to the authenticated user
        self.assertTrue(all(log["user"] == self.user.id for log in logs))

    def test_create_sleep_log(self):
        # Create a new sleep log for the authenticated user
        response = self.client.post(
            self.url, {"duration_hours": 8.0, "quality_rating": 3}
        )
        # Check if created successfully
        self.assertEqual(response.status_code, 201)

        # Verify that the new log's attributes match
        self.assertEqual(response.data["duration_hours"], 8.0)
        self.assertEqual(response.data["quality_rating"], 3)
        self.assertEqual(response.data["user"], self.user.id)

    def test_update_sleep_log(self):
        url = reverse("sleep_log_detail", args=[self.log.id])

        # Update the sleep log's duration hours and include the required
        # 'quality_rating'
        updated_data = {"duration_hours": 6.0, "quality_rating": 3}

        # Perform the PUT request to update the log
        response = self.client.put(url, updated_data)

        self.assertEqual(response.status_code, 200)

        # Verify the updated data
        self.assertEqual(response.data["duration_hours"], 6.0)
        self.assertEqual(response.data["quality_rating"], 3)

    def test_delete_sleep_log(self):
        url = reverse("sleep_log_detail", args=[self.log.id])

        # Delete the sleep log
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)

        # Verify that the log is deleted by trying to retrieve it
        response = self.client.get(url)
        # Should return not found after deletion
        self.assertEqual(response.status_code, 404)


class AchievementViewTests(APITestCase):
    """
    Test case for the AchievementListCreateView and AchievementDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting achievements.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="achiever", password="123456"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = reverse("achievement_list_create")
        self.achievement = Achievement.objects.create(
            user=self.user, title="First Steps"
        )

    def test_list_achievements(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_create_achievement(self):
        response = self.client.post(
            self.url,
            {"title": "Level Up", "category": "fitness"}
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_achievement(self):
        url = reverse("achievement_detail", args=[self.achievement.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_achievement(self):
        url = reverse("achievement_detail", args=[self.achievement.id])
        response = self.client.put(
            url,
            {
                "title": "Updated Title",
                "category": "diet",
            }
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_achievement(self):
        url = reverse("achievement_detail", args=[self.achievement.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class GoalProgressViewTests(APITestCase):
    """
    Test case for the GoalProgressListCreateView and GoalProgressDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting goal progress.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="progressor", password="testpass"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.goal = Goal.objects.create(
            user=self.user, goal_type="fitness", target_value=10
        )
        self.progress = GoalProgress.objects.create(
            goal=self.goal, progress_value=5
        )
        self.url = reverse("goal_progress_list")

    def test_list_goal_progress(self):
        GoalProgress.objects.filter(goal__user=self.user).delete()
        GoalProgress.objects.create(
            goal=self.goal, progress_value=2
        )
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_goal_progress(self):
        data = {"goal_id": self.goal.id, "progress_value": 3}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, 201)

    def test_retrieve_goal_progress(self):
        url = reverse("goal_progress_detail", args=[self.progress.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_goal_progress(self):
        url = reverse("goal_progress_detail", args=[self.progress.id])
        response = self.client.put(
            url,
            {
                "goal_id": self.goal.id,
                "progress_value": 6,
            }
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_goal_progress(self):
        url = reverse("goal_progress_detail", args=[self.progress.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class ChallengeViewTests(APITestCase):
    """
    Test case for the ChallengeListCreateView and ChallengeDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting challenges.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="challenger", password="challenge123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.challenge = Challenge.objects.create(
            title="30-Day Pushup Challenge", metric="reps",
            target_value=100,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=30),
            description="Complete 100 pushups in 30 days"
        )
        self.url = reverse("challenge_list")

    def test_list_challenges(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_challenge(self):
        data = {
            "title": "New Challenge",
            "description": "A new fitness challenge",
            "metric": "steps",
            "target_value": 10000,
            "start_date": date.today(),
            "end_date": date.today() + timedelta(days=10),
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 201)

    def test_retrieve_challenge(self):
        url = reverse("challenge_detail", args=[self.challenge.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_challenge(self):
        url = reverse("challenge_detail", args=[self.challenge.id])
        data = {
            "title": "Updated Challenge",
            "metric": self.challenge.metric,
            "target_value": self.challenge.target_value,
            "start_date": self.challenge.start_date,
            "end_date": self.challenge.end_date,
            "description": "Updated challenge description"
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, 200)

    def test_delete_challenge(self):
        url = reverse("challenge_detail", args=[self.challenge.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class UserChallengeViewTests(APITestCase):
    """
    Test case for the UserChallengeListCreateView and UserChallengeDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting user challenges.
    """
    def setUp(self):
        # Clear out any existing data to avoid conflicts with the test data
        UserChallenge.objects.all().delete()
        Challenge.objects.all().delete()
        User.objects.all().delete()

        self.user = User.objects.create_user(
            username="participant", password="challengepass"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.challenge = Challenge.objects.create(
            title="Steps Challenge",
            target_value=10000,
            metric="steps",
            start_date="2025-01-01",
            end_date="2025-12-31",
        )
        self.user_challenge = UserChallenge.objects.create(
            user=self.user,
            challenge=self.challenge
        )
        self.url = reverse("user_challenge_list")

    def test_list_user_challenges(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_user_challenge(self):
        new_challenge = Challenge.objects.create(
            title="Water Drinking Challenge",
            metric="liters",
            target_value=2.0,
            start_date=date.today(),
            end_date=date.today() + timedelta(days=7)
        )
        response = self.client.post(self.url, {"challenge": new_challenge.id})
        self.assertEqual(response.status_code, 201)

    def test_retrieve_user_challenge(self):
        url = reverse("user_challenge_detail", args=[self.user_challenge.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_user_challenge(self):
        url = reverse("user_challenge_detail", args=[self.user_challenge.id])
        response = self.client.put(url, {"challenge": self.challenge.id})
        self.assertEqual(response.status_code, 200)

    def test_delete_user_challenge(self):
        url = reverse("user_challenge_detail", args=[self.user_challenge.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class FriendViewTests(APITestCase):
    """
    Test case for the FriendListCreateView and FriendDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting friends.
    """
    def setUp(self):
        Friend.objects.all().delete()

        self.user = User.objects.create_user(
            username="mainuser", password="friends123"
        )
        self.friend_user = User.objects.create_user(
            username="frienduser", password="pass123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.friend = Friend.objects.create(
            user=self.user,
            friend_user=self.friend_user
        )
        self.url = reverse("friend_list")

    def test_list_friends(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), 1)

    def test_create_friend(self):
        new_friend = User.objects.create_user(
            username="another_friend", password="secret"
        )
        response = self.client.post(self.url, {"friend_user": new_friend.id})
        self.assertEqual(response.status_code, 201)

    def test_retrieve_friend(self):
        url = reverse("friend_detail", args=[self.friend.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_delete_friend(self):
        url = reverse("friend_detail", args=[self.friend.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class WorkoutPlanViewTests(APITestCase):
    """
    Test case for the WorkoutPlanListCreateView and WorkoutPlanDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting workout plans.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="trainer", password="gym123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.workout_plan = WorkoutPlan.objects.create(
            user=self.user, title="Beginner Plan"
        )
        self.url = reverse("workout_plan_list")

    def test_list_workout_plans(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_workout_plan(self):
        # Create exercises first so we can reference their IDs
        exercise1 = Exercise.objects.create(
            name="Push-up",
            duration=30,
            calories_burned=100
        )
        exercise2 = Exercise.objects.create(
            name="Squat", duration=45, calories_burned=150
        )

        response = self.client.post(
            self.url,
            {
                "title": "Advanced Plan",
                "description": "For experienced users",
                # Pass IDs of exercises
                "exercises": [exercise1.id, exercise2.id],
                "user": self.user.id,
                # Ensure the date is passed as a string
                "date_created": str(date.today()),
            }
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_workout_plan(self):
        url = reverse("workout_plan_detail", args=[self.workout_plan.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_workout_plan(self):
        # Create exercises first so we can reference their IDs
        exercise1 = Exercise.objects.create(
            name="Push-up",
            duration=30,
            calories_burned=100
        )
        exercise2 = Exercise.objects.create(
            name="Squat",
            duration=45,
            calories_burned=150
        )

        # Assuming the workout_plan already exists
        url = reverse("workout_plan_detail", args=[self.workout_plan.id])
        response = self.client.put(
            url,
            {
                "title": "Updated Title",
                # Pass IDs of exercises
                "exercises": [exercise1.id, exercise2.id],
                # Ensure the date is passed as a string
                "date_created": str(date.today()),
                "user": self.user.id,
            }
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_workout_plan(self):
        url = reverse("workout_plan_detail", args=[self.workout_plan.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class UserStreakViewTests(APITestCase):
    """
    Test case for the UserStreakListCreateView and UserStreakDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting user streaks.
    """
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser', password='testpassword'
        )
        self.client.force_authenticate(user=self.user)  # Authenticate the user
        self.url = '/api/streak/'

    def test_create_user_streak_post(self):
        data = {
            "current_streak": 10,
            "last_logged_date": "2025-04-14",
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, 201)


class DailyLogViewTests(APITestCase):
    """
    Test case for the DailyLogListCreateView and DailyLogDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting daily logs.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="logger", password="log123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.log = DailyLog.objects.create(
            user=self.user, notes="All good"
        )
        self.url = reverse("daily_log_list")

    def test_list_daily_logs(self):
        for i in range(3):
            DailyLog.objects.create(
                user=self.user,
                date=self.log.date + timedelta(days=i+1),
                steps=1000 * (i + 1),
                notes=f"Note {i+1}"
            )

        response = self.client.get(self.url)
        logs = DailyLog.objects.filter(user=self.user)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data["results"]), logs.count())

    def test_create_daily_log(self):
        new_date = (self.log.date + timedelta(days=1)).strftime('%Y-%m-%d')
        response = self.client.post(
            self.url, {"notes": "Rough day", "date": new_date}
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_daily_log(self):
        url = reverse("daily_log_detail", args=[self.log.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_daily_log(self):
        url = reverse("daily_log_detail", args=[self.log.id])
        response = self.client.put(
            url,
            {
                "notes": "Feeling better",
                # Explicitly provide the date
                "date": self.log.date.strftime('%Y-%m-%d'),
            }
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_daily_log(self):
        url = reverse("daily_log_detail", args=[self.log.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)

# TEST BELOW THIS LINE ----------------------------------


class NutritionLogViewTests(APITestCase):
    """
    Test case for the NutritionLogListCreateView and NutritionLogDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting nutrition logs.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="eater", password="food123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.nutrition_log = NutritionLog.objects.create(
            user=self.user, calories=500
        )
        self.url = reverse("nutrition_log_list")

    def test_list_nutrition_logs(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_nutrition_log(self):
        response = self.client.post(self.url, {"calories": 800})
        self.assertEqual(response.status_code, 201)

    def test_retrieve_nutrition_log(self):
        url = reverse("nutrition_log_detail", args=[self.nutrition_log.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_nutrition_log(self):
        url = reverse("nutrition_log_detail", args=[self.nutrition_log.id])
        response = self.client.put(url, {"calories": 1000})
        self.assertEqual(response.status_code, 200)

    def test_delete_nutrition_log(self):
        url = reverse("nutrition_log_detail", args=[self.nutrition_log.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)


class UserReportViewTests(APITestCase):
    """
    Test case for the UserReportListCreateView and UserReportDetailView.
    This test case verifies the functionality of creating, listing,
    retrieving, updating, and deleting user reports.
    """
    def setUp(self):
        self.user = User.objects.create_user(
            username="reporter", password="report123"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.report = UserReport.objects.create(
            user=self.user,
            total_steps=10000,
            avg_calories=2500,
            total_sleep_hours=7.5,
            avg_water_intake_l=2.0
        )
        self.url = reverse("user_report_list")

    def test_list_user_reports(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_create_user_report(self):
        response = self.client.post(
            self.url,
            {
                "report_type": "bug",
                "message": "Found an issue"
            }
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_user_report(self):
        url = reverse("user_report_detail", args=[self.report.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

    def test_update_user_report(self):
        url = reverse("user_report_detail", args=[self.report.id])
        response = self.client.put(
            url,
            {"report_type": "feedback", "message": "Updated message"}
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_user_report(self):
        url = reverse("user_report_detail", args=[self.report.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
