from django.conf.urls import include
from django.urls import path
from snu_moyeo import views
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
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
    path('list/<int:in_kind>/', views.ListView.as_view()),
    path('meetinglist/lead/', views.LeadList.as_view()),
    path('meetinglist/join/', views.JoinList.as_view()),
    path('meetinglist/history/', views.HistoryList.as_view()),
    path('comment/', views.CommentList.as_view()),
    path('comment/<int:pk>/', views.CommentDetail.as_view()),
    path('comment/meeting/<int:in_meetingid>/', views.CommentOnMeeting.as_view()),
    url(r'^get_auth_token/', obtain_auth_token),
    url(r'^email_auth/(?P<email>[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3})/(?P<email_token>[0-9]+)/$', views.EmailAuthenticate.as_view()),
    url(r'^send_email/(?P<email>[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3})/$', views.SendEmail.as_view()),
    url(r'^phone_auth/(?P<phone_number>[0-9]+)/(?P<phone_token>[0-9]+)/$', views.SMSAuthenticate.as_view()),
    url(r'^send_phone/(?P<phone_number>[0-9]+)/$', views.SendPhone.as_view()),

    url('searchall/', views.MeetingSearchAllView.as_view()),
    url('search0/', views.MeetingSearch0View.as_view()),
    url('search1/', views.MeetingSearch1View.as_view()),
    url('search2/', views.MeetingSearch2View.as_view()),
    url('search3/', views.MeetingSearch3View.as_view()),
    url('search4/', views.MeetingSearch4View.as_view()),
    url('search5/', views.MeetingSearch5View.as_view()),
    url('search6/', views.MeetingSearch6View.as_view()),

    path('reportlist/', views.ReportList.as_view()),
    path('reportlist/<int:pk>/', views.ReportDetail.as_view()),
    #url('reportcreate/', views.ReportCreate.as_view())
    # url(meeting/<int:id>/commnet/ , comment_on_meeting_id.asview),
]

urlpatterns += [
    path(r'^api-auth/', include('rest_framework.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
