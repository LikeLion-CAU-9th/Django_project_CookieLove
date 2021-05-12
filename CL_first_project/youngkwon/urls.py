from django.urls import path, include
from .views import *


urlpatterns = [
    path('', renderIndex, name="index"),
    path('introduction/', renderIntroduction, name="introduction")
]
