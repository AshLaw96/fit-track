from rest_framework import serializers
from .models import CustomUser, Goal, Exercise


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
        fields = '__all__'
