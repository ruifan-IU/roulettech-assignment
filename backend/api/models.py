from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Chapter(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
    
class Paragraph(models.Model):
    content = models.TextField()
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name="paragraphs")

    def __str__(self):
        return self.content

class Translation(models.Model):
    content = models.TextField()
    paragraph = models.ForeignKey(Paragraph, on_delete=models.CASCADE, related_name="translations")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="translations")
    likes = models.ManyToManyField(User, related_name="likes", blank=True)

    def __str__(self):
        return self.content


    



