from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from sdgapp.models import UserProjects 
from django.db.models import Sum



@login_required
def Dashboard(request):
    user_projects = UserProjects.objects.filter(user=request.user)
    total_projects = user_projects.count()
    total_funds_raised = user_projects.aggregate(Sum('funding_received'))['funding_received__sum'] or 0
    tokens_earned = (total_funds_raised // 1000) + total_projects
     
    return render(request, 'dashboard2.html', {
        'user': request.user,
        'user_projects': user_projects,
        'total_projects': total_projects,
        'total_funds_raised': total_funds_raised,
        'tokens_earned': tokens_earned
    })

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
            return redirect('dashboard')  

    return render(request, 'collab.html')

@login_required
def Funds(request):
    all_projects = UserProjects.objects.all()  # Fetch all projects
    total_funds_raised = all_projects.aggregate(Sum('funding_received'))['funding_received__sum'] or 0
    total_funding_target = all_projects.aggregate(Sum('funding_target'))['funding_target__sum'] or 0
    remaining_funds_needed = total_funding_target - total_funds_raised

    return render(request, 'funds.html', {
        'all_projects': all_projects,
        'total_funds_raised': total_funds_raised,
        'total_funding_target': total_funding_target,
        'remaining_funds_needed': remaining_funds_needed,
    })


@login_required
def Settings(request):
    return render(request, 'settings.html')