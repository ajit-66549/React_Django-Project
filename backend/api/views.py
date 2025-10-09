from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]    # can't call this route/view unless a valid JWT is passed
    
    # Getting an authenticated user
    def get_queryset(self):
        user = self.request.user
        #return Note.objects.all() -> gives all the notes
        return Note.objects.filter(author = user)       # gives notes of a specific user
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)
            
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()             # list of all the object to be looking while creating so won't create already existing one
    serializer_class = UserSerializer         # tells what kind of data accept to create a user
    permission_classes = [AllowAny]           # any one can call this view, even not authenticated
    
    