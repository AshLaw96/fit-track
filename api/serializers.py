from django.contrib.auth.models import update_last_login
from django.utils import timezone
from django.utils.timezone import now
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueTogetherValidator
from datetime import date
from .models import (
    CustomUser, Goal, Exercise, Meal, SleepLog, Achievement, UserActivity,
    GoalProgress, UserStreak, DailyLog, NutritionLog, Challenge,
    UserChallenge, UserReport, WorkoutPlan, SleepSchedule,
    Notification, DailyWorkout
)
from .utils.notifications import send_notification
from .signals import check_and_award_achievement


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model.
    """
    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'dob',
            'height_cm',
            'weight_kg',
            'profile_image_url'
        ]
        read_only_fields = ['id']


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(
        write_only=True, required=True, label='Confirm Password'
    )

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(
                "Passwords do not match."
            )
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data

        user = self.user
        today = now().date()

        # Check if they've already received a reminder today
        if not Notification.objects.filter(
            user=user,
            type="reminder",
            timestamp__date=today
        ).exists():
            send_notification(
                user,
                title="New Day, New Energy 💪",
                message="Make today count. You're stronger than you think.",
                type="reminder"
            )

        # Manually update last_login
        update_last_login(None, user)

        return data


class GoalSerializer(serializers.ModelSerializer):
    """
    Serializer for the Goal model.
    """
    class Meta:
        model = Goal
        # Include all fields from the Goal model
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

    def validate_target_value(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Target value must be greater than 0."
            )
        return value

    def validate_deadline(self, value):
        if value and value < date.today():
            raise serializers.ValidationError("Deadline can't be in the past.")
        return value


class ExerciseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Exercise model.
    """
    class Meta:
        model = Exercise
        fields = [
            'id', 'type', 'category', 'name', 'duration',
            'calories_burned', 'notes', 'date', 'user'
        ]
        read_only_fields = ['id', 'user']

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Duration must be greater than 0."
            )
        return value

    def validate_calories_burned(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Calories burned must be non-negative."
            )
        return value


