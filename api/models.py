from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone
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

    def __str__(self):
        return f"{self.goal} on {self.date}"


# Exercise model
class Exercise(models.Model):
    """
    Model representing an exercise entry.
    """
    name = models.CharField(max_length=100)
    duration = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()
    date = models.DateField()

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
    user = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="meals"
    )
    name = models.CharField(max_length=100)
    calories = models.IntegerField()
    protein = models.FloatField(null=True, blank=True)
    carbs = models.FloatField(null=True, blank=True)
    fats = models.FloatField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.user.username}"


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
    duration_hours = models.FloatField()
    quality_rating = models.IntegerField(
        choices=[
            (1, "Poor"),
            (2, "Fair"),
            (3, "Good"),
            (4, "Excellent"),
        ]
    )
    date = models.DateField(auto_now_add=True)

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


