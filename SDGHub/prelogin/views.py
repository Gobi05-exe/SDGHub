from django.shortcuts import render

def Goals(request):
    return render(request, 'goal17.html')

def Partner(request):
    return render(request,'partner_with_us.html')

def Explore(request):
    return render(request,'explore.html')