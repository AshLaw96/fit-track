from django.contrib.auth.models import AbstractUser
from django.db import models


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
