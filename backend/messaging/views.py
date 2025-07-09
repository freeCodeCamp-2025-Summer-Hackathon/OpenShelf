from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from django.db.models import Q, Max
from .models import Messaging
from .serializers import (
    MessageSerializer,
    SendMessageSerializer,
    ConversationSerializer,
    MessageListSerializer,
)


def get_conversation_id(user1, user2):
    """Generate a unique conversation ID based on user IDs"""
    import uuid

    user_ids = sorted([str(user1.id), str(user2.id)])
    return uuid.uuid5(uuid.NAMESPACE_DNS, "-".join(user_ids))


class SendMessageView(generics.CreateAPIView):
    queryset = Messaging.objects.all()
    serializer_class = SendMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        message = serializer.save()

        # Return the full message data
        response_serializer = MessageSerializer(message)
        headers = self.get_success_headers(response_serializer.data)
        return Response(
            response_serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class ConversationListView(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        # Get the latest message for each conversation
        conversations = (
            Messaging.objects.filter(Q(sender=user) | Q(receiver=user))
            .values("conversation_id")
            .annotate(last_timestamp=Max("timestamp"))
            .order_by("-last_timestamp")
        )

        # Get one message object for each conversation
        conversation_messages = []
        for conv in conversations:
            message = (
                Messaging.objects.filter(conversation_id=conv["conversation_id"])
                .order_by("-timestamp")
                .first()
            )

            if message:
                conversation_messages.append(message)

        return conversation_messages


class ConversationMessagesView(generics.ListAPIView):
    serializer_class = MessageListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        conversation_id = self.kwargs["conversation_id"]
        user = self.request.user

        # Verify user is part of this conversation
        conversation_exists = (
            Messaging.objects.filter(conversation_id=conversation_id)
            .filter(Q(sender=user) | Q(receiver=user))
            .exists()
        )

        if not conversation_exists:
            return Messaging.objects.none()

        # Mark messages as read for the current user
        Messaging.objects.filter(
            conversation_id=conversation_id, receiver=user, read=False
        ).update(read=True)

        return Messaging.objects.filter(conversation_id=conversation_id).order_by(
            "timestamp"
        )


@api_view(["PUT"])
@permission_classes([permissions.IsAuthenticated])
def mark_message_read(request, message_id):
    message = get_object_or_404(Messaging, id=message_id, receiver=request.user)
    message.read = True
    message.save()
    return Response({"message": "Message marked as read"})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def unread_messages_count(request):
    count = Messaging.objects.filter(receiver=request.user, read=False).count()

    return Response({"unread_count": count})


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def conversation_with_user(request, user_id):
    """Get or create conversation with a specific user"""
    from users.models import User

    other_user = get_object_or_404(User, id=user_id)
    if other_user == request.user:
        return Response(
            {"error": "Cannot create conversation with yourself"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    conversation_id = get_conversation_id(request.user, other_user)

    # Get messages in this conversation
    messages = Messaging.objects.filter(conversation_id=conversation_id).order_by(
        "timestamp"
    )

    # Mark messages as read for current user
    Messaging.objects.filter(
        conversation_id=conversation_id, receiver=request.user, read=False
    ).update(read=True)

    serializer = MessageListSerializer(messages, many=True)

    return Response(
        {
            "conversation_id": str(conversation_id),
            "other_user": {
                "id": other_user.id,
                "name": other_user.name,
                "email": other_user.email,
            },
            "messages": serializer.data,
        }
    )
