from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.exceptions import ValidationError
from datetime import date


# Custom user model
class CustomUser(AbstractUser):
    """
    Custom user model that extends AbstractUser.
    """
    dob = models.DateField(null=True, blank=True)
    height_cm = models.FloatField(null=True, blank=True)
    weight_kg = models.FloatField(null=True, blank=True)
    profile_image = models.ImageField(
        upload_to='profile/', null=True, blank=True
    )

    def __str__(self):
        return self.username


# Goal model
class Goal(models.Model):
    """
    Model representing a user's goal.
    """
    GOAL_TYPES = [
        ('sleep', 'Sleep'),
        ('diet', 'Diet'),
        ('fitness', 'Fitness'),
    ]
    STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('achieved', 'Achieved'),
        ('failed', 'Failed'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='goals'
    )
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES)
    target_value = models.FloatField()
    current_value = models.FloatField(default=0)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='in_progress'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.current_value >= self.target_value:
            self.status = 'achieved'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.goal_type} goal"


# Goal Progress model
class GoalProgress(models.Model):
    """
    Model representing a progress entry for a goal.
    """
    goal = models.ForeignKey(
        Goal,
        on_delete=models.CASCADE,
        related_name='progress_entries'
    )
    date = models.DateField(auto_now_add=True)
    progress_value = models.FloatField()
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.goal} on {self.date}"


# Exercise model
class Exercise(models.Model):
    """
    Model representing an exercise entry.
    """
    EXERCISE_CATEGORIES = [
        ('cardio', 'Cardio'),
        ('strength', 'Strength'),
        ('flexibility', 'Flexibility'),
        ('sports', 'Sports'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='exercises',
        null=True,
    )
    type = models.CharField(
        max_length=50,
    )
    name = models.CharField(max_length=50)
    duration = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()
    notes = models.TextField(blank=True, null=True)
    date = models.DateField(default=date.today)
    category = models.CharField(
        max_length=50,
        choices=EXERCISE_CATEGORIES,
        default='other'
    )

    def __str__(self):
        return (
            f"{self.name} - {self.duration} min - "
            f"{self.calories_burned} cal"
        )


# Meal model
class Meal(models.Model):
    """
    Model representing a meal entry.
    """
    MEAL_TYPES = [
        ('breakfast', 'Breakfast'),
        ('lunch', 'Lunch'),
        ('dinner', 'Dinner'),
        ('snack', 'Snack'),
        ('drink', 'Drink'),
    ]

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="meals"
    )
    meal_type = models.CharField(
        max_length=20,
        choices=MEAL_TYPES,
        default='breakfast'
    )
    name = models.CharField(max_length=100)
    calories = models.IntegerField()
    protein = models.FloatField(null=True, blank=True)
    carbs = models.FloatField(null=True, blank=True)
    fats = models.FloatField(null=True, blank=True)
    water_amount = models.FloatField(
        null=True,
        blank=True,
        help_text="Liters of water consumed"
    )
    notes = models.TextField(blank=True)
    date = models.DateField(default=date.today)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.meal_type} - {self.name} ({self.user.username})"


# Sleep Log model
class SleepLog(models.Model):
    """
    Model representing a sleep log entry.
    """
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="sleep_logs"
    )
    date = models.DateField(default=date.today)
    bedtime = models.TimeField(null=True, blank=True)
    wake_time = models.TimeField(null=True, blank=True)
    duration_hours = models.FloatField()
    quality_rating = models.IntegerField(
        choices=[
            (1, "Poor"),
            (2, "Fair"),
            (3, "Good"),
            (4, "Excellent"),
        ]
    )
    wake_feeling = models.CharField(
        max_length=50,
        choices=[
            ("refreshed", "Refreshed"),
            ("tired", "Tired"),
            ("okay", "Okay"),
        ],
        blank=True,
    )
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"


