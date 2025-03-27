from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from sdgapp.models import UserProjects 
from django.db.models import Sum
from django.conf import settings
from twilio.rest import Client


def send_sms(to_number, message):
    print(message)
    account_sid = "ACb7ec158a691957aceea79283a918610a"
    auth_token = "c124d447aba0b9bd60b2b2e3ab257e83"
    client = Client(account_sid, auth_token)

    client.messages.create(
        body=message,
        from_="+16089992514",
        to=to_number
    )


    
    
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
            return redirect('sdgapp:dashboard')  

    return render(request, 'collab.html')

@login_required
def Funds(request):
    all_projects = UserProjects.objects.all()  # Fetch all projects
    total_funds_raised = all_projects.aggregate(Sum('funding_received'))['funding_received__sum'] or 0
    total_funding_target = all_projects.aggregate(Sum('funding_target'))['funding_target__sum'] or 0
    remaining_funds_needed = total_funding_target - total_funds_raised
    
    if request.method == "POST":
        project_name = request.POST.get("project_name")
        user_phone = request.POST.get("phone_number")
        amt = request.POST.get("amt")  

        print(project_name, user_phone, amt)
        
        if project_name and user_phone:
            project = UserProjects.objects.get(title=project_name)
            message = f"Rs.{amt} debited from your account to SDGHub. Thank you for your interest in donating to {project.title}!"
            send_sms(user_phone, message)
            
            project.funding_received += int(amt)
            project.save()
            return redirect('sdgapp:funds')
        return redirect('sdgapp:funds')

    return render(request, 'funds.html', {
        'all_projects': all_projects,
        'total_funds_raised': total_funds_raised,
        'total_funding_target': total_funding_target,
        'remaining_funds_needed': remaining_funds_needed,
    })


@login_required
def Settings(request):
    return render(request, 'settings.html')