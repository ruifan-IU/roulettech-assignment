from django.urls import path
from . import views

urlpatterns = [
    path("home/", views.ChapterListCreate.as_view(), name="note-list"),
    path("chapter/<int:chapter_pk>", views.ParagraphListCreate.as_view(), name="paragraph-list"),
    path("paragraph/<int:paragraph_pk>", views.TranslationListCreate.as_view(), name="translation-list"),
    path("user/<pk>", views.GetUserView.as_view(), name="get-user"),
    path("translation/<int:pk>", views.UpdateTranslation.as_view(), name="translation-update"),
    path("translation/delete/<int:pk>", views.DeleteTranslation.as_view(), name="translation-delete"),
]

