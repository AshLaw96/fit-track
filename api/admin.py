from django.contrib import admin
from .models import (
    CustomUser, Goal, Exercise, Meal, SleepLog, Achievement, Challenge,
    UserChallenge, UserActivity, DailyLog, NutritionLog, GoalProgress
)


admin.site.register(CustomUser)
admin.site.register(Goal)
admin.site.register(Exercise)
admin.site.register(Meal)
admin.site.register(SleepLog)
admin.site.register(Achievement)
admin.site.register(Challenge)
admin.site.register(UserChallenge)
admin.site.register(UserActivity)
admin.site.register(DailyLog)
admin.site.register(NutritionLog)
admin.site.register(GoalProgress)
