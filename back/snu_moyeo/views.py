from django.shortcuts import render
from snu_moyeo.serializers import MeetingSerializer, SnuUserSerializer, ParticipateSerializer, CommentSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from snu_moyeo.models import SnuUser, Meeting, Participate, Comment
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from rest_framework import mixins
from rest_framework.authtoken.models import Token
from django.utils.crypto import get_random_string
from rest_framework import permissions
from django.http import HttpResponse, JsonResponse
from snu_moyeo.permissions import UserOnlyAccess, LeaderOnlyControl
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from sdk.api.message import Message
from sdk.exceptions import CoolsmsException
import random
import sys
import django 

OPEN = 0
CLOSED = 1
RE_OPEN = 2
RE_CLOSED = 3
BREAK_UP = 4

def send_message(to_number, code):
    # set api key, api secret
    api_key = "NCSTXGIWAWFV3UHU"
    api_secret = "4DO7XGNVKEOGGDDDDXWESGCVNW9MFBGP"

    ## 4 params(to, from, type, text) are mandatory. must be filled
    params = dict()
    params['type'] = 'sms' # Message type ( sms, lms, mms, ata )
    params['to'] =  str(to_number)  # Recipients Number '01000000000, 01000000001'
    params['from'] = '01040079493' # Sender number
    params['text'] = str(code)  # Authentication code

    cool = Message(api_key, api_secret)
    try:
        response = cool.send(params)
        print("Success Count : %s" % response['success_count'])
        print("Error Count : %s" % response['error_count'])
        print("Group ID : %s" % response['group_id'])

        if "error_list" in response:
            print("Error List : %s" % response['error_list'])

    except CoolsmsException as e:
        print("Error Code : %s" % e.code)
        print("Error Message : %s" % e.msg)