# Achievement model
class Achievement(models.Model):
    """
    Model representing a user's achievement.
    """
    CATEGORY_CHOICES = [
        ("sleep", "Sleep"),
        ("diet", "Diet"),
        ("fitness", "Fitness"),
        ("habit", "Habit"),
        ("goal", "Goal"),
    ]

    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="achievements"
    )
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )
    title = models.CharField(max_length=100)
    description = models.TextField(
        blank=True,
        help_text="Optional detail about how this was earned."
    )
    icon = models.ImageField(
        upload_to='achievements/',
        null=True,
        blank=True,
        help_text="Optional icon to display for this achievement."
    )
    date_earned = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.category} - {self.title}"


# User Activity model
class UserActivity(models.Model):
    """
    Model representing a user's activity.
    """
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="activity"
    )
    last_active = models.DateField(auto_now=True)
    streak_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.streak_count} day streak"


# User Streak model
class UserStreak(models.Model):
    """
    Model representing a user's streak.
    """
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='streak'
    )
    current_streak = models.PositiveIntegerField(default=0)
    last_logged_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return (
            f"{self.user.username} - Streak: {self.current_streak} days "
            f"(Last logged: {self.last_logged_date})"
        )


# Dashboard models
class DailyLog(models.Model):
    """
    Model representing a daily log for user activities.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField(default=timezone.now)
    steps = models.PositiveIntegerField(default=0)
    sleep_hours = models.DecimalField(
        max_digits=4, decimal_places=2, null=True, blank=True
    )
    water_intake_l = models.DecimalField(
        max_digits=4, decimal_places=2, null=True, blank=True
    )
    weight_kg = models.DecimalField(
        max_digits=5, decimal_places=2, null=True, blank=True
    )
    notes = models.TextField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'date'],
                name='unique_user_date_log'
            )
        ]


class NutritionLog(models.Model):
    """
    Model representing a nutrition log for user activities.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField(default=date.today)
    carbs_g = models.PositiveIntegerField(default=0)
    protein_g = models.PositiveIntegerField(default=0)
    fats_g = models.PositiveIntegerField(default=0)
    calories = models.PositiveIntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'date'],
                name='unique_nutrition_log_per_day'
            )
        ]


class Challenge(models.Model):
    """
    Model representing a fitness challenge.
    """
    owner = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='challenges',
        null=True,
    )
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    # e.g. 'steps', 'distance_km'
    metric = models.CharField(max_length=50)
    target_value = models.FloatField()
    start_date = models.DateField()
    end_date = models.DateField()

    def clean(self):
        if self.start_date > self.end_date:
            raise ValidationError("Start date must be before end date.")

    def __str__(self):
        return f"{self.title}"


class UserChallenge(models.Model):
    """
    Model representing a user's participation in a challenge.
    """
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    progress = models.FloatField(default=0.0)
    completed = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'challenge'],
                name='unique_user_challenge'
            )
        ]


class UserReport(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    report_date = models.DateField(default=timezone.now)
    total_steps = models.PositiveIntegerField()
    avg_calories = models.PositiveIntegerField()
    total_sleep_hours = models.FloatField()
    avg_water_intake_l = models.DecimalField(max_digits=4, decimal_places=2)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'report_date'],
                name='unique_user_report_date'
            )
        ]

    def __str__(self):
        return f"Report for {self.user.username} - {self.report_date}"


# Workout Plan model
class WorkoutPlan(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    exercises = models.ManyToManyField(Exercise)
    description = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'title'],
                name='unique_user_workout_plan'
            )
        ]

    def __str__(self):
        return f"{self.title} - {self.user.username}"


# Friendship model
class Friend(models.Model):
    user = models.ForeignKey(
        CustomUser,
        related_name='friends',
        on_delete=models.CASCADE
    )
    friend_user = models.ForeignKey(
        CustomUser,
        related_name='friend_of',
        on_delete=models.CASCADE
    )
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'friend_user')

    def clean(self):
        if self.user == self.friend_user:
            raise ValidationError("You cannot be friends with yourself.")
        if Friend.objects.filter(
            user=self.friend_user, friend_user=self.user
        ).exists():
            raise ValidationError("Friendship already exists.")

    def __str__(self):
        return f"{self.user.username} & {self.friend_user.username} Friends"