class MealSerializer(serializers.ModelSerializer):
    """
    Serializer for the Meal model.
    """
    class Meta:
        model = Meal
        fields = '__all__'
        read_only_fields = ['user', 'timestamp']

    def validate_calories(self, value):
        if value < 0:
            raise serializers.ValidationError("Calories must be non-negative.")
        return value

    def validate_protein(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Protein must be non-negative.")
        return value

    def validate_carbs(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Carbs must be non-negative.")
        return value

    def validate_fats(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Fats must be non-negative.")
        return value

    def validate_liters(self, data):
        if data.get("meal_type") == "drink" and not data.get("water_amount"):
            raise serializers.ValidationError({
                "water_amount": "This field is required for drink entries."
            })
        return data


class SleepLogSerializer(serializers.ModelSerializer):
    """
    Serializer for the SleepLog model.
    """
    class Meta:
        model = SleepLog
        fields = '__all__'
        read_only_fields = ['user']

    def validate_duration_hours(self, value):
        if value <= 0 or value > 24:
            raise serializers.ValidationError(
                "Duration must be between 0 and 24."
            )
        return value

    def validate_quality_rating(self, value):
        if value not in [1, 2, 3, 4]:
            raise serializers.ValidationError("Invalid quality rating.")
        return value


class SleepScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepSchedule
        fields = '__all__'
        read_only_fields = ['user']


class AchievementSerializer(serializers.ModelSerializer):
    """
    Serializer for the Achievement model.
    """
    class Meta:
        model = Achievement
        fields = [
            'id',
            'user',
            'category',
            'title',
            'description',
            'icon',
            'date_earned'
        ]
        read_only_fields = ['user', 'date_earned']


class UserActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for the UserActivity model.
    """
    class Meta:
        model = UserActivity
        fields = '__all__'
        read_only_fields = ['user', 'last_active']


class GoalProgressSerializer(serializers.ModelSerializer):
    """
    Serializer for the GoalProgress model.
    """
    goal_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = GoalProgress
        fields = [
            'id',
            'goal',
            'goal_id',
            'date',
            'progress_value',
            'completed'
        ]
        read_only_fields = ['id', 'goal', 'date']

    def validate_progress_value(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Progress must be greater than 0."
            )
        return value

    def validate(self, attrs):
        goal_id = attrs.get('goal_id')
        request = self.context.get('request')
        user = request.user if request else None

        try:
            goal = Goal.objects.get(id=goal_id, user=user)
        except Goal.DoesNotExist:
            raise serializers.ValidationError({
                'goal_id': 'Invalid goal ID for this user.'
            })

        # inject the validated goal instance
        attrs['goal'] = goal
        return attrs

    def create(self, validated_data):
        # Remove goal_id from validated_data
        validated_data.pop('goal_id', None)
        instance = super().create(validated_data)

        # Re-check and save goal status
        goal = instance.goal
        goal.current_value += instance.progress_value
        goal.save()

        if goal.status == "achieved":
            check_and_award_achievement(
                goal.user, goal
            )

        return instance


class UserStreakSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserStreak model.
    """
    class Meta:
        model = UserStreak
        fields = [
            'id',
            'current_streak',
            'last_logged_date'
        ]

    def create(self, validated_data):
        # Automatically assign the authenticated user
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Ensure the streak is only updated by the user it belongs to
        validated_data['user'] = self.context['request'].user
        return super().update(instance, validated_data)

    def validate(self, data):
        if (
            'last_logged_date' in data and
            data['last_logged_date'] > timezone.now().date()
        ):
            raise serializers.ValidationError(
                "The last_logged_date cannot be in the future."
            )
        return data


class DailyLogSerializer(serializers.ModelSerializer):
    """
    Serializer for the DailyLog model.
    """
    class Meta:
        model = DailyLog
        fields = [
            'id', 'user', 'date', 'steps', 'sleep_hours', 'water_intake_l',
            'weight_kg', 'notes'
        ]
        # Ensure user field is read-only
        read_only_fields = ['user']

    def validate(self, data):
        user = self.context['request'].user
        date = data.get('date', None)
        if (
            self.instance is None and
            DailyLog.objects.filter(user=user, date=date).exists()
        ):
            raise serializers.ValidationError(
                "A log already exists for this date."
            )
        return data

    def validate_steps(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Steps must be a non-negative integer."
            )
        return value

    def validate_sleep_hours(self, value):
        if value is not None and (value < 0 or value > 24):
            raise serializers.ValidationError(
                "Sleep hours must be between 0 and 24."
            )
        return value

    def validate_water_intake_l(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError(
                "Water intake must be a non-negative number."
            )
        return value

    def validate_weight_kg(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError(
                "Weight must be a non-negative number."
            )
        return value


class NutritionLogSerializer(serializers.ModelSerializer):
    """
    Serializer for the NutritionLog model.
    """
    class Meta:
        model = NutritionLog
        fields = [
            'id', 'user', 'date', 'carbs_g', 'protein_g', 'fats_g', 'calories'
        ]
        read_only_fields = ['user']

    def validate(self, data):
        user = self.context['request'].user
        date_val = data.get('date')
        if (
            self.instance is None and
            NutritionLog.objects.filter(user=user, date=date_val).exists()
        ):
            raise serializers.ValidationError(
                "A nutrition log already exists for this date."
            )
        return data

    def validate_carbs_g(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Carbs must be a non-negative integer."
            )
        return value

    def validate_protein_g(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Protein must be a non-negative integer."
            )
        return value

    def validate_fats_g(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Fats must be a non-negative integer."
            )
        return value

    def validate_calories(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Calories must be a non-negative integer."
            )
        return value


class ChallengeSerializer(serializers.ModelSerializer):
    """
    Serializer for the Challenge model.
    """
    owner = serializers.SerializerMethodField()

    def get_owner(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user') and request.user == obj.owner:
            return obj.owner.id
        return None

    class Meta:
        model = Challenge
        fields = [
            'id', 'owner', 'title', 'description', 'metric',
            'target_value', 'start_date', 'end_date', 'is_public'
        ]


class UserChallengeSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserChallenge model.
    Includes challenge metadata and challenge ID for frontend use.
    """
    title = serializers.CharField(source='challenge.title', read_only=True)
    target = serializers.FloatField(
        source='challenge.target_value', read_only=True
    )
    metric = serializers.CharField(source='challenge.metric', read_only=True)
    user_points = serializers.IntegerField(
        source='user.points',
        read_only=True
    )
    challenge_id = serializers.IntegerField(
        source='challenge.id', read_only=True
    )
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserChallenge
        fields = [
            'id', 'user', 'challenge', 'challenge_id', 'progress', 'completed',
            'title', 'target', 'metric', 'user_points',
        ]
        read_only_fields = ['user']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        print(f"[SERIALIZER DEBUG] {rep}")
        return rep


class UserReportSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserReport model.
    """
    class Meta:
        model = UserReport
        fields = [
            'id', 'user', 'report_date', 'total_steps', 'avg_calories',
            'total_sleep_hours', 'avg_water_intake_l'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=UserReport.objects.all(),
                fields=['user', 'report_date'],
                message="Report for this date already exists."
            )
        ]

    def validate(self, data):
        request_user = self.context['request'].user
        if data.get('user') != request_user:
            raise serializers.ValidationError(
                "You can only create reports for yourself."
            )
        return data


class DailyWorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyWorkout
        fields = ['id', 'date', 'time', 'activity', 'duration']

    def validate_time(self, value):
        if not value:
            raise serializers.ValidationError("Time is required.")
        return value


class WorkoutPlanSerializer(serializers.ModelSerializer):
    """
    Serializer for the WorkoutPlan model without nesting `Exercise` serializer.
    Instead of nested exercise data, we handle the relationship via
    `exercise_ids`.
    """
    daily_workouts = DailyWorkoutSerializer(many=True)

    class Meta:
        model = WorkoutPlan
        fields = [
            'id',
            'user',
            'title',
            'description',
            'date_created',
            'daily_workouts',
            'auto_repeat',
        ]
        read_only_fields = ['user', 'date_created']

    def create(self, validated_data):
        daily_data = validated_data.pop('daily_workouts')
        user = self.context['request'].user
        plan = WorkoutPlan.objects.create(user=user, **validated_data)
        for entry in daily_data:
            DailyWorkout.objects.create(workout_plan=plan, **entry)
        return plan

    def update(self, instance, validated_data):
        daily_data = validated_data.pop('daily_workouts', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if daily_data is not None:
            instance.daily_workouts.all().delete()
            for entry in daily_data:
                DailyWorkout.objects.create(workout_plan=instance, **entry)

        return instance


class GoalWithProgressSerializer(serializers.ModelSerializer):
    completion_percent = serializers.SerializerMethodField()

    class Meta:
        model = Goal
        fields = [
            'id',
            'user',
            'goal_type',
            'target_value',
            'current_value',
            'status',
            'created_at',
            'deadline',
            'completion_percent'
        ]

    def get_completion_percent(self, obj):
        if obj.target_value > 0:
            return round((obj.current_value / obj.target_value) * 100, 2)
        return 0.0


class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for the Notification model.
    """
    class Meta:
        model = Notification
        fields = [
            'id', 'title', 'message', 'type', 'read', 'timestamp', 'link'
        ]


class UserPreferenceSerializer(serializers.ModelSerializer):
    """
    Serializer for user preferences, such as dark mode.
    """
    class Meta:
        model = CustomUser
        fields = ['prefers_dark_mode', 'unit_preferences']
