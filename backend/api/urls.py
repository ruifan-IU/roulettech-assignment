from django.urls import path
from . import views

urlpatterns = [
  path('scores/', views.CreateScoreList.as_view(), name='score-list'),
  path('scores/update/<int:pk>/', views.ScoreUpdate.as_view(), name='score-update'),
]