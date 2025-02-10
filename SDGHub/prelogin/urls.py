from django.urls import path
from . import views

urlpatterns = [
    path('', views.Goals, name='goals'),
    path('partner/', views.Partner, name='partner'),
    path('explore/',views.Explore,name='explore'),
]
