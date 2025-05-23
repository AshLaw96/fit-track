import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

app = Celery('backend')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'check-sleep-alarms-every-15-mins': {
        'task': 'api.tasks.check_and_send_sleep_alarms',
        'schedule': crontab(minute='*/15'),
    },
}

app.conf.beat_schedule.update({
    'check-challenge-deadlines-every-day': {
        'task': 'api.tasks.check_and_send_challenge_deadlines',
        # runs daily at 8am server time
        'schedule': crontab(hour=8, minute=0),
    }
})
