from rest_framework import serializers
from snu_moyeo.models import Meeting, SnuUser

class MeetingSerializer(serializers.ModelSerializer):
    # leader = serializers.ReadOnlyField (source = 'leader.name')
    class Meta:
        model = Meeting
        fields = ('id', 'title','created','due','min_people','max_people','description','state','kind','leader')

class SnuUserSerializer(serializers.ModelSerializer):
    # lead_meeting = serializers.PrimaryKeyRelatedField(many=True,queryset= Meeting.objects.all())
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance. save()
        return instance
    class Meta:
        model = SnuUser
        fields = ('id', 'username', 'password', 'name', 'email', 'point', 'mySNU_verified', 'mySNU_verification_token')
