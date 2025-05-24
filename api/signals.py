from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.utils.timezone import now
from django.db.models.signals import post_save
from .models import UserActivity, CustomUser, Notification
from .utils.activity import calculate_user_streak
from .utils.notifications import send_notification


@receiver(post_save, sender=CustomUser)
def create_user_activity(sender, instance, created, **kwargs):
    if created:
        UserActivity.objects.create(user=instance)


@receiver(user_logged_in)
def update_user_streak(sender, request, user, **kwargs):
    activity, created = UserActivity.objects.get_or_create(user=user)
    calculate_user_streak(activity)


@receiver(user_logged_in)
def send_daily_motivation(sender, user, request, **kwargs):
    today = now().date()

    # Avoid duplicate reminders on same day
    if Notification.objects.filter(
        user=user,
        type='reminder',
        timestamp__date=today
    ).exists():
        return

    send_notification(
        user=user,
        title="New Day, New Energy 💪",
        message="Make today count. You're stronger than you think.",
        type="reminder"
    )
