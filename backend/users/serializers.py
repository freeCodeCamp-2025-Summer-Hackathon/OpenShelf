from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'name',
            'email',
            'password_hash',
            'address'
        ]
        extra_kwargs = {
            'password_hash':{'write_only': True}

        }
    def create(self,validated_data):
        validated_data['password_hash'] = make_password(validated_data['password_hash'])
        return super().create(validated_data)