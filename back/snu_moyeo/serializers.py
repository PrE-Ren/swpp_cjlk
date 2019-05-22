from rest_framework import serializers
from snu_moyeo.models import Meeting, SnuUser, Participate
import django
from django.db.models import Q

OPEN = 0
CLOSED = 1
RE_OPEN = 2
RE_CLOSED = 3
BREAK_UP = 4

class MeetingSerializer(serializers.ModelSerializer):
    leader = serializers.ReadOnlyField(source = 'SnuUser.username')
    leader = serializers.CharField(read_only = True)
    picture = serializers.ImageField(use_url = True, allow_empty_file = True, required = False)

    def validate(self, data):
        due = data['due']
        created_when = django.utils.timezone.now()

        if (created_when >= due):
            raise serializers.ValidationError("Meeting's Due should be future")
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

    class Meta:
        model = Meeting
        fields = ('id', 'title', 'created', 'due', 'min_people', 'max_people', 'description', 'state', 'kind', 'leader', 'picture', 'members')

class SnuUserSerializer(serializers.ModelSerializer):
    lead_meeting = serializers.PrimaryKeyRelatedField(many = True, read_only = True)
    # queryset = Meeting.objects.all())

    def validate(self, data):
        if (data['email'] == ''):
            raise serializers.ValidationError("Put the email")
        return data

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = SnuUser
        fields = ('id', 'username', 'password', 'name', 'email', 'point', 'mySNU_verified', 'mySNU_verification_token', 'meetings', 'lead_meeting')

class ParticipateSerializer(serializers.ModelSerializer):
    # snuuser = serializers.ReadOnlyField(source = 'SnuUser.id')
    # snuuser = serializers.IntegerField(read_only = True)

    def validate(self, data):
        new_snuuser = data['user_id']
        new_meeting = data['meeting_id']
        # print(new_meeting)
        cnt_participate = 0
        cnt_max = 0

        try:
            target_meeting = Meeting.objects.get(id = new_meeting.id)
        except Meeting.DoesNotExist:
            raise serializers.ValidationError('It is non-existing meeting')

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
            raise serializers.ValidationError('You can participate up to 5 meetings')
        return data

    class Meta:
        model = Participate
        fields = ('id', 'user_id', 'meeting_id')
