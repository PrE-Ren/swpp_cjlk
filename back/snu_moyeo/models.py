from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
import django

class Meeting (models.Model):
    id = models.AutoField(primary_key = True)
    title = models.CharField(max_length = 100, blank = True, default = '')
    created = models.DateTimeField(auto_now_add = True)
    due = models.DateTimeField()
    min_people = models.IntegerField(default = 1)
    max_people = models.IntegerField(default = 999)
    state = models.IntegerField(default = 0)
    description = models.TextField()
    kind = models.IntegerField()
    leader = models.ForeignKey('SnuUser', related_name = 'lead_meeting', on_delete = models.CASCADE)
    leaderid = models.IntegerField(default = -1)
    picture = models.ImageField(blank = True, null = True)
    members = models.ManyToManyField('SnuUser', through = 'Participate')
    latitude = models.FloatField(default = 37.4615299)
    longitude = models.FloatField(default = 126.9519267)
    # comments : related field

    class Meta:
        ordering = ['-created']  # sorted in decreasing order of created time

    '''
    def active(self) :
        self.state = 4
        if django.utils.timezone.now() > self.due :
            return True
        return False
    '''

    def save(self, *args, **kwargs) :
        super(Meeting, self).save(*args, **kwargs)

class SnuUser (AbstractUser):
    # id
    # username(unique=True) : ID
    # password : PW
    name = models.CharField(max_length = 100)
    point = models.IntegerField(default = 0)
    meetings = models.ManyToManyField('Meeting', through = 'Participate')
    email = models.EmailField(max_length = 254, blank = True)
    mySNU_verified = models.BooleanField(default = False)
    mySNU_verification_token = models.CharField(max_length = 100, blank = True)
    phone_number = models.CharField(max_length = 11, blank = True)
    phone_verified = models.BooleanField(default = False)
    phone_verification_token = models.CharField(max_length = 8, blank = True)
    # lead_meeting : related field

    '''
    user_id = models.CharField(max_length= 100, primary_key=True) # changed variable name
    snu_mail = models.EmailField(default = '')
    has inner validator(checker) whether it is valid email address
    -> EmailValidator with error: ValidationError, "ENter a valid email address" message will be out
    '''

@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        token = Token.objects.create(user = instance)

class Participate (models.Model):
    id = models.AutoField(primary_key = True)
    user_id = models.ForeignKey('SnuUser', on_delete = models.CASCADE)
    meeting_id = models.ForeignKey('Meeting', on_delete = models.CASCADE)

    class Meta:
        unique_together = ['user_id', 'meeting_id']

class Comment (models.Model):
    id = models.AutoField(primary_key = True)
    created = models.DateTimeField(auto_now_add = True)
    writer = models.ForeignKey('SnuUser', on_delete = models.CASCADE)
    writerid = models.IntegerField(default = -1)
    meeting = models.ForeignKey('Meeting', related_name = 'comments', on_delete = models.CASCADE)
    content = models.CharField(max_length = 100)
