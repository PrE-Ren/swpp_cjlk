from django.shortcuts import render
from snu_moyeo.serializers import MeetingSerializer, SnuUserSerializer, ParticipateSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from snu_moyeo.models import SnuUser, Meeting, Participate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from rest_framework import mixins
from rest_framework.authtoken.models import Token
from django.utils.crypto import get_random_string
from rest_framework import permissions
from django.http import HttpResponse
from snu_moyeo.permissions import UserOnlyAccess, LeaderOnlyControl
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination

OPEN = 0
CLOSED = 1
RE_OPEN = 2
RE_CLOSED = 3
BREAK_UP = 4

class Authenticate (APIView):
    queryset = SnuUser.objects.all()
    seializer_class = SnuUserSerializer
    permission_classes = ()

    def get(self, request, mySNU_verification_token, format = None):
        try:
            user = SnuUser.objects.get(mySNU_verification_token = mySNU_verification_token)
        except SnuUser.DoesNotExist:
            return Response(status = status.HTTP_404_NOT_FOUND)

        if user.mySNU_verified:
            return Response({'details':'Already verified'}, status = status.HTTP_400_BAD_REQUEST)

        print ('Authenticating...')
        serializer = SnuUserSerializer(user, data = {'email':user.email, 'mySNU_verified':True}, partial = True)

        if serializer.is_valid():
            serializer.save()
            id = serializer.data['id']
            username = serializer.data['username']
            verified = serializer.data['mySNU_verified']
            return HttpResponse("welcome! "+username+"'s mail is verified!", status = 202)
        else :
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class SignUp(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer

    # It will have to be deleted later
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, format = None):
        email = request.data['email']
        serializer = SnuUserSerializer(data = request.data)

        if serializer.is_valid():
            token = get_random_string(length = 32)
            link = "http://127.0.0.1:8000/auth/" + token + "/"
            send_mail('SnuMoyeo Authenticate', 'please click this to authenticate\n' + link, 'toro.8906@gmail.com', [request.data['email']], fail_silently = False)
            serializer.save(mySNU_verification_token = token, mySNU_verified = False)
            id =  serializer.data['id']
            username = serializer.data['username']
            verified = serializer.data['mySNU_verified']
            return Response(data = {'id':id, 'username':username, 'mySNU_verified':verified}, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LogIn(APIView):
        queryset = SnuUser.objects.all()
        serializer_class = SnuUserSerializer
        permission_classes = ()

        def get(self, request, format = None):
                print('Log in..')
                user = request.user
                if user.mySNU_verified == True:
                    return Response(data = {'user_id':user.id, 'email':user.email, 'mySNU_verification_token':user.mySNU_verification_token, 'name':user.name}, status = status.HTTP_202_ACCEPTED)
                else :
                    return Response(data = {'details':'Not SNU verified.'}, status = status.HTTP_403_FORBIDDEN)

class SnuUserList(generics.ListAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer

class SnuUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer
    permission_classes = (UserOnlyAccess,)

class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def perform_create(self, serializer):
        serializer.save(leader = self.request.user)

class MeetingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, LeaderOnlyControl,)

class ParticipateList(generics.ListCreateAPIView):
    queryset = Participate.objects.all()
    serializer_class = ParticipateSerializer

class ParticipateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Participate.objects.all()
    serializer_class = ParticipateSerializer

def get_participate(request, in_userid, in_meetingid):
    participate_obj1 = Participate.objects.filter(Q(user_id_id = in_userid))
    participate_list1 = participate_obj1.values()
    participate_obj2 = participate_obj1.filter(Q(meeting_id_id = in_meetingid))
    participate_list2 = participate_obj2.values()
    # print(participate_obj2.values())

    if len(participate_list2) == 0 :
        return HttpResponse({}, status = status.HTTP_404_NOT_FOUND)
    participate_id = participate_list2[0]['id']
    return HttpResponse(participate_id, status = status.HTTP_200_OK)

class RecentList(generics.ListAPIView):
    queryset = Meeting.objects.all().filter(Q(state = OPEN) | Q(state = RE_OPEN))[:5]
    serializer_class = MeetingSerializer

class ImpendingList(generics.ListAPIView):
    queryset = Meeting.objects.all().filter(Q(state = OPEN) | Q(state = RE_OPEN)).order_by('due')[:5]
    serializer_class = MeetingSerializer

class LeadList(generics.ListAPIView):
    serializer_class = MeetingSerializer
    def get_queryset(self):
        user = self.request.user
        if (not user.is_anonymous):
            lead_user = SnuUser.objects.get(id = user.id)
            return lead_user.lead_meeting.all()
        return Meeting.objects.none()
    # Meeting.objects.filter(Q(leader = user) and ~Q(state = BREAK_UP))

class JoinList (generics.ListAPIView):
    serializer_class = MeetingSerializer
    def get_queryset(self):
        user = self.request.user
        if (not user.is_anonymous):
            user_id = user.id
            join_user = SnuUser.objects.get(id = user_id)
            return join_user.meetings.all().filter(~Q(state = BREAK_UP))
        return Meeting.objects.none()

class HistoryList (generics.ListAPIView):
    serializer_class = MeetingSerializer
    # queryset = SnuUser.objects.filter(Q(id = request.user.id))
    def get_queryset(self):
        user = self.request.user
        if (not user.is_anonymous):
            user_id = user.id
            history_user = SnuUser.objects.get(id = user_id)
            return history_user.meetings.all().filter(Q(state = BREAK_UP))
        return Meeting.objects.none()

class CustomPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page_size': self.page_size,
            'results': data
        })

'''
simple version pagination (not used now)
class TempList(generics.ListAPIView):
    serializer_class = MeetingSerializer
    pagination_class = CustomPagination

    def get_queryset(self):
        temp_meeting = Meeting.objects.filter(~Q(state=4))
        return temp_meeting
'''

class ListView(APIView):
    def get(self, request, in_kind, format = None):
        kind_meeting = Meeting.objects.filter(Q(kind = in_kind) & ~Q(state = BREAK_UP))
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(kind_meeting, request)
        serializer = MeetingSerializer(result_page, many = True)
        return paginator.get_paginated_response(serializer.data)
