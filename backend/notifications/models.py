from django.db import models
import uuid


class Notification(models.Model):
    TYPE_CHOICES = [
        ('request', 'Request'),
        ('reminder', 'Reminder'),
        ('status-update', 'Status Update'),
        ('return', 'Return'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    message = models.TextField()
    link = models.CharField(max_length=255, blank=True, null=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        db_table = 'notifications'

    def __str__(self):
        return f"{self.type.title()} Notification for {self.user.name}"
