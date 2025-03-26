from django.shortcuts import render
from django.contrib.auth.decorators import login_required


@login_required
def Dashboard(request):
    return render(request, 'dashboard2.html')

@login_required
def Collab(request):
    return render(request, 'collab.html')

@login_required
def Funds(request):
    return render(request, 'funds.html')

@login_required
def Settings(request):
    return render(request, 'settings.html')