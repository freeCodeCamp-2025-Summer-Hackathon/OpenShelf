from django.db import models
import uuid


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password_hash = models.CharField(max_length=255)
    phone_num = models.BigIntegerField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    google_oauth_id = models.CharField(max_length=255, blank=True, null=True)
    google_oauth_token = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.name
