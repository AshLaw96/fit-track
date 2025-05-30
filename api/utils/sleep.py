from django.db.models import Sum
from ..models import SleepLog, DailyLog


def update_daily_sleep_log(user, date):
    total_sleep = SleepLog.objects.filter(user=user, date=date).aggregate(
        total=Sum("duration_hours")
    )["total"] or 0

    DailyLog.objects.update_or_create(
        user=user,
        date=date,
        defaults={"sleep_hours": total_sleep}
    )
