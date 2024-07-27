from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ChapterSerializer, ParagraphSerializer, TranslationSerializer, MyTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Chapter, Paragraph, Translation

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class ChapterListCreate(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [IsAuthenticated]
    
class ParagraphListCreate(generics.ListCreateAPIView):
    serializer_class = ParagraphSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
      chapter = self.kwargs["chapter_pk"]
      return Paragraph.objects.filter(chapter=chapter)


class TranslationListCreate(generics.ListCreateAPIView):
    serializer_class = TranslationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
      paragraph = self.kwargs["paragraph_pk"]
      return Translation.objects.filter(paragraph=paragraph)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
        
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class GetUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    

class UpdateTranslation(generics.RetrieveUpdateAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    
class DeleteTranslation(generics.DestroyAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = [IsAuthenticated]