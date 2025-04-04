from django.contrib import admin
from .models import CustomUser, Goal, Exercise


admin.site.register(CustomUser)
admin.site.register(Goal)
admin.site.register(Exercise)
