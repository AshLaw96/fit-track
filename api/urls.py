from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileView,
    GoalListView,
    GoalDetailView,
    ExerciseViewSet,
)

#  Create a router and register viewset with it
router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('goals/', GoalListView.as_view(), name='goal_list'),
    path('goals/<int:pk>/', GoalDetailView.as_view(), name='goal_detail'),
    # Include all exercise routes
    path('', include(router.urls)),
]
