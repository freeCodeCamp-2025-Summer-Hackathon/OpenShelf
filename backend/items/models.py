from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid


class Item(models.Model):
    CONDITION_CHOICES = [
        ('New', 'New'),
        ('Used - Like New', 'Used - Like New'),
        ('Used', 'Used'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.ForeignKey('users.User', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    tags = ArrayField(models.TextField(), blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    condition = models.CharField(max_length=50, choices=CONDITION_CHOICES)
    image_urls = ArrayField(models.TextField(), blank=True, null=True)
    number_of_items = models.PositiveIntegerField(default=1)
    is_available = models.BooleanField(default=True)

    class Meta:
        db_table = 'items'

    def __str__(self):
        return self.title



#original model.py file before modularizing
# from django.db import models
# from django.contrib.postgres.fields import ArrayField
# import uuid


# class User(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     password_hash = models.CharField(max_length=255)
#     phone_num = models.BigIntegerField(blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     google_oauth_id = models.CharField(max_length=255, blank=True, null=True)
#     google_oauth_token = models.TextField(blank=True, null=True)

#     class Meta:
#         db_table = 'users'

#     def __str__(self):
#         return self.name


# class Item(models.Model):
#     CONDITION_CHOICES = [
#         ('New', 'New'),
#         ('Used - Like New', 'Used - Like New'),
#         ('Used', 'Used'),
#     ]

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     owner = models.ForeignKey(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=255)
#     category = models.CharField(max_length=100)
#     tags = ArrayField(models.TextField(), blank=True, null=True)
#     description = models.TextField(blank=True, null=True)
#     condition = models.CharField(max_length=50, choices=CONDITION_CHOICES)
#     image_urls = ArrayField(models.TextField(), blank=True, null=True)
#     number_of_items = models.PositiveIntegerField(default=1)
#     is_available = models.BooleanField(default=True)

#     class Meta:
#         db_table = 'items'

#     def __str__(self):
#         return self.title


# class BorrowRequest(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('accepted', 'Accepted'),
#         ('declined', 'Declined'),
#         ('returned', 'Returned'),
#     ]

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     item = models.ForeignKey(Item, on_delete=models.CASCADE)
#     borrower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrowed_requests')
#     owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_requests')
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     request_date = models.DateTimeField(auto_now_add=True)
#     return_date = models.DateTimeField(blank=True, null=True)
#     notes = models.TextField(blank=True, null=True)
#     decline_reason = models.TextField(blank=True, null=True)

#     class Meta:
#         db_table = 'borrow_requests'

#     def __str__(self):
#         return f"{self.item.title} → {self.borrower.name}"


# class Notification(models.Model):
#     TYPE_CHOICES = [
#         ('request', 'Request'),
#         ('reminder', 'Reminder'),
#         ('status-update', 'Status Update'),
#         ('return', 'Return'),
#     ]

#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     type = models.CharField(max_length=20, choices=TYPE_CHOICES)
#     message = models.TextField()
#     link = models.CharField(max_length=255, blank=True, null=True)
#     is_read = models.BooleanField(default=False)

#     class Meta:
#         db_table = 'notifications'

#     def __str__(self):
#         return f"{self.type.title()} Notification for {self.user.name}"


# class Messaging(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     conversation_id = models.UUIDField()
#     sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
#     receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
#     message = models.TextField()
#     timestamp = models.DateTimeField(auto_now_add=True)
#     read = models.BooleanField(default=False)

#     class Meta:
#         db_table = 'messaging'

#     def __str__(self):
#         return f"From {self.sender.name} to {self.receiver.name}"


# Below is the generated model after python python manage.py inspectdb > models.py

# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class BorrowRequests(models.Model):
#     id = models.UUIDField(primary_key=True)
#     item = models.ForeignKey('Items', models.DO_NOTHING)
#     borrower = models.ForeignKey('Users', models.DO_NOTHING)
#     owner = models.ForeignKey('Users', models.DO_NOTHING, related_name='borrowrequests_owner_set')
#     status = models.CharField(max_length=20)
#     request_date = models.DateTimeField(blank=True, null=True)
#     return_date = models.DateTimeField(blank=True, null=True)
#     notes = models.TextField(blank=True, null=True)
#     decline_reason = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'borrow_requests'


# class Items(models.Model):
#     id = models.UUIDField(primary_key=True)
#     owner = models.ForeignKey('Users', models.DO_NOTHING)
#     title = models.CharField(max_length=255)
#     category = models.CharField(max_length=100)
#     tags = models.TextField(blank=True, null=True)  # This field type is a guess.
#     description = models.TextField(blank=True, null=True)
#     condition = models.CharField(max_length=50)
#     image_urls = models.TextField(blank=True, null=True)  # This field type is a guess.
#     number_of_items = models.IntegerField(blank=True, null=True)
#     is_available = models.BooleanField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'items'


# class Messaging(models.Model):
#     id = models.UUIDField(primary_key=True)
#     conversation_id = models.UUIDField()
#     sender = models.ForeignKey('Users', models.DO_NOTHING)
#     receiver = models.ForeignKey('Users', models.DO_NOTHING, related_name='messaging_receiver_set')
#     message = models.TextField()
#     timestamp = models.DateTimeField(blank=True, null=True)
#     read = models.BooleanField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'messaging'


# class Notifications(models.Model):
#     id = models.UUIDField(primary_key=True)
#     user = models.ForeignKey('Users', models.DO_NOTHING)
#     type = models.CharField(max_length=20)
#     message = models.TextField()
#     link = models.CharField(max_length=255, blank=True, null=True)
#     is_read = models.BooleanField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'notifications'


# class Users(models.Model):
#     id = models.UUIDField(primary_key=True)
#     name = models.CharField(max_length=255)
#     email = models.CharField(unique=True, max_length=255)
#     password_hash = models.CharField(max_length=255)
#     phone_num = models.BigIntegerField(blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     google_oauth_id = models.CharField(max_length=255, blank=True, null=True)
#     google_oauth_token = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'users'
