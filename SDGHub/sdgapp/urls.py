from django.urls import path
from . import views

app_name = 'sdgapp'
urlpatterns = [
    path('dashboard/', views.Dashboard, name='dashboard'),
    path('collab/',views.Collab,name='collab'),
    path('funds/',views.Funds,name='funds'),
    path('settings/',views.Settings,name='settings'),
]

