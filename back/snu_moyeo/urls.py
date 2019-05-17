from django.conf.urls import include
from django.urls import path
from snu_moyeo import views
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^auth/(?P<mySNU_verification_token>[a-zA-Z0-9]+)/$', views.Authenticate.as_view()),
    url(r'^get_auth_token/', obtain_auth_token),
    
    path('sign_up/', views.SignUp.as_view()),
    path('log_in/', views.LogIn.as_view()),
    path('user/', views.SnuUserList.as_view()),
    path('user/<int:pk>/', views.SnuUserDetail.as_view()),
    path('meeting/', views.MeetingList.as_view()),
    path('meeting/<int:pk>/', views.MeetingDetail.as_view()),
    path('participate/', views.ParticipateList.as_view()),
    path('participate/<int:pk>/', views.ParticipateDetail.as_view()),
    path('participate/<int:in_userid>/<int:in_meetingid>/', views.get_participate),
    path('meetinglist/recent/', views.RecentList.as_view()),
    path('meetinglist/impending/', views.ImpendingList.as_view()),
    path('meetinglist/lead/', views.LeadList.as_view()),
    path('meetinglist/join/', views.JoinList.as_view()),
    path('meetinglist/history/', views.HistoryList.as_view()),
]

urlpatterns += [
    path(r'^api-auth/', include('rest_framework.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
