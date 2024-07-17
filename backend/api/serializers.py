from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile, QuizScore

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True, "required": True}}
    
    def create (self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
      
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["id", "user", "score"]
        extra_kwargs = {"user": {"read_only": True}}

class QuizScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizScore
        fields = ["id", "user", "score", "date"]
        extra_kwargs = {"user": {"read_only": True}}


    
    