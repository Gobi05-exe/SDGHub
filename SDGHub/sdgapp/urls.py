from django.urls import path
from . import views

app_name = 'sdgapp'
urlpatterns = [
    path('home/', views.Home, name='home'),
]

