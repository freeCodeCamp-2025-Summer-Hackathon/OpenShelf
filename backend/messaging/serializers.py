from rest_framework import serializers
from .models import Messaging
from users.serializers import UserSerializer
import uuid


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    
    class Meta:
        model = Messaging
        fields = ['id', 'conversation_id', 'sender', 'receiver', 'message', 'timestamp', 'read']
        read_only_fields = ['id', 'conversation_id', 'timestamp', 'sender', 'receiver']


class SendMessageSerializer(serializers.ModelSerializer):
    receiver_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = Messaging
        fields = ['receiver_id', 'message']
    
    def create(self, validated_data):
        from users.models import User
        
        receiver_id = validated_data.pop('receiver_id')
        receiver = User.objects.get(id=receiver_id)
        sender = self.context['request'].user
        
        # Generate conversation_id based on sender and receiver IDs
        # This ensures the same conversation_id for messages between the same two users
        user_ids = sorted([str(sender.id), str(receiver.id)])
        conversation_id = uuid.uuid5(uuid.NAMESPACE_DNS, '-'.join(user_ids))
        
        message = Messaging.objects.create(
            conversation_id=conversation_id,
            sender=sender,
            receiver=receiver,
            **validated_data
        )
        return message
    
    def validate_receiver_id(self, value):
        from users.models import User
        
        try:
            receiver = User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("Receiver not found")
        
        # Check if user is not trying to send message to themselves
        if receiver == self.context['request'].user:
            raise serializers.ValidationError("You cannot send a message to yourself")
        
        return value


class ConversationSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Messaging
        fields = ['conversation_id', 'other_user', 'last_message', 'unread_count']
    
    def get_other_user(self, obj):
        current_user = self.context['request'].user
        other_user = obj.receiver if obj.sender == current_user else obj.sender
        return UserSerializer(other_user).data
    
    def get_last_message(self, obj):
        # Get the latest message in this conversation
        latest_message = Messaging.objects.filter(
            conversation_id=obj.conversation_id
        ).order_by('-timestamp').first()
        
        if latest_message:
            return {
                'id': latest_message.id,
                'message': latest_message.message,
                'timestamp': latest_message.timestamp,
                'sender_name': latest_message.sender.name,
                'read': latest_message.read
            }
        return None
    
    def get_unread_count(self, obj):
        current_user = self.context['request'].user
        return Messaging.objects.filter(
            conversation_id=obj.conversation_id,
            receiver=current_user,
            read=False
        ).count()


class MessageListSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.name', read_only=True)
    receiver_name = serializers.CharField(source='receiver.name', read_only=True)
    
    class Meta:
        model = Messaging
        fields = ['id', 'message', 'timestamp', 'read', 'sender_name', 'receiver_name']
