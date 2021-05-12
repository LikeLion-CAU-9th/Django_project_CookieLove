from django.contrib import admin
from django.urls import path, include
from taeyoung import views
from main.views import mainHome
    

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chaeyeon/', include("chaeyeon.urls")),
    path('taeyoung/', include("taeyoung.urls")),
    path('youngkwon/', include("youngkwon.urls")),
    path('', mainHome, name="main-home")
]
