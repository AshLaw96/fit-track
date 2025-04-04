from rest_framework import generics, permissions, viewsets
from .models import CustomUser, Goal, Exercise
from .serializers import UserSerializer, GoalSerializer, ExerciseSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    API view to retrieve and update user profile.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class GoalListView(generics.ListCreateAPIView):
    """
    API view to list and create goals.
    """
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class GoalDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view to retrieve, update, or delete a goal.
    """
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Goal.objects.filter(user=self.request.user)


class ExerciseViewSet(viewsets.ModelViewSet):
    """
    API view to list, create, update, and delete exercises.
    """
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
