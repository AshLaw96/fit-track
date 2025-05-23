from ..models import Notification
from django.utils import timezone


def send_notification(user, title, message, type="general"):
    """
    Creates and optionally dispatches a notification to a user.

    Args:
        user (User): The user to notify.
        title (str): Notification title.
        message (str): Notification body content.
        type (str): Optional tag/type, e.g. 'sleep_reminder', 'goal_achieved'.
    """
    notification = Notification.objects.create(
        user=user,
        title=title,
        message=message,
        type=type,
        read=False,
        timestamp=timezone.now()
    )

    return notification
