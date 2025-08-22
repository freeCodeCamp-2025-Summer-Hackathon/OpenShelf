import { useLoaderData } from 'react-router'
import formatDate from '../../../lib/formatDate'

export default function MessageBubble({ message }) {
  const { profile } = useLoaderData() || {}
  const isCurrentUser = profile?.name === message.sender_name
  
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isCurrentUser 
          ? 'bg-lavender-500 text-white' 
          : 'bg-gray-200 text-black'
      }`}>
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${
          isCurrentUser ? 'text-lavender-200' : 'text-gray-500'
        }`}>
          {formatDate(message.timestamp)}
        </p>
      </div>
    </div>
  )
}
