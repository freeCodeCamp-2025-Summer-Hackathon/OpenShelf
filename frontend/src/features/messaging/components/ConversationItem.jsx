import { Link } from 'react-router'
import formatDate from '../../../lib/formatDate'

export default function ConversationItem({ conversation }) {
  const { conversation_id, other_user, last_message, unread_count } = conversation
  
  const avatarUrl = `https://eu.ui-avatars.com/api/?name=${other_user.name}&size=48&background=6565C9&color=fff`

  return (
    <Link 
      to={`/messages/${conversation_id}`}
      className="block p-4 border border-stroke-weak rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <img 
          src={avatarUrl} 
          alt={other_user.name}
          className="w-12 h-12 rounded-full"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg truncate">{other_user.name}</h3>
            <div className="flex items-center gap-2">
              {last_message && (
                <span className="text-sm text-stroke-strong">
                  {formatDate(last_message.timestamp)}
                </span>
              )}
              {unread_count > 0 && (
                <div className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                  {unread_count > 99 ? '99+' : unread_count}
                </div>
              )}
            </div>
          </div>
          
          {last_message && (
            <p className="text-stroke-strong text-sm truncate mt-1">
              <span className="font-medium">{last_message.sender_name}:</span> {last_message.message}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
