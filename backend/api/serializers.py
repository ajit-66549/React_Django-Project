from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only" : True}} # tells django we want password only when creating user; but not be returning while giving info about user
        
    #implementing a ethod that will be called when we are creating a user
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data) # **validated_data -> splits the keyword arguments and pass the data
        return user 