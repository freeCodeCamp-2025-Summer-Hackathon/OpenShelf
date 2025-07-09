from rest_framework import serializers
from .models import BorrowRequest
from items.serializers import ItemSerializer
from users.serializers import UserSerializer


class BorrowRequestSerializer(serializers.ModelSerializer):
    item = ItemSerializer(read_only=True)
    borrower = UserSerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    
    class Meta:
        model = BorrowRequest
        fields = ['id', 'item', 'borrower', 'owner', 'status', 'request_date', 
                 'expected_return_date', 'return_date', 'notes', 'decline_reason']
        read_only_fields = ['id', 'request_date', 'borrower', 'owner']


class BorrowRequestCreateSerializer(serializers.ModelSerializer):
    item_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = BorrowRequest
        fields = ['item_id', 'expected_return_date', 'notes']
    
    def create(self, validated_data):
        from items.models import Item
        
        item_id = validated_data.pop('item_id')
        item = Item.objects.get(id=item_id)
        
        # Create borrow request
        borrow_request = BorrowRequest.objects.create(
            item=item,
            borrower=self.context['request'].user,
            owner=item.owner,
            **validated_data
        )
        return borrow_request
    
    def validate_expected_return_date(self, value):
        from django.utils import timezone
        
        if value <= timezone.now():
            raise serializers.ValidationError("Expected return date must be in the future")
        
        return value
    
    def validate_item_id(self, value):
        from items.models import Item
        
        try:
            item = Item.objects.get(id=value)
        except Item.DoesNotExist:
            raise serializers.ValidationError("Item not found")
        
        # Check if item is available
        if not item.is_available:
            raise serializers.ValidationError("Item is not available for borrowing")
        
        # Check if user is not trying to borrow their own item
        if item.owner == self.context['request'].user:
            raise serializers.ValidationError("You cannot borrow your own item")
        
        # Check if user already has a pending request for this item
        if BorrowRequest.objects.filter(
            item=item, 
            borrower=self.context['request'].user, 
            status='pending'
        ).exists():
            raise serializers.ValidationError("You already have a pending request for this item")
        
        return value


class BorrowRequestUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BorrowRequest
        fields = ['status', 'return_date', 'decline_reason']
    
    def validate_status(self, value):
        # Only allow certain status transitions
        current_status = self.instance.status
        user = self.context['request'].user
        
        # Only owner can accept/decline pending requests
        if current_status == 'pending' and value in ['accepted', 'declined']:
            if user != self.instance.owner:
                raise serializers.ValidationError("Only the item owner can accept or decline requests")
        
        # Only borrower can mark as returned
        if current_status == 'accepted' and value == 'returned':
            if user != self.instance.borrower:
                raise serializers.ValidationError("Only the borrower can mark the item as returned")
        
        return value


class BorrowRequestListSerializer(serializers.ModelSerializer):
    item_title = serializers.CharField(source='item.title', read_only=True)
    borrower_name = serializers.CharField(source='borrower.name', read_only=True)
    owner_name = serializers.CharField(source='owner.name', read_only=True)
    
    class Meta:
        model = BorrowRequest
        fields = ['id', 'item_title', 'borrower_name', 'owner_name', 'status', 
                 'request_date', 'expected_return_date', 'return_date', 'notes']
