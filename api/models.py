from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


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
