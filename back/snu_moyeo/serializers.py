from rest_framework import serializers
from snu_moyeo.models import Meeting, SnuUser, Participate, Comment, Report
from django.db.models import Q
import django

OPEN = 0
CLOSED = 1
RE_OPEN = 2
RE_CLOSED = 3
BREAK_UP = 4

class MeetingSerializer(serializers.ModelSerializer):
    leader = serializers.ReadOnlyField(source = 'SnuUser.username')
    leader = serializers.CharField(read_only = True)
    picture = serializers.ImageField(use_url = True, allow_empty_file = True, required = False)
    comments = serializers.PrimaryKeyRelatedField(many = True, read_only = True)

    def validate(self, data):
        if 'picture' not in data.keys():
            print('not input picture')
            data['picture'] = ''

        due = data['due']
        created_when = django.utils.timezone.now()

        if self.context['request'].method == 'POST' :
            if (created_when >= due):
                raise serializers.ValidationError("Meeting's Due should be future")

        if self.context['request'].method == 'PUT' :
            if (created_when >= due):
                data['state'] = 4

        min_people = data['min_people']
        max_people = data['max_people']
        if (min_people > max_people):
            raise serializers.ValidationError("Max should be larger than Min")

        making_user = SnuUser.objects.get(id = self.context['request'].user.id)
        cnt_participate = 0

        if self.context['request'].method == 'POST':
            open_meetings = making_user.meetings.all().filter(~Q(state = BREAK_UP))
            cnt_participate = len(open_meetings)
            print(cnt_participate)
            if cnt_participate >= 5 :
                raise serializers.ValidationError("You can not participate more than 5")
        return data

    def create(self, validated_data):
        leader = validated_data['leader']
        idleader = SnuUser.objects.get(username = leader).id
        validated_data['leaderid'] = idleader
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Meeting
        fields = (
            'id',           # invisible (AutoField in models.py)
            'title',
            'created',      # invisible (auto_now_add = True in models.py)
            'due',
            'min_people',
            'max_people',
            'description',
            'state',
            'kind',
            'leader',       # invisible (ReadOnlyField in serializers.py)
            'leaderid',
            'picture',
            'members',      # invisible (ManyToManyField in models.py)
            'comments',      # invisible (read_only = True in serializers.py)
            'latitude',
            'longitude'
        )

class SnuUserSerializer(serializers.ModelSerializer):
    lead_meeting = serializers.PrimaryKeyRelatedField(many = True, read_only = True)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = SnuUser
        fields = (
            'id',                           # invisible (AutoField in models.py)
            'username',
            'password',
            'name',
            'point',
            'meetings',                     # invisible (ManyToManyField in models.py)
            'email',
            'mySNU_verified',
            'mySNU_verification_token',
            'phone_number',
            'phone_verification_token',
            'phone_verified',
            'lead_meeting'                  # invisible (read_only = True in serializers.py)
        )

class ParticipateSerializer(serializers.ModelSerializer):
    def validate(self, data):
        new_snuuser = data['user_id']
        new_meeting = data['meeting_id']
        cnt_participate = 0
        cnt_max = 0

        try:
            target_meeting = Meeting.objects.get(id = new_meeting.id)
        except Meeting.DoesNotExist:
            raise serializers.ValidationError('It is non-existing meeting')

        if target_meeting.state == 4:
            raise serializers.ValidationError('Meeting is broken up')

        if target_meeting.max_people == len(target_meeting.members.all()):
            raise serializers.ValidationError('Already meeting is full')

        if self.context['request'].method == 'POST':
            open_meetings = SnuUser.objects.get(id = new_snuuser.id).meetings.all().filter(~Q(state = BREAK_UP))
            cnt_participate = len(open_meetings)

            '''
            if (participate_data.user_id == new_snuuser):
                if (not participate_data.meeting_id.state == BREAK_UP):
                    cnt_participate = cnt_participate + 1

            if (participate_data.meeting_id == new_meeting):
                target_meeting = Meeting.objects.get(id = new_meeting)
                if target_meeting.max_people == len(target_meeting.members.all()):

            for meeting_data in Meeting.objects.all():
                if (meeting_data.state == 0 and participate_data.snuuser == new_snuuser):
                    cnt_participate = cnt_participate + 1
                    print(cnt_participate)
            '''

        if (cnt_participate >= 5):
            response = {'detail':'you can only 5'}
            raise serializers.ValidationError(response['detail'])
        return data

    class Meta:
        model = Participate
        fields = (
            'id',           # invisible (AutoField in models.py)
            'user_id',
            'meeting_id'
        )

class CommentSerializer(serializers.ModelSerializer) :
    writer = serializers.ReadOnlyField(source = 'SnuUser.username')
    writer = serializers.CharField(read_only = True)


    def create(self, validated_data):
        print(validated_data)
        writer= validated_data['writer']
        idwriter = SnuUser.objects.get(username = writer).id
        validated_data['writerid'] = idwriter
        instance = self.Meta.model(**validated_data)
        instance.save()
        return instance

    class Meta:
        model = Comment
        fields = (
            'id',           # invisible (AutoField in models.py)
            'created',      # invisible (auto_now_add = True in models.py)
            'writer',       # invisible (ReadOnlyField in serializers.py)
            'writerid',
            'meetingid',
            'content'
        )

class ReportSerializer (serializers.ModelSerializer) : 
    reporter = serializers.ReadOnlyField(source = 'SnuUser.username')
    reporter = serializers.CharField(read_only = True)

    def validate(self, data):
        if self.context['request'].method == 'PUT' :
            if data['point'] < 0 :
                raise serializers.ValidationError('point has to be positive or zero')


        if self.context['request'].user.username != 'admin' :
            if self.context['request'].method == 'PUT' :
                raise serializers.ValidationError("ADMIN PAGE")

        if (self.instance) :
            if (self.instance.isHandled == True):
                if data['isHandled'] == False :
                    print('true')
                    target_point = SnuUser.objects.get(pk = data['reporteeid']).point
                    target = SnuUser.objects.get(pk = data['reporteeid'])
                    target_point -= self.instance.point
                    target.point = target_point
            else :
                print('false')
                target_point = SnuUser.objects.get(pk = data['reporteeid']).point 
                target_point += data['point']
                print(target_point)
                target = SnuUser.objects.get(pk = data['reporteeid']) 
                target.point = target_point
            
            target.save()
        return data

    def create(self, validated_data):
        reporter = validated_data['reporter']
        print(reporter)
        idreporter = SnuUser.objects.get(username = reporter).id
        validated_data['reporterid'] = idreporter
        instance = self.Meta.model(**validated_data)

        reporteeid = validated_data['reporteeid']
        reporteeusername = SnuUser.objects.get(pk = reporteeid).username
        validated_data['reportee'] = reporteeusername
        instance = self.Meta.model(**validated_data)
        instance.save()

        return instance

    class Meta:
        model = Report
        fields = (
                'id',
                'created',
                'reason',
                'isHandled',
                'point',
                'reporter',
                'reporterid',
                'reportee',
                'reporteeid'
                )

