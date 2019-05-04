from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Meeting (models.Model):
    id = models.AutoField(primary_key = True)
    title = models.CharField(max_length = 100, blank = True, default = '')
    created = models.DateTimeField(auto_now_add = True) # added variable
    due = models.DateTimeField()
    min_people = models.IntegerField(default = 1) # modified name
    max_people = models.IntegerField(default = 999) # modified name

    state = models.IntegerField(default = 0)
    description = models.TextField()
    kind = models.IntegerField(); # need to specify
    leader = models.ForeignKey('SnuUser', related_name = 'lead_meeting', on_delete=models.CASCADE)
    members = models.ManyToManyField('SnuUser', through = 'Participate')

    class Meta:
        ordering = ['-created']  #order by descending time created

    def save(self, *args, **kwargs) :
        super(Meeting, self).save(*args, **kwargs)

class SnuUser (AbstractUser):
    # username(unique=True) : ID
    # password
    name = models.CharField(max_length = 100)
    # email
    point = models.IntegerField(default = 0)
    mySNU_verified = models.BooleanField(default = False)
    mySNU_verification_token = models.CharField(max_length = 100, unique = True, blank = True)
    meetings = models.ManyToManyField('Meeting', through = 'Participate')

    # user_id = models.CharField(max_length= 100, primary_key=True) #changed variable name
    # snu_mail = models.EmailField(default = '') 
    # has inner validator(checker) whether it is valid email address 
    # -> EmailValidator with error: ValidationError, "ENter a valid email address" message will be out

@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        token = Token.objects.create(user = instance)

class Participate (models.Model):
    id = models.AutoField(primary_key = True)
    user_id = models.ForeignKey('SnuUser', on_delete = models.CASCADE)
    meeting_id = models.ForeignKey('Meeting', on_delete = models.CASCADE)