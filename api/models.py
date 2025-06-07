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
    profile_image_url = models.URLField(null=True, blank=True)
    points = models.PositiveIntegerField(default=0)
    prefers_dark_mode = models.BooleanField(default=False)
    unit_preferences = models.JSONField(
        default=dict,
        help_text="User's unit preferences for measurements."
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
        prev_status = None
        if self.pk:
            prev_status = Goal.objects.get(pk=self.pk).status

        if self.current_value >= self.target_value:
            self.status = 'achieved'

        super().save(*args, **kwargs)

        # Create achievement if newly achieved
        if self.status == 'achieved' and prev_status != 'achieved':
            Achievement.objects.get_or_create(
                user=self.user,
                category=self.goal_type,
                title=f"{self.goal_type.title()} Goal Achieved",
                defaults={"description": "You achieved your goal!"}
            )

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


# Sleep Schedule model
class SleepSchedule(models.Model):
    """
    Model representing a user's sleep schedule.
    """
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    target_bedtime = models.TimeField(null=True, blank=True)
    target_wake_time = models.TimeField(null=True, blank=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.username} schedule"


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

    def get_total_calories(user, date):
        log = NutritionLog.objects.filter(user=user, date=date).first()
        return log.calories if log else 0

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
    is_public = models.BooleanField(default=False)

    def clean(self):
        if self.start_date > self.end_date:
            raise ValidationError("Start date must be before end date.")

    @property
    def can_be_joined(self):
        from django.utils.timezone import now
        return (
            self.is_public
            and self.start_date <= now().date() <= self.end_date
        )

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
    last_known_rank = models.IntegerField(null=True, blank=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'challenge'],
                name='unique_user_challenge'
            )
        ]

    def increment_progress(self, amount=1):
        self.progress += amount
        if self.progress >= self.challenge.target_value and not self.completed:
            self.completed = True
            self.user.points += 1
            self.user.save(update_fields=["points"])
        self.save(update_fields=["progress", "completed"])


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
    description = models.TextField(blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    auto_repeat = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'title'],
                name='unique_user_workout_plan'
            )
        ]

    def __str__(self):
        return f"{self.title} - {self.user.username}"


# Daily Workout model
class DailyWorkout(models.Model):
    workout_plan = models.ForeignKey(
        WorkoutPlan,
        on_delete=models.CASCADE,
        related_name='daily_workouts'
    )
    date = models.DateField()
    time = models.TimeField()
    activity = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.date} - {self.time} - {self.activity}"


# Notification model
class Notification(models.Model):
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="notifications"
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    type = models.CharField(max_length=50, default="general")
    read = models.BooleanField(default=False)
    link = models.CharField(
        max_length=300,
        null=True,
        blank=True,
        help_text="Optional internal link or anchor path."
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.title}"
