from django.shortcuts import render

from .models import Blog
from .serializers import BlogSerializer

from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class BlogListCreateAPIView(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogDeleteAPIView(generics.DestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer