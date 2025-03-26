from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from sdgapp.models import UserProjects 


@login_required
def Dashboard(request):
    return render(request, 'dashboard2.html')

@login_required
def Collab(request):
    if request.method == "POST":
        title = request.POST.get("title")
        sdg_goal = request.POST.get("sdg_goal")
        description = request.POST.get("description")
        collaborators = request.POST.get("collaborators", "")
        funding_target = request.POST.get("funding_target")
        
        print(title,sdg_goal,description,collaborators,funding_target)

        if title and sdg_goal and description and collaborators and funding_target:
            UserProjects.objects.create(
                user=request.user,
                title=title,
                sdg_goal=sdg_goal,
                description=description,
                collaborators=collaborators,
                funding_target=int(funding_target),
                funding_received=0,
            )
            #return redirect('dashboard')  

    return render(request, 'collab.html')

@login_required
def Funds(request):
    return render(request, 'funds.html')

@login_required
def Settings(request):
    return render(request, 'settings.html')