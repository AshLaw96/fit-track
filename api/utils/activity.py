from datetime import date, timedelta


def calculate_user_streak(activity):
    today = date.today()
    yesterday = today - timedelta(days=1)

    if activity.last_active == today:
        # Already updated today
        return

    if activity.last_active == yesterday:
        activity.streak_count += 1
    else:
        activity.streak_count = 1

    activity.last_active = today
    activity.save()
