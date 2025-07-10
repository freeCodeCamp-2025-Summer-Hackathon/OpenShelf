from django.urls import path
from . import views

urlpatterns = [
    path('send/', views.SendMessageView.as_view(), name='send_message'),
    path('conversations/', views.ConversationListView.as_view(), name='conversation_list'),
    path('conversations/<uuid:conversation_id>/', views.ConversationMessagesView.as_view(), name='conversation_messages'),
    path('conversations/with-user/<uuid:user_id>/', views.conversation_with_user, name='conversation_with_user'),
    path('messages/<uuid:message_id>/read/', views.mark_message_read, name='mark_message_read'),
    path('unread-count/', views.unread_messages_count, name='unread_count'),
]
