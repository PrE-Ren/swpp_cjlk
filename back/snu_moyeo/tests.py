from django.test import TestCase
from django.utils import timezone
from .models import Meeting, SnuUser, Participate
import requests
# Create your tests here.

class MeetingModelsTests(TestCase):

    link = "http://127.0.0.1:8000/"

    def setUp(self):
        self.snuuser = SnuUser.objects.create(username = "testadmin", password = "testadmin", email = "sdrjseka96@naver.com")

    def test_sign_up_post(self):
        link = self.link + "sign_up/"
        data = {'username':'hi2', 'password':'hello','name':'jongmin', 'email':'sdrjseka96@gmail.com' }
        res = requests.post(link, data =data)
        #print(res.status_code)
        self.asserEqual(res.status_code, 201)
        #if res.status_code != 201:
        #    print("wrong")

    def test_log_in(self):
        pass

    def test_get_userlist(self):
        link = self.link + 'user/'
        #print(link)
        res = requests.get(link, auth = ('hi','hello'))
        contents = res.content.json()
        
        #print(contents[0]['id'])
        self.assertEqual(int(res.status_code/100),2)

    def test_delete_userlist(self):
    #    link = self.link + 'meetinglist/'
    #    res = requests.delete(link, auth = ('admin','admin'))  #already have this account
        pass
    def test_get_meeting(self):
     #   link = self.link + 'meetinglist/'
     #   res = requests.get(link)
     #   contents = res.json()

      #  if res.status_code != 200:
      #      exit(1)
        pass
    def test_post_meeting(self):
        pass

    def test_delete_meeting(self):
        pass

    def test_put_meeting(self):
        pass

    def test_get_participate(self):
        pass

    def test_post_participate(self):
        pass

    def test_delete_participate(self):
        pass

    def test_put_participate(self):
        pass
