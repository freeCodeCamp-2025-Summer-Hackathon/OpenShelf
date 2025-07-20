import { useState } from 'react'
import { Icon } from '@iconify-icon/react'
import { useLoaderData, Link } from 'react-router-dom'
import FeaturedItem from './FeaturedItem'

export default function FeaturedItems() {
  const { items } = useLoaderData()
  const featuredItems = items.filter(item => item.tags && item.tags.includes('featured'))
  const [startIndex, setStartIndex] = useState(0)
  const itemsToShow = 4
  
  // Categories code removed since browse by category section was removed

  return (
    <div className="mt-4 sm:mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0 text-center sm:text-left">
          <h2 className="font-display-3xl text-2xl sm:text-3xl font-bold text-gray-800">Featured listings</h2>
          <p className="mt-2 text-gray-600">Handpicked by the curators of OpenShelf.</p>
        </div>

        <div className="flex flex-row gap-4">
          <button 
            type="button"
            onClick={() => setStartIndex(Math.max(0, startIndex - 1))}
            disabled={startIndex === 0}
            className={`p-2 rounded-full ${startIndex === 0 ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-lavender-100 hover:bg-lavender-200'}`}
          >
            <Icon
              icon="heroicons:arrow-left"
              className="text-xl text-lavender-800"
            />
          </button>
          <button 
            type="button"
            onClick={() => setStartIndex(Math.min(featuredItems.length - itemsToShow, startIndex + 1))}
            disabled={startIndex >= featuredItems.length - itemsToShow}
            className={`p-2 rounded-full ${startIndex >= featuredItems.length - itemsToShow ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-lavender-100 hover:bg-lavender-200'}`}
          >
            <Icon icon="heroicons:arrow-right" className="text-xl text-lavender-800" />
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {featuredItems.length > 0
          ? featuredItems.slice(startIndex, startIndex + 4).map((item, index) => (
              <div key={item.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 150}ms` }}>
                <FeaturedItem item={item} />
              </div>
            ))
          : (
              <div className="col-span-4 text-center py-10 bg-gray-50 rounded-xl border border-gray-100 animate-scaleIn">
                <Icon icon="heroicons:information-circle" className="text-4xl text-[#5e60ce] mx-auto mb-2" />
                <p className="text-gray-800 text-lg">No items are featured at this time.</p>
              </div>
            )}
      </div>
      
      
      
       {/* Recent Items  */}
      <div className="mt-16">
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="font-display-3xl">Recently Added</h2>
          <Link to="/listings?sort_by=newest" className="text-lavender-800 hover:underline flex items-center">
            View all <Icon icon="heroicons:arrow-right" className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items
            .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
            .slice(0, 4)
            .map(item => (
              <Link key={item.id} to={`/item/${item.id}`}>
                <div className="border border-stroke-weak p-4 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="h-40 mb-3">
                    <img
                      src="/purpleBook.png"
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-stroke-strong flex-grow">
                    {item.description?.substring(0, 60) || 'No description available'}
                    ...
                  </p>
                  <div className="mt-auto pt-2">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.category && (
                        <span className="inline-block bg-lavender-100 text-xs px-2 py-1 rounded">
                          {item.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      
      {/* Popular Interests */}
      <div className="mt-20 mb-16 bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 animate-fadeIn">Popular Interests</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {['fiction', 'non-fiction', 'tools', 'gardening', 'games', 'board games', 'cooking', 'crafts', 'sports', 'music', 'instruments', 'outdoor', 'electronics'].map((tag, index) => (
            <Link
              key={tag}
              to={`/search?q=${encodeURIComponent(tag)}`}
              className="px-5 py-2.5 bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-[#5e60ce] hover:bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:text-[#5e60ce] transition-all duration-300 transform hover:scale-105 hover:translate-y-[-2px] animate-fadeIn"
              style={{ animationDelay: `${100 + index * 50}ms` }}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
