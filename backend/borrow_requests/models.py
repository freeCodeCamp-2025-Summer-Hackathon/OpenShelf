from django.db import models
from django.utils import timezone
from datetime import timedelta
import uuid


class BorrowRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
        ('returned', 'Returned'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    item = models.ForeignKey('items.Item', on_delete=models.CASCADE, db_column='item_id')
    borrower = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='borrowed_requests', db_column='borrower_id')
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='owned_requests', db_column='owner_id')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    request_date = models.DateTimeField(auto_now_add=True)
    expected_return_date = models.DateTimeField()
    return_date = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    decline_reason = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'borrow_requests'

    def __str__(self):
        return f"{self.item.title} → {self.borrower.name}"
