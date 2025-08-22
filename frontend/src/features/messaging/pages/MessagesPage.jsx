import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { getConversations } from '../api/messaging'
import ConversationItem from '../components/ConversationItem'

export default function MessagesPage() {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await getConversations()
        console.log('Conversations loaded:', data)
        // Extract the results array from the paginated response
        const conversationsArray = data.results || data
        console.log('Conversations array:', conversationsArray)
        setConversations(conversationsArray)
      } catch (error) {
        console.error('Error fetching conversations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchConversations()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center py-[8rem]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-500 mx-auto mb-4"></div>
          <p>Loading conversations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen justify-center items-center py-[8rem]">
      <div className="flex flex-col justify-start max-w-4xl w-2/3 min-w-2xl h-full">
        <div>
          <h1 className="font-display-3xl">Messages</h1>
          <p className="text-stroke-strong mt-1">
            Chat with other OpenShelf community members
          </p>
          <hr className="text-stroke-strong mx-[-20px] mt-2"></hr>
        </div>

        <div className="mt-6 flex-1">
          {conversations.length > 0 ? (
            <div className="space-y-4">
              {conversations.map(conversation => (
                <ConversationItem key={conversation.conversation_id} conversation={conversation} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="font-display-2xl mb-2">No Messages Yet</h2>
              <p className="text-stroke-strong mb-6">
                Start a conversation by messaging someone from their item listing or profile.
              </p>
              <Link 
                to="/catalogue" 
                className="bg-lavender-500 text-white px-6 py-3 rounded-lg hover:bg-lavender-600 transition-colors"
              >
                Browse Items
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
