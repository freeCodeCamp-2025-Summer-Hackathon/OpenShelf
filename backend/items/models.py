from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.conf import settings
import uuid

class Item(models.Model):
    CONDITION_CHOICES = [
        ('New', 'New'),
        ('Used', 'Used'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='owned_items',
        db_column='owner_id'
    )
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    tags = ArrayField(
        models.CharField(max_length=50),
        size=10,
        default=list,
        blank=True
    )
    description = models.TextField(blank=True)
    condition = models.CharField(max_length=50, choices=CONDITION_CHOICES)
    image_urls = ArrayField(
        models.CharField(max_length=500),
        size=10,
        default=list,
        blank=True
    )
    number_of_items = models.PositiveIntegerField(default=1)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.title} - {self.owner.name}"

    class Meta:
        db_table = 'items'
