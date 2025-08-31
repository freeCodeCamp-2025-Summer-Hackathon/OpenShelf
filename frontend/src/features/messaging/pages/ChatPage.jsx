import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router'
import { Icon } from '@iconify-icon/react'
import { getConversationMessages, sendMessage, getConversationWithUser } from '../api/messaging'
import MessageBubble from '../components/MessageBubble'

export default function ChatPage() {
  const { conversationId, userId } = useParams()
  
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [otherUser, setOtherUser] = useState(null)
  const [currentConversationId, setCurrentConversationId] = useState(conversationId)
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)

  const scrollToBottom = (force = false) => {
    if (force || shouldAutoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isNearBottom = () => {
    if (!messagesContainerRef.current) return true
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current
    return scrollHeight - scrollTop - clientHeight < 100 // Within 100px of bottom
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        
        if (conversationId) {
          // Loading existing conversation
          console.log('Loading existing conversation:', conversationId)
          const data = await getConversationMessages(conversationId)
          console.log('Messages received:', data)
          // Extract the results array from the paginated response
          const messagesArray = data.results || data
          console.log('Messages array:', messagesArray)
          console.log('Messages count:', Array.isArray(messagesArray) ? messagesArray.length : 'not array')
          setMessages(Array.isArray(messagesArray) ? messagesArray : [])
          setCurrentConversationId(conversationId)
          
          // Get other user info from messages
          if (messagesArray.length > 0) {
            const otherUserMessage = messagesArray.find(msg => !msg.is_sender)
            if (otherUserMessage) {
              setOtherUser({ 
                name: otherUserMessage.sender_name,
                id: otherUserMessage.sender_id 
              })
            } else {
              setOtherUser({ name: messagesArray[0].sender_name })
            }
          }
          // Auto-scroll on initial load
          setTimeout(() => scrollToBottom(true), 100)
        } else if (userId) {
          // Starting new conversation with specific user
          try {
            const conversation = await getConversationWithUser(userId)
            if (conversation && conversation.conversation_id) {
              const data = await getConversationMessages(conversation.conversation_id)
              const messagesArray = data.results || data
              setMessages(Array.isArray(messagesArray) ? messagesArray : [])
              setCurrentConversationId(conversation.conversation_id)
              
              // Set other user info from the conversation response
              if (conversation.other_user) {
                setOtherUser(conversation.other_user)
              } else if (messagesArray.length > 0) {
                const otherUserMessage = messagesArray.find(msg => !msg.is_sender)
                if (otherUserMessage) {
                  setOtherUser({ 
                    name: otherUserMessage.sender_name,
                    id: otherUserMessage.sender_id 
                  })
                } else {
                  setOtherUser({ name: messagesArray[0].sender_name })
                }
              }
              // Auto-scroll on initial load
              setTimeout(() => scrollToBottom(true), 100)
            } else {
              // No existing conversation, start fresh
              setMessages([])
              setCurrentConversationId(null)
              setOtherUser({ id: userId, name: 'User' })
            }
          } catch (error) {
            // No existing conversation, start fresh
            setMessages([])
            setCurrentConversationId(null)
            setOtherUser({ id: userId, name: 'User' })
          }
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [conversationId, userId])

  // Check scroll position and update auto-scroll preference
  useEffect(() => {
    const handleScroll = () => {
      setShouldAutoScroll(isNearBottom())
    }

    const container = messagesContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Add polling to refresh messages every 3 seconds
  useEffect(() => {
    if (!currentConversationId) return

    const interval = setInterval(async () => {
      try {
        const wasNearBottom = isNearBottom()
        const data = await getConversationMessages(currentConversationId)
        const messagesArray = data.results || data
        const currentMessageCount = messages.length
        const newMessageCount = Array.isArray(messagesArray) ? messagesArray.length : 0
        
        setMessages(Array.isArray(messagesArray) ? messagesArray : [])
        
        // Only auto-scroll if user was near bottom and there are new messages
        if (wasNearBottom && newMessageCount > currentMessageCount) {
          setTimeout(() => scrollToBottom(true), 100)
        }
      } catch (error) {
        console.error('Error polling messages:', error)
      }
    }, 3000) // Poll every 3 seconds

    return () => clearInterval(interval)
  }, [currentConversationId, messages.length])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      const receiverId = userId || (otherUser && otherUser.id)
      
      if (!receiverId) {
        console.error('Cannot determine receiver ID')
        alert('Error: Cannot determine who to send the message to')
        return
      }

      const response = await sendMessage(receiverId, newMessage.trim())
      
      // Clear the input immediately
      setNewMessage('')
      
      // If this created a new conversation, update our conversation ID
      if (response.conversation_id && !currentConversationId) {
        setCurrentConversationId(response.conversation_id)
      }
      
      // Add the message to local state for immediate feedback
      const newMsg = {
        id: response.id || Date.now(),
        message: newMessage.trim(),
        sender_name: 'You',
        timestamp: new Date().toISOString(),
        is_sender: true,
        read: false
      }
      
      setMessages(prev => {
        const currentMessages = Array.isArray(prev) ? prev : []
        return [...currentMessages, newMsg]
      })
      
      // Force scroll to bottom when user sends a message
      setTimeout(() => scrollToBottom(true), 100)
      
      // Refresh messages after a short delay to get the real data
      setTimeout(async () => {
        try {
          const conversationIdToUse = currentConversationId || response.conversation_id
          if (conversationIdToUse) {
            const data = await getConversationMessages(conversationIdToUse)
            const messagesArray = data.results || data
            setMessages(Array.isArray(messagesArray) ? messagesArray : [])
            // Ensure scroll to bottom after refresh
            setTimeout(() => scrollToBottom(true), 100)
          }
        } catch (error) {
          console.error('Error refreshing messages:', error)
        }
      }, 1000)
      
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-500 mx-auto mb-4"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b border-stroke-weak p-4 flex items-center gap-4">
          <Link to="/messages" className="text-stroke-strong hover:text-black">
            <Icon icon="heroicons:arrow-left" className="text-xl" />
          </Link>
          {otherUser && (
            <>
              <img 
                src={`https://eu.ui-avatars.com/api/?name=${otherUser.name}&size=40&background=6565C9&color=fff`}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full"
              />
              <h1 className="font-semibold text-lg flex-1">{otherUser.name}</h1>
              <button 
                onClick={async () => {
                  if (currentConversationId) {
                    const data = await getConversationMessages(currentConversationId)
                    console.log('Manual refresh data:', data)
                    const messagesArray = data.results || data
                    setMessages(Array.isArray(messagesArray) ? messagesArray : [])
                  }
                }}
                className="px-3 py-1 text-sm bg-lavender-500 text-white rounded hover:bg-lavender-600"
              >
                Refresh
              </button>
            </>
          )}
        </div>

        {/* Messages */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length > 0 ? (
            messages.map(message => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            <div className="text-center text-stroke-strong py-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t border-stroke-weak p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border border-stroke-weak rounded-lg px-4 py-2 focus:outline-none focus:border-lavender-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || sending}
              className="bg-lavender-500 text-white px-4 py-2 rounded-lg hover:bg-lavender-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {sending ? (
                <Icon icon="heroicons:arrow-path" className="animate-spin" />
              ) : (
                <Icon icon="heroicons:paper-airplane" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
