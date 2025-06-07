from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.utils.timezone import now
from django.db.models.signals import post_save
from .models import UserActivity, CustomUser, Notification, Goal, Achievement
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
        type="reminder",
        link="/"
    )


def check_and_award_achievement(user, goal):
    achieved_count = Goal.objects.filter(
        user=user,
        goal_type=goal.goal_type,
        status="achieved"
    ).count()

    # Award up to 3 stars (e.g., 1 achievement per completed goal)
    if achieved_count <= 3 and not Achievement.objects.filter(
        user=user,
        category=goal.goal_type,
        title=f"{goal.goal_type.title()} Star {achieved_count}"
    ).exists():
        Achievement.objects.create(
            user=user,
            category=goal.goal_type,
            title=f"{goal.goal_type.title()} Star {achieved_count}",
            description=f"Completed {achieved_count} {goal.goal_type} goals!"
        )
