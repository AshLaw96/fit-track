from celery import shared_task
from django.utils import timezone
from datetime import datetime, timedelta
from .models import SleepSchedule, UserChallenge
from .utils.notifications import send_notification


@shared_task
def check_and_send_sleep_alarms():
    now = timezone.localtime().time()
    upcoming_window = (
        datetime.combine(timezone.now().date(), now) +
        timedelta(minutes=30)
    ).time()

    schedules = SleepSchedule.objects.select_related("user").all()

    for schedule in schedules:
        if (
            schedule.active and
            schedule.target_bedtime and
            now <= schedule.target_bedtime <= upcoming_window
        ):
            send_notification(
                user=schedule.user,
                title="Bedtime Soon",
                message="Your scheduled bedtime is coming up in 30 minutes.",
                type="sleep_reminder"
            )


@shared_task
def check_and_send_challenge_deadlines():
    today = timezone.now().date()
    soon = today + timedelta(days=1)

    user_challenges = UserChallenge.objects.filter(
        completed=False,
        challenge__end_date__lte=soon,
        challenge__end_date__gte=today
    ).select_related('user', 'challenge')

    for uc in user_challenges:
        days_left = (uc.challenge.end_date - today).days
        if days_left == 1:
            title = "Challenge Deadline Approaching"
            msg = f"Your challenge '{uc.challenge.title}' ends tomorrow!"
        elif days_left == 0:
            title = "Challenge Deadline Today"
            msg = (
                f"Your challenge '{uc.challenge.title}' ends today. "
                "Finish strong!"
            )
        else:
            continue

        send_notification(uc.user, title, msg, type="challenge_deadline")
