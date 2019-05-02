from django.shortcuts import render
from snu_moyeo.serializers import MeetingSerializer, SnuUserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from snu_moyeo.models import SnuUser,Meeting
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from rest_framework import mixins
from rest_framework.authtoken.models import Token
from django.utils.crypto import get_random_string
from rest_framework import permissions
from django.http import HttpResponse

def valid_id(username):
    return '@' not in username

class Authenticate (APIView):
    queryset = SnuUser.objects.all()
    seializer_class = SnuUserSerializer
    permission_classes = ()

    def get(self, request, mySNU_verification_token, format = None):
        try:
            user = SnuUser.objects.get(mySNU_verification_token = mySNU_verification_token)
        except SnuUser.DoesNotExst:
            return Response(status = status.HTTP_404_NOT_FOUND)

        if user.mySNU_verified:
            return Response({'details': 'Already verified'}, status = status.HTTP_400_BAD_REQUEST)

        print ('authenticating...')
        serializer = SnuUserSerializer(user, data={'mySNU_verified': True}, partial=True)

        if serializer.is_valid():
            serializer.save()
            id = serializer.data['id']
            username = serializer.data['username']
            verified = serializer.data['mySNU_verified']
            return HttpResponse('welcome! '+username+'s mail is verified!',  status=202)
        else :
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class SignUp(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset =  SnuUser.objects.all()
    serializer_class = SnuUserSerializer

    # later will must be deleted
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, format=None):
        username = request.data['username']
        serializer = SnuUserSerializer(data=request.data)

        if serializer.is_valid():
            token = get_random_string(length=32)
            link = "http://127.0.0.1:8000/auth/" + token + "/"
            send_mail('SnuMoyeo Authenticate', link, 'toro.8906@gmail.com', ['sdrjseka96@snu.ac.kr'], fail_silently=False)
            serializer.save(mySNU_verification_token = token, mySNU_verified=False)
            id =  serializer.data['id']
            username = serializer.data['username']
            verified = serializer.data['mySNU_verified']
            return Response(data={'id':id, 'username':username, 'mySNU_verified':verified}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LogIn(APIView):
        queryset = SnuUser.objects.all()
        serializer_class = SnuUserSerializer
        permission_classes = (permissions.IsAuthenticated,)

        def get(self, request, format=None):
                print('log in..')
                user = request.user
                if user.mySNU_verified == True:
                    return Response(data = {'username': user.username}, status=status.HTTP_202_ACCEPTED)
                else :
                    return Response(data = {'details' : 'Not SNU verified.'}, status=status.HTTP_403_FORBIDDEN)

class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = ()
    # def perform_create(self,serializer):
    #    serializer.save(leader=self.request.name)

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = ()
