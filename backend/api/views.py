from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()             # list of all the object to be looking while creating so won't create already existing one
    serializer_class = UserSerializer         # tells what kind of data accept to create a user
    permission_classes = [AllowAny]             # any one can call this view, even not authenticated
    
    
    