from django.contrib.auth.models import User
from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500, blank=True)
    completedAt = models.DateTimeField(null=True)
    duration = models.IntegerField()
    note = models.CharField(max_length=500,blank=True)
    owner = models.ForeignKey(User, related_name="tasks", on_delete=models.CASCADE)
    createdAt = models.DateTimeField(auto_now_add=True)
