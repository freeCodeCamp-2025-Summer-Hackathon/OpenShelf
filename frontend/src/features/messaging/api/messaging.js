import { api } from '../../../app/api'

// Get unread messages count
export async function getUnreadCount() {
  try {
    const response = await api.get('messaging/unread-count/')
    return response.data.unread_count
  } catch (error) {
    console.error('Failed to fetch unread count:', error)
    return 0
  }
}

// Get all conversations
export async function getConversations() {
  try {
    const response = await api.get('messaging/conversations/')
    return response.data
  } catch (error) {
    console.error('Failed to fetch conversations:', error)
    return []
  }
}

// Get conversation with specific user
export async function getConversationWithUser(userId) {
  try {
    const response = await api.get(`messaging/conversations/with-user/${userId}/`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch conversation:', error)
    throw error
  }
}

// Send message
export async function sendMessage(receiverId, message) {
  try {
    const response = await api.post('messaging/send/', {
      receiver_id: receiverId,
      message
    })
    return response.data
  } catch (error) {
    console.error('Failed to send message:', error)
    throw error
  }
}

// Get messages in conversation
export async function getConversationMessages(conversationId) {
  try {
    const response = await api.get(`messaging/conversations/${conversationId}/`)
    return response.data
  } catch (error) {
    console.error('Failed to fetch conversation messages:', error)
    return []
  }
}
