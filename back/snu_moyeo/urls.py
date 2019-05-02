from django.conf.urls import include
from django.urls import path
from snu_moyeo import views
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('sign_up/', views.SignUp.as_view()),
    path('log_in/', views.LogIn.as_view()),
    url(r'^auth/(?P<mySNU_verification_token>[a-zA-Z0-9]+)/$', views.Authenticate.as_view()),
    # path('userlist/',views.SnuUserList.as_view()),
    path('meetinglist/', views.MeetingList.as_view()),
    url(r'^get_auth_token/', obtain_auth_token),
]

urlpatterns += [
    path(r'^api-auth/', include('rest_framework.urls')),
]
