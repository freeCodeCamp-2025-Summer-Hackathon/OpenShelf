import { Icon } from '@iconify-icon/react'
import { Link } from 'react-router-dom'


export default function FeaturedItem({ item }) {
  return (
    <Link to={`/item/${item.id}`} className="w-full">
      <div className="flex flex-col gap-3 p-4 border border-lavender-200 rounded-lg hover:shadow-lg transition-all duration-300 h-full bg-white hover:border-lavender-300 transform hover:-translate-y-1">
        <div className="relative">
          {/* Always show purpleBook.png for featured items */}
          <img
            src="/purpleBook.png"
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg"
          />
          {item.available !== undefined && (
            <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
              item.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
            }`}>
              {item.available ? 'Available' : 'Borrowed'}
            </span>
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {item.description}
            </p>
          )}
        </div>
        
        <div className="mt-auto flex flex-wrap gap-2">
          {item.category && (
            <span className="inline-block bg-lavender-100 text-xs px-3 py-1 rounded-full text-lavender-800 font-medium">
              {item.category}
            </span>
          )}
          {item.condition && (
            <span className="inline-block bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700 font-medium">
              {item.condition}
            </span>
          )}
          <div className="flex items-center mt-2 text-xs text-lavender-500">
            <Icon icon="heroicons:user-circle" className="mr-1" />
            {item.owner?.name || 'Unknown owner'}
          </div>
        </div>
      </div>
    </Link>
  )
}
