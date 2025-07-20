// src/features/profile/pages/UserItemsPage.jsx
import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { getUserItems } from '../api/getUserItems'
import ProfileMenu from '../../../components/ProfileMenu'

export async function userItemsLoader() {
  try {
    const response = await getUserItems()
    return { 
      items: response.data?.results || [],
      error: response.error || null,
    }
  } catch (error) {
    console.error('Error loading user items:', error)
    return { 
      items: [],
      error: 'Failed to load your items. Please try again later.',
    }
  }
}

export default function UserItemsPage() {
  const { items, error } = useLoaderData()
  const [filter, setFilter] = useState('all')
  
  // Apply filter
  const filteredItems = items.filter(item => {
    if (filter === 'all') return true
    if (filter === 'available') return item.available
    if (filter === 'borrowed') return !item.available
    return true
  })

  return (
    <div className="flex flex-row justify-center mt-12">
      <div className="w-[1280px] p-6 grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <div className="sticky top-24">
            <ProfileMenu />
          </div>
        </div>
        <div className="col-span-9">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display-3xl">My Items</h1>
          <Link to="/add-item">
            <button
              type="button"
              className="bg-lavender-800 text-white px-5 py-2 rounded-lg"
            >
              Add New Item
            </button>
          </Link>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Filter tabs */}
        <div className="flex mb-6 border-b">
          <button
            type="button"
            className={`px-4 py-2 ${filter === 'all' ? 'border-b-2 border-lavender-500 text-lavender-800' : 'text-stroke-strong'}`}
            onClick={() => setFilter('all')}
          >
            All Items
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${filter === 'available' ? 'border-b-2 border-lavender-500 text-lavender-800' : 'text-stroke-strong'}`}
            onClick={() => setFilter('available')}
          >
            Available
          </button>
          <button
            type="button"
            className={`px-4 py-2 ${filter === 'borrowed' ? 'border-b-2 border-lavender-500 text-lavender-800' : 'text-stroke-strong'}`}
            onClick={() => setFilter('borrowed')}
          >
            Currently Borrowed
          </button>
        </div>
        
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="border border-stroke-weak rounded-lg overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <span 
                      className={`px-2 py-1 text-xs rounded ${
                        item.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.available ? 'Available' : 'Borrowed'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-stroke-strong mb-3">
                    {item.description?.substring(0, 100) || 'No description available'}...
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.category && (
                      <span className="inline-block bg-lavender-100 text-xs px-2 py-1 rounded">
                        {item.category}
                      </span>
                    )}
                    {item.condition && (
                      <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                        {item.condition}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <Link to={`/item/${item.id}`}>
                      <button
                        type="button"
                        className="text-lavender-800 hover:text-lavender-600"
                      >
                        View Details
                      </button>
                    </Link>
                    <Link to={`/edit-item/${item.id}`}>
                      <button
                        type="button"
                        className="text-lavender-800 hover:text-lavender-600"
                      >
                        Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-lavender-50 rounded-lg">
            <p className="text-lg text-lavender-800 mb-2">You don't have any items yet</p>
            <p className="text-stroke-strong mb-6">Share your books, tools, or games with the community!</p>
            <Link to="/add-item">
              <button
                type="button"
                className="bg-lavender-800 text-white px-6 py-3 rounded-lg"
              >
                Add Your First Item
              </button>
            </Link>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}
