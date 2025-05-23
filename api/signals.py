from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import UserActivity, CustomUser
from .utils.activity import calculate_user_streak


@receiver(post_save, sender=CustomUser)
def create_user_activity(sender, instance, created, **kwargs):
    if created:
        UserActivity.objects.create(user=instance)


@receiver(user_logged_in)
def update_user_streak(sender, request, user, **kwargs):
    activity, created = UserActivity.objects.get_or_create(user=user)
    calculate_user_streak(activity)
