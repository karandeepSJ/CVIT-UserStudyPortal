from django.conf.urls import url
from . import views
from user import views as vv
urlpatterns = [url(r'^newvideo$', views.sendNewVideo, name='sendNewVideo'),
			   url(r'^$', views.mainPage, name='mainPage'),
			   url(r'^getdet$', vv.getDet, name='getDet'),
			   url(r'^nextround$', views.nextRoundPage, name='nextRoundPage'),
			   url(r'^submit$', views.submitAnnotation, name='submitAnnotation'),
			   url(r'^score$', views.scorePage, name='scorePage'),
			   url(r'^getscore$', views.score, name='score'),
			   url(r'^getscore2$', views.score2, name='score2'),
			   ]