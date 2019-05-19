from django.test import TestCase
from django.utils import timezone
from .models import Meeting, SnuUser, Participate
import requests
from requests.auth import HTTPBasicAuth, HTTPDigestAuth
# Create your tests here.

import os
import sys

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
       
        print('check sign up done well')
        self.assertEqual(3,len(contents)) # check whether post all well done


        print('check email input legal')
        for content_item in contents : # content should be legal
            if 'test' not in content_item['username']:
                print('username input process wrong')
                self.assertEqual(True,False)
            if '@snu.ac.kr' not in content_item['email'] : 
                print('email format is wrong')
                self.assertEqual(True,False)
    ''' 
    def put_user_test(self): 
        link = self.link + 'user/3/'
        data = {'username':'test3put', 'password':'hello', 'name':'nametest3put', 'email':'sdrjseka96@snu.ac.kr', 'mySNU_verified': True }
        res = requests.put(link,data,auth=('test3', 'hello'))
        self.assertEqual(res.status_code,200)
    '''   

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
        link = self.link + 'meeting/'
        res = requests.get(link)
        contents = res.json()
        self.assertEqual(res.status_code,200)
   
        self.assertEqual(contents[0]['title'],'postmeeting7')
        self.assertEqual(contents[1]['title'],'postmeeting6')

    def post_meeting_test(self):
        link = self.link + 'meeting/'
        data = {'title': 'postmeeting1', 'due': '2019-08-23T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        
        res = requests.post(link, data = data, auth = ('test1', 'hello'))
        self.assertEqual(res.status_code, 201)
        print('meeting1 post successfully')
        
        print('check leader')
        content = res.json()
        self.assertEqual(content['leader'],'test1')



        data = {'title': 'postmeeting2', 'due': '2019-08-24T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test1', 'hello') )
        print("meeting2 post successfully")

        data = {'title': 'postmeeting3', 'due': '2019-08-25T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test1', 'hello') )
        print("meeting3 post successfully")

        data = {'title': 'postmeeting4', 'due': '2019-08-26T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test1', 'hello') )
        print("meeting4 post successfully")

        data = {'title': 'postmeeting5', 'due': '2019-08-27T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test1', 'hello') )
        print("meeting5 post successfully")
        
        data = {'title': 'postmeeting6', 'due': '2019-08-28T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test2', 'hello') )
        print("meeting6 post successfully")


        data = {'title': 'postmeeting7', 'due': '2019-08-28T13:23:00+09:00' , 'min_people': 0, 'max_people': 100, 'description': 'hello?','state': 0, 'kind': 1 }
        res = requests.post(link, data = data, auth = ('test2', 'hello') )
        print("meeting7 post successfully")

        print('check lead_meeting')
        link = self.link + 'user/1/'
        res = requests.get(link, auth = ('test1','hello'))
        content = res.json()
        self.assertEqual(content['lead_meeting'],[5,4,3,2,1])
        


    def delete_meeting_test(self) :
        link = self.link + "meeting/"
        
        print('how about delete meeting that is not owned?')
        res = requests.delete( link+'2/',auth = ('test2','hello') )
        self.assertEqual(res.status_code, 403)
        print('you cannot delete it')
        
        res = requests.delete( link + '2/', auth = ('test1','hello') )
        self.assertEqual(res.status_code, 204)


        print('check user meeting imformation is correctly changed')
        link = self.link + 'user/1/'
        res = requests.get(link,auth = ('test1','hello'))
        content = res.json()
        self.assertEqual( 2 in content['lead_meeting'], False )
        self.assertEqual( 2 in content['meetings'], False)


    def put_meeting_test(self):
        link = self.link + 'meeting/1/'
        data = {'title': 'putmeeting', 'due' : '2019-08-23T13:23:00+09:00', 'min_people': 10, 'max_people':100, 'description': 'puthello?','state': 4, 'kind': 1}

        print('close meeting 1')
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

        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 2}
        res = requests.post(link, data)
        self.assertEqual(res.status_code, 201)
        
        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 3}
        res = requests.post(link, data)
        self.assertEqual(res.status_code, 201)
        
        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 4}
        res = requests.post(link, data)
        self.assertEqual(res.status_code, 201)
        
        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 5}
        res = requests.post(link, data)
        self.assertEqual(res.status_code, 201)

        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 6}
        res = requests.post(link, data)
        
        link = self.link + 'participate/'
        data = {'user_id' : 1, 'meeting_id' : 7}
        res = requests.post(link, data)

        print("what if more than participate 5?")
        self.assertEqual(res.status_code/100, 4)
        print('you cannot participate more than 5')

        link = self.link + 'user/1/'
        res = requests.get(link,auth = ('test1','hello'))
        content = res.json()


    def delete_participate_test(self):
        link = self.link + 'participate/1/'

        res = requests.delete(link)
        self.assertEqual(res.status_code,204)

        link = self.link + 'user/1/'
        res = requests.get(link, auth = ('test1','hello'))
        content = res.json()

        self.assertEqual( 1 in content['meetings'], False)
    '''
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
    '''
    def recent_impending_test(self):
        recent_link = self.link + 'meetinglist/lead/'
        res = requests.get(recent_link)
        self.assertEqual(res.status_code,200)
        print('check recent order')
        content = res.json()
        if len(content)>=2:
            self.assertEqual(content[0]['created'] >= content[1]['created'], True)


        impending_link = self.link + 'meetinglist/impending/'
        res = requests.get(impending_link)
        self.assertEqual(res.status_code,200)
        
        print('check impending order')
        content = res.json()
        if len(content)>=2:
            self.assertEqual(content[0]['due']<= content[1]['due'], True)

    def my_history_lead_join_test(self):
        history_link = self.link + 'meetinglist/history/'
        res = requests.get(history_link, auth = ('test1', 'hello'))
        self.assertEqual(res.status_code,200)
        
        content = res.json()
        print('check history')
        self.assertEqual(content[0]['state'],4)
        self.assertEqual(content[0]['id'],1)
        

        lead_link = self.link + 'meetinglist/lead/'
        res = requests.get(lead_link, auth = ('test1', 'hello'))
        self.assertEqual(res.status_code,200)

        content = res.json()
        print('check lead')
        for meeting in content:
            self.assertEqual(meeting['leader'],'test1')

        join_link = self.link + 'meetinglist/join/'
        res = requests.get(join_link, auth = ('test1', 'hello'))
        self.assertEqual(res.status_code,200)

        content = res.json()

        for meeting in content:
            self.assertEqual(1 in meeting['members'], True)

    def list_test(self):
        list_link = self.link + 'list/1/'
        res = requests.get(list_link)
        self.assertEqual(res.status_code,200)

    def test_all(self):
        
        os.system('rm db.sqlite3')
        os.system('rm -r snu_moyeo/migrations')
        os.system('python3 manage.py makemigrations snu_moyeo')
        os.system('python3 manage.py migrate')
        
        self.sign_up_post()
        self.get_userlist_Test()
        #self.delete_userlist_test()
        #self.put_user_test()

        self.post_meeting_test()        
        self.get_meeting_test()
        self.put_meeting_test()

        self.post_participate_test()
        self.get_participate_test()

        self.recent_impending_test()
        self.my_history_lead_join_test()
        self.list_test()

        
        self.delete_meeting_test()
        self.delete_participate_test()
