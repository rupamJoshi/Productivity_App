from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('',include('frontend.urls')),
    path('', include('user_manager.urls')),
    path('', include('task_manager.urls'))
]
