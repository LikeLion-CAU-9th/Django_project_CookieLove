from django.contrib import admin
from django.urls import path, include
from taeyoung import views
from main.views import mainHome
    

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include("chaeyeon.urls")),
    path('taeyoung/', views.intro, name="intro"),
    path('', mainHome, name="main-home")
    # path('', include("youngkwon.urls")),
]
