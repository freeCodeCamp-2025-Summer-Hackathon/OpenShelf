import formatDate from '../../../lib/formatDate'

export default function MessageBubble({ message }) {
  // Use the is_sender field from the message to determine if it's from current user
  const isCurrentUser = message.is_sender
  
  return (
    <div className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
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
