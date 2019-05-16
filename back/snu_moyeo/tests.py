from django.test import TestCase
from django.utils import timezone
from .models import Meeting, SnuUser, Participate
import requests
from requests.auth import HTTPBasicAuth, HTTPDigestAuth
# Create your tests here.

class MeetingModelsTests(TestCase):

    link = "http://127.0.0.1:8000/"

    # def setUp(self):
    #     self.snuuser = SnuUser.objects.create(username = "testadmin", password = "testadmin", email = "sdrjseka96@naver.com")

    def sign_up_post(self) :  #do sign up (= post user)
       link = self.link + "sign_up/"
   
       data = {'username':'test1', 'password':'hello', 'name':'nametest1', 'email':'sdrjseka96@snu.ac.kr', 'mySNU_verified':True }  # verified default false, change to true by email authentication, but for test, we will set this true.
       res = requests.post(link, data = data)
       self.assertEqual(res.status_code,201)
       print("test1 account generated successfully")

       data = {'username':'test2', 'password':'hello', 'name':'nametest2', 'email':'sdrjseka96@snu.ac.kr', 'mySNU_verified':True }  # verified default false, change to true by email authentication, but for test, we will set this true.
       res = requests.post(link, data = data)
       self.assertEqual(res.status_code,201)
       print("test2 account generated successfully")
       
       
       data = {'username':'test3', 'password':'hello', 'name':'nametest2', 'email':'sdrjseka96@snu.ac.kr', 'mySNU_verified':True }  # verified default false, change to true by email authentication, but for test, we will set this true.
       res = requests.post(link, data = data)
       self.assertEqual(res.status_code,201)
       print("test3 account generated successfully")

       print("sign_up done")


    def get_userlist_Test(self):
        
        link = self.link + 'user/'
        res = requests.get(link)
        contents = res.json()
        self.assertEqual(res.status_code,200)
        
        for content_item in contents : # content should be legal
            if 'test' not in content_item['username']:
                print('username input process wrong')
                self.assertEqual(True,False)
            if '@snu.ac.kr' not in content_item['email'] : 
                print('email format is wrong')
                self.assertEqual(True,False)
    
    def put_user_test(self): 
        link = self.link + 'user/3/'
        data = {'username':'test3put', 'password':'hello', 'name':'nametest3put', 'email':'sdrjseka96@snu.ac.kr', 'mySNU_verified': True }
        res = requests.put(link,data,auth=('test3', 'hello'))
        self.assertEqual(res.status_code,200)
        
'''
    def delete_userlist_test (self):
        link = self.link + 'user/'
        print('how about another user delete another?')
        res = requests.delete(link+'1/', auth = ('wrong','wrong'))  # wrong authentication
        self.assertEqual(res.status_code, 401)
        print('you cannot delete!')

        res = requests.delete(link+'2/', auth =('test2', 'hello'))        
        self.assertEqual(res.status_code, 204)
        print('correct auth delete test done')
'''

    def get_meeting_test(self):
        link = self.link + 'meetinglist/'
        res = requests.get(link)
        contents = res.json()
        self.assertEqual(res.status_code,200)
    
    def post_meeting_test(self):
        #link = self.link + "sign_up/"

        #data = {'username':'test10delete', 'password':'hello', 'name':'nametest1', 'email':'sdrjseka96@gmail.com', 'mySNU_verified':True }  # verified default false, change to true by email authentication, but for test, we will set this true.
        #res = requests.post(link, data = data, auth = ())
        #print(res)

        link = self.link + 'meetinglist/'
        data = {'title': 'postmeeting1', 'due': '2019-08-23T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        
        res = requests.post(link, data = data, auth = ('test1', 'hello'))
        self.assertEqual(res.status_code, 201)
        print('meeting1 post successfully')
        
        data = {'title': 'postmeeting2', 'due': '2019-08-23T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test1', 'hello') )
        print("meeting2 post successfully")

    def delete_meeting_test(self) :
        link = self.link + "meetinglist/"
        
        print('how about delete meeting that is not owned?')
        res = requests.delete( link+'2/',auth = ('test2','hello') )
        self.assertEqual(res.status_code, 401)
        print('you cannot delete it')
        
        res = requests.delete( link + '2/', auth = ('test1','hello') )
        self.assertEqual(res.status_code, 204)



    def put_meeting_test(self):
        link = self.link + 'meetinglist/1/'
        data = {'title': 'putmeeting', 'due' : '2019-08-23T13:23:00+09:00', 'min_people': 10, 'max_people':100, 'description': 'puthello?','state': 2, 'kind': 1}

        res = requests.put(link,data,auth = ('test1', 'hello'))
        self.assertEqual(res.status_code, 200)

    def get_participate_test(self):
        link = self.link + 'participate/'
        
        res = requests.get(link)
        self.assertEqual(res.status_code, 200)

    def post_participate_test(self):
        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 1}
        res = requests.post(link, data)
        self.assertEqual(res.status_code, 201)

    def delete_participate_test(self):
        link = self.link + 'participate/1/'

        res = requests.delete(link)
        self.assertEqual(res.status_code,204)

    def put_participate_test(self):
        link = self.link + 'participate/1/'
        

        data =  {'user_id' : 3, 'meeting_id' : 1} 
        res = requests.put(link,data)
        self.assertEqual(res.status_code,200)

        print('how about put illegal data?')
        data = {'snuuser' : 2, 'meeting' : 1}
        res = requests.put(link,data)
        self.assertEqual(res.status_code, 400)
        print('answer: 400 error!')

    def test_all(self):
        self.sign_up_post()

        self.get_userlist_Test()
        #self.delete_userlist_test()
        self.put_user_test()

        self.post_meeting_test()        
        self.get_meeting_test()
        self.put_meeting_test()
        self.delete_meeting_test()

        self.post_participate_test()
        self.get_participate_test()
        self.put_participate_test()
        self.delete_participate_test()


