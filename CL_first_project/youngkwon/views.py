from django.shortcuts import render

def renderIndex(request):
    return render(request, 'index.html')

def renderIntroduction(request):
    return render(request, 'introduction.html')
