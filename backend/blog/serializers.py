from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.SlugRelatedField(slug_field='username',queryset=User.objects.all())
    class Meta:
        model = Blog
        fields = ('id', 'title', 'body', "author", "created_by", "updated_at",)

    def to_representation(self, instance):
        rep = super(BlogSerializer, self).to_representation(instance)
        rep['author'] = instance.author.username
        return rep