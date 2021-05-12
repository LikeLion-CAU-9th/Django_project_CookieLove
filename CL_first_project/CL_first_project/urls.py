from django.contrib import admin
from django.urls import path, include
from taeyoung import views
from main.views import mainHome
    

urlpatterns = [
    path('admin/', admin.site.urls),
<<<<<<< HEAD
    path('chaeyeon/', include("chaeyeon.urls")),
    path('taeyoung/', include("taeyoung.urls")),
    path('youngkwon/', include("youngkwon.urls")),
=======
    # path('', include("chaeyeon.urls")),
    path('taeyoung/', views.intro, name="intro"),
    path('', mainHome, name="main-home")
    # path('', include("youngkwon.urls")),
>>>>>>> feat: connect main page
]
