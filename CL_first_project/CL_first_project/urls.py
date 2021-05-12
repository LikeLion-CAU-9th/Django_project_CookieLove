from django.contrib import admin
from django.urls import path, include
from taeyoung import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('chaeyeon/', include("chaeyeon.urls")),
    path('taeyoung/', views.intro),
    path('youngkwon/', include("youngkwon.urls")),
]
