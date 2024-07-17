from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ProfileSerializer, QuizScoreSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Profile, QuizScore
# Create your views here.

class CreateScoreList(generics.ListCreateAPIView):
    queryset = QuizScore.objects.all()
    serializer_class = QuizScoreSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return self.queryset.all()
      
    def perform_create(self, serializer):
      if serializer.is_valid():
        serializer.save(user=self.request.user)
      else:
        print(serializer.errors)

class ScoreUpdate(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = QuizScoreSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return QuizScore.objects.filter(user=self.request.user)
      
    def perform_update(self, serializer):
      if serializer.is_valid():
        serializer.save(user=self.request.user)
      else:
        print(serializer.errors)

class CreateMyProfile(generics.CreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Profile.filter(user=self.request.user)
    
    def perform_create(self, serializer):
      if serializer.is_valid():
        serializer.save(user=self.request.user)
      else:
        print(serializer.errors)
      
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]