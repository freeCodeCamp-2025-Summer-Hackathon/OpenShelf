import { Icon } from '@iconify-icon/react'
import { Link } from 'react-router'

export default function MessageButton({ unreadCount }) {
  return (
    <Link to="/messages" className="relative">
      <div className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-gray-100 transition-colors">
        <Icon icon="heroicons:chat-bubble-left-right" className="text-2xl text-stroke-strong" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </div>
    </Link>
  )
}
