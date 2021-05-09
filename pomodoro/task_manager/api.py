from rest_framework import viewsets, permissions

from task_manager.models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = TaskSerializer

    def get_queryset(self):
        print("print user in request tasks ", self.request.user.tasks.all())
        return self.request.user.tasks.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