class SignUp(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer

    # for debugging
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, format = None):
        # email = request.data['email']
        # phone = request.data['phone_number']

        user_serializer = SnuUserSerializer(data = request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status.HTTP_201_CREATED)
        else :
            return Response(user_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

        '''
        if serializer.is_valid():
            email_token = random.randint(10000000, 99999999)
            send_mail('SnuMoyeo Authenticate', 'Authentication Code : ' + str(email_token),
                      'toro.8906@gmail.com', [request.data['email']], fail_silently = False)

            phone_token = random.randint(10000000, 99999999)
            send_message(phone, phone_token)

            serializer.save(mySNU_verification_token = email_token, mySNU_verified = False, phone_verification_token = phone_token, phone_verified = False)

            id =  serializer.data['id']
            username = serializer.data['username']
            email_verified = serializer.data['mySNU_verified']
            phone_verify = serializer.data['phone_verified']
            return Response(data = {'id':id, 'username':username, 'mySNU_verified':email_verified , 'phone_verified' : phone_verify}, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        '''

class SendEmail(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer

    def get(self, request, email):
        user = request.user
        email_token = random.randint(10000000, 99999999)
        send_mail('SnuMoyeo Authenticate', 'Authentication Code : ' + str(email_token),
                'toro.8906@gmail.com', [email], fail_silently = False)

        user_serializer = SnuUserSerializer(user, data = {'mySNU_verification_token':email_token}, partial = True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        else :
            return Response(user_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class EmailAuthenticate (APIView):
    # queryset = SnuUser.objects.all()
    # seializer_class = SnuUserSerializer
    # permission_classes = ()

    def get(self, request, email_token, email):
        print('Email authenticationg...')
        user = request.user
        if (user.mySNU_verified):
            return Response({'details':'Already verified'}, status = status.HTTP_400_BAD_REQUEST)
        if (user.mySNU_verification_token == email_token):
            user_serializer = SnuUserSerializer(user, data = {'email':email, 'mySNU_verified':True}, partial = True)

        if user_serializer.is_valid():
            user_serializer.save()
            return HttpResponse("Email verification done!", status = 202)
        else :
            return Response(user_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class SendPhone(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer

    def get(self, request, phone_number):
        user = request.user
        phone_token = random.randint(10000000, 99999999)
        send_message(phone_number, phone_token)

        user_serializer = SnuUserSerializer(user, data = {'phone_verification_token':phone_token}, partial = True)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        else :
            return Response(user_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class SMSAuthenticate (APIView):
    # queryset = SnuUser.objects.all()
    # serializer_class = SnuUserSerializer
    # permission_class = ()

    def get(self, request, phone_token, phone_number) :
        print('Phone authenticationg...')
        user = request.user
        if (user.phone_verified):
            return Response({'details':'Already verified'}, status = status.HTTP_400_BAD_REQUEST)
        if (user.phone_verification_token == phone_token):
            user_serializer = SnuUserSerializer(user, data = {'phone_number':phone_number, 'phone_verified':True}, partial = True)

        if user_serializer.is_valid():
            user_serializer.save()
            return HttpResponse("Phone verification done!", status = 202)
        else :
            return Response(user_serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class LogIn(APIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer
    permission_classes = ()

    def get(self, request, format = None):
        print('Log in..')
        user = request.user
        if user.mySNU_verified == True and user.phone_verified == True:
            return Response(data = {
                'user_id':user.id,
                'email':user.email,
                'phone_number':user.phone_number,
                'mySNU_verification_token':user.mySNU_verification_token,
                'name':user.name
                }, status = status.HTTP_202_ACCEPTED)
        else :
            return Response(data = {'details':'Not SNU verified.'}, status = status.HTTP_403_FORBIDDEN)

class SnuUserList(generics.ListAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer

class SnuUserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SnuUser.objects.all()
    serializer_class = SnuUserSerializer
    permission_classes = (UserOnlyAccess,)

def changeState():
    current = django.utils.timezone.now()
    print(current)
    Meeting.objects.filter(Q(state = OPEN) & Q(due__lt = current)).update(state = CLOSED)

    for meeting_object in Meeting.objects.filter(Q(state = CLOSED) & Q(due__lt = current)):
        meeting_object.save()

class MeetingList(generics.ListCreateAPIView):
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    def perform_create(self, serializer):
        serializer.save(leader = self.request.user)

    def get(self, request, *args, **kwargs):
        changeState()
        return self.list(request, *args, **kwargs)

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

    def get(self, request, *args, **kwargs):
        changeState()
        return self.list(request, *args, **kwargs)

class ImpendingList(generics.ListAPIView):
    queryset = Meeting.objects.all().filter(Q(state = OPEN) | Q(state = RE_OPEN)).order_by('due')[:5]
    serializer_class = MeetingSerializer

    def get(self, request, *args, **kwargs):
        changeState()
        return self.list(request, *args, **kwargs)

class LeadList(generics.ListAPIView):
    serializer_class = MeetingSerializer
    def get_queryset(self):
        user = self.request.user
        if (not user.is_anonymous):
            lead_user = SnuUser.objects.get(id = user.id)
            return lead_user.lead_meeting.all()
        return Meeting.objects.none()
    # Meeting.objects.filter(Q(leader = user) and ~Q(state = BREAK_UP))

    def get(self, request, *args, **kwargs):
        changeState()
        return self.list(request, *args, **kwargs)

class JoinList (generics.ListAPIView):
    serializer_class = MeetingSerializer
    def get_queryset(self):
        user = self.request.user
        if (not user.is_anonymous):
            user_id = user.id
            join_user = SnuUser.objects.get(id = user_id)
            return join_user.meetings.all().filter(~Q(state = BREAK_UP))
        return Meeting.objects.none()

    def get(self, request, *args, **kwargs):
        changeState()
        return self.list(request, *args, **kwargs)

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

    def get(self, request, *args, **kwargs):
        changeState()
        return self.list(request, *args, **kwargs)

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
        changeState()
        kind_meeting = Meeting.objects.filter(Q(kind = in_kind) & (Q(state = OPEN) | Q(state = RE_OPEN)))
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(kind_meeting, request)
        serializer = MeetingSerializer(result_page, many = True)
        return paginator.get_paginated_response(serializer.data)

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(writer = self.request.user)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (UserOnlyAccess,)


class CommentOnMeeting(APIView):
       
    def get(self, request, in_meetingid):
        comments = Comment.objects.filter(Q(meeting_id_id = in_meetingid))
        serializer = CommentSerializer(comments, many = True)
        return Response(serializer.data)

def get_comments_on_meeting(request, in_meetingid):
    temp = Meeting.objects.all()
    return HttpResponse(temp.values(),status=200)
    comments = Comment.objects.filter(Q(meeting_id_id = in_meetingid))
    return HttpResponse(comments.values(),status = 200)
    serializer = CommentSerializer(data = comments, many = True)
    if serializer.is_valid() :
        return HttpResponse(serializer.data, status = status.HTTP_200_OK)
    else :
        return HttpResponse(serializer.errors, status = 400)

'''
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
'''


