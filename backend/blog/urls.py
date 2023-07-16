from django.urls import path
from . import views

urlpatterns = [
    path("posts/", views.BlogListCreateAPIView.as_view(), name="create_blog"),
    path("posts/<int:pk>", views.BlogRetrieveUpdateAPIView.as_view(), name="retieve_update_blog"),
    path('posts/<int:pk>/delete', views.BlogDeleteAPIView.as_view(), name="delete_blog"),
]