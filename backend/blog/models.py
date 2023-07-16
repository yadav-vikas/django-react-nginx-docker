from django.db import models
from django.contrib.auth.models import User

class Blog(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False)
    body = models.TextField()
    author = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_blog')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='updated_blog')
