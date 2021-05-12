from django.shortcuts import render

# Create your views here.
# def home(request):
#     posts = Post.objects.all()
#     return render(request, 'home.html', {'posts' : posts})

def home(request):
    return render(request, 'home.html')