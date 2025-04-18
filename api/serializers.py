from rest_framework import serializers
from .models import (
    CustomUser, Goal, Exercise, Meal,
    SleepLog, Achievement, UserActivity,
    GoalProgress, UserStreak, DailyLog,
    NutritionLog, Challenge, UserChallenge,
    UserReport, Friend, WorkoutPlan
)


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the CustomUser model.
    """
    profile_image = serializers.ImageField(use_url=True)

    class Meta:
        model = CustomUser
        fields = [
            'id',
            'username',
            'email',
            'dob',
            'height_cm',
            'weight_kg',
            'profile_image'
        ]


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


class ExerciseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Exercise model.
    """
    class Meta:
        model = Exercise
        fields = [
            'id', 'name', 'duration', 'calories_burned',
        ]
        read_only_fields = ['id']

    def validate_duration(self, value):
        if value <= 0:
            raise serializers.ValidationError(
                "Duration must be greater than 0."
            )
        return value

    def validate_calories_burned(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Calories burned must be a non-negative number."
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


class SleepLogSerializer(serializers.ModelSerializer):
    """
    Serializer for the SleepLog model.
    """
    class Meta:
        model = SleepLog
        fields = '__all__'
        read_only_fields = ['user', 'date']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


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

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


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
        return super().create(validated_data)


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
        # Make sure the user field is set during updates
        validated_data['user'] = self.context['request'].user
        return super().update(instance, validated_data)


class DailyLogSerializer(serializers.ModelSerializer):
    """
    Serializer for the DailyLog model.
    """
    class Meta:
        model = DailyLog
        fields = '__all__'
        # Ensure user field is read-only
        read_only_fields = ['user']

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
        fields = '__all__'
        read_only_fields = ['user']

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
    class Meta:
        model = Challenge
        fields = '__all__'


class UserChallengeSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserChallenge model.
    """
    class Meta:
        model = UserChallenge
        fields = '__all__'
        read_only_fields = ['user']


class UserReportSerializer(serializers.ModelSerializer):
    """
    Serializer for the UserReport model.
    """
    class Meta:
        model = UserReport
        fields = '__all__'
        read_only_fields = ['user', 'report_date']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class FriendSerializer(serializers.ModelSerializer):
    """
    Serializer for the Friend model.
    """
    class Meta:
        model = Friend
        fields = '__all__'
        read_only_fields = ['user', 'date_added']

    def validate(self, data):
        request = self.context.get('request')
        user = request.user if request else None
        # Prevent adding a friend to oneself
        if data['friend_user'] == user:
            raise serializers.ValidationError("You cannot befriend yourself.")
        return data


class WorkoutPlanSerializer(serializers.ModelSerializer):
    """
    Serializer for the WorkoutPlan model without nesting `Exercise` serializer.
    Instead of nested exercise data, we handle the relationship via
    `exercise_ids`.
    """
    exercises = serializers.PrimaryKeyRelatedField(
        queryset=Exercise.objects.all(),
        many=True
    )

    class Meta:
        model = WorkoutPlan
        fields = '__all__'
        read_only_fields = ['user', 'date_created']

    def create(self, validated_data):
        # Get the list of exercise IDs
        exercises = validated_data.pop('exercises')
        user = self.context['request'].user
        workout_plan = WorkoutPlan.objects.create(user=user, **validated_data)

        # Add the exercises to the workout plan
        workout_plan.exercises.set(exercises)
        return workout_plan

    def update(self, instance, validated_data):
        # Get the list of exercise IDs
        exercises = validated_data.pop('exercises', None)

        # Update other fields on instance
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if exercises is not None:
            # Update the exercises for the workout plan
            instance.exercises.set(exercises)

        return instance
