from rest_framework import serializers
from snu_moyeo.models import Meeting, SnuUser, Participate
import django

class MeetingSerializer(serializers.ModelSerializer):
    leader = serializers.ReadOnlyField(source = 'SnuUser.username')
    leader = serializers.CharField(read_only = True)

    def validate(self, data):
        due = data['due']
        created_when = django.utils.timezone.now()
        print("due: ")
        print(due)
        print("created when: ")
        print(created_when)
        if (created_when >= due):
            raise serializers.ValidationError("Meeting's Due should be future")
        min_people = data['min_people']
        max_people = data['max_people']
        if (min_people > max_people):
            raise serializers.ValidationError("Max should be larger than Min")
        return data

    class Meta:
        model = Meeting
        fields = ('id', 'title', 'created', 'due', 'min_people', 'max_people', 'description', 'state', 'kind', 'leader', 'members')

class SnuUserSerializer(serializers.ModelSerializer):
    # lead_meeting = serializers.PrimaryKeyRelatedField(many = True, queryset= Meeting.objects.all())i

    def validate(self, data):
        if (data['email'] == ''):
            raise serializers.ValidationError("put the email")
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
        fields = ('id', 'username', 'password', 'name', 'email', 'point', 'mySNU_verified', 'mySNU_verification_token', 'meetings')

class ParticipateSerializer(serializers.ModelSerializer):
    # snuuser = serializers.ReadOnlyField(source = 'SnuUser.id')
    # snuuser = serializers.IntegerField(read_only = True)

    def validate(self,data):
        new_snuuser = data['user_id']
        new_meeting = data['meeting_id']
        print(new_meeting)
        cnt_participate = 0
        for participate_data in Participate.objects.all():
            if (participate_data.snuuser == new_snuuser and participate_data.meeting == new_meeting):
                raise serializers.ValidationError('already on meeting')
            if (participate_data.snuuser == new_snuuser):
                if (participate_data.meeting.state == 0):
                    cnt_participate = cnt_participate + 1
            '''
            for meeting_data in Meeting.objects.all():
                if (meeting_data.state == 0 and participate_data.snuuser == new_snuuser):
                    cnt_participate = cnt_participate + 1
                    print(cnt_participate) 
            '''
            if (cnt_participate >= 5):
                raise serializers.ValidationError('you can participate up to 5 meetings')
        return data

    class Meta:
        model = Participate
        fields = ('id', 'user_id', 'meeting_id')
