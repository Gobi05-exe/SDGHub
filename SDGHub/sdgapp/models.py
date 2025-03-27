from django.db import models
from django.contrib.auth.models import User

class UserProjects(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    sdg_goal = models.CharField(max_length=255)
    description = models.TextField()
    collaborators = models.TextField(blank=True)  
    funding_target = models.PositiveIntegerField()
    funding_received = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.title} by {self.user.username}"

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    dob = models.DateField()
    bio = models.TextField()
    city = models.TextField()
    country = models.TextField()
    
    funds_donated = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} Profile"


# Create your models here.