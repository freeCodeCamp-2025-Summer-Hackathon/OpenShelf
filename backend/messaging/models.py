from django.db import models
import uuid


class Messaging(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    conversation_id = models.UUIDField()
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sent_messages', db_column='sender_id')
    receiver = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='received_messages', db_column='receiver_id')
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        db_table = 'messaging'
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        ordering = ['-timestamp']

    def __str__(self):
        return f"From {self.sender.name} to {self.receiver.name}: {self.message[:20]}..."
