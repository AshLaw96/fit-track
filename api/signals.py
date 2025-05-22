from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.db.models.signals import post_save
from datetime import date, timedelta
from .models import UserActivity, CustomUser


@receiver(post_save, sender=CustomUser)
def create_user_activity(sender, instance, created, **kwargs):
    if created:
        UserActivity.objects.create(user=instance)


@receiver(user_logged_in)
def update_user_streak(sender, request, user, **kwargs):
    activity, created = UserActivity.objects.get_or_create(user=user)
    today = date.today()
    yesterday = today - timedelta(days=1)

    if activity.last_active == today:
        # Already updated today, no action
        return

    if activity.last_active == yesterday:
        activity.streak_count += 1
    else:
        # reset streak if missed a day
        activity.streak_count = 1

    activity.last_active = today
    activity.save()
