import { useState, useEffect } from 'react'
import { useLoaderData, Link, useSearchParams } from 'react-router-dom'
import { getItems } from '../api/getItems'
import { searchItems } from '../api/searchItems'
import SearchBar from '../../../components/SearchBar'
import Tags from '../../../components/Tags'
import { ItemSortBy } from '../components'

export async function listingsPageLoader({ request }) {
  try {
    // Parse URL parameters for initial filtering
    const url = new URL(request.url)
    const category = url.searchParams.get('category') || ''
    const condition = url.searchParams.get('condition') || ''
    const sortBy = url.searchParams.get('sort_by') || 'newest'
    const available = url.searchParams.get('available') || ''
    
    // If we have filter parameters, use searchItems instead of getItems
    let response
    if (category || condition || sortBy !== 'newest' || available) {
      response = await searchItems('', { 
        category, 
        condition,
        sort_by: sortBy,
        available: available === 'true' ? true : undefined
      })
    } else {
      response = await getItems()
    }
    
    return { 
      items: response.data.results || [],
      initialParams: {
        category,
        condition,
        sortBy,
        available
      }
    }
  } catch (error) {
    console.error('Error loading listings:', error)
    return { 
      items: [],
      initialParams: {
        category: '',
        condition: '',
        sortBy: 'newest',
        available: ''
      }
    }
  }
}

export default function ListingsPage() {
  const { items: initialItems, initialParams } = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState(initialItems)
  const [loading, setLoading] = useState(false)
  
  // Get filter values from URL params
  const category = searchParams.get('category') || initialParams.category || ''
  const condition = searchParams.get('condition') || initialParams.condition || ''
  const sortBy = searchParams.get('sort_by') || initialParams.sortBy || 'newest'
  const available = searchParams.get('available') || initialParams.available || ''
  
  // Extract unique categories and conditions
  const categories = [...new Set(items.map(item => item.category).filter(Boolean))]
  const conditions = [...new Set(items.map(item => item.condition).filter(Boolean))]
  
  // Apply filters when URL parameters change
  useEffect(() => {
    const fetchFilteredItems = async () => {
      setLoading(true)
      try {
        const response = await searchItems('', {
          category,
          condition,
          sort_by: sortBy,
          available: available === 'true' ? true : undefined
        })
        setItems(response.data.results || [])
      } catch (error) {
        console.error('Error fetching filtered items:', error)
      } finally {
        setLoading(false)
      }
    }
    
    // Only fetch if we have any filter applied
    if (category || condition || sortBy !== 'newest' || available) {
      fetchFilteredItems()
    } else {
      setItems(initialItems)
    }
  }, [category, condition, sortBy, available, initialItems])
  
  // Update URL parameters when filters change
  const updateFilter = (filterName, value) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(filterName, value)
    } else {
      newParams.delete(filterName)
    }
    setSearchParams(newParams)
  }

  return (
    <div className="flex flex-row justify-center mt-8">
      <main className="w-[1280px] px-4">
        <h1 className="font-display-5xl mb-6">All Listings</h1>
        
        <SearchBar size="large" className="mb-6" />
        
        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-8 mb-8 p-6 bg-lavender-100 rounded-lg">
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select 
              value={category} 
              onChange={(e) => updateFilter('category', e.target.value)}
              className="p-2 border rounded min-w-[180px]"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Condition</label>
            <select 
              value={condition} 
              onChange={(e) => updateFilter('condition', e.target.value)}
              className="p-2 border rounded min-w-[180px]"
            >
              <option value="">Any Condition</option>
              {conditions.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Availability</label>
            <select 
              value={available} 
              onChange={(e) => updateFilter('available', e.target.value)}
              className="p-2 border rounded min-w-[180px]"
            >
              <option value="">All Items</option>
              <option value="true">Available Now</option>
            </select>
          </div>
          
          <ItemSortBy 
            value={sortBy}
            onChange={updateFilter}
            className="min-w-[180px]"
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender-500"></div>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(item => (
              <Link key={item.id} to={`/item/${item.id}`}>
                <div className="border border-stroke-weak p-4 rounded-lg hover:shadow-md transition-shadow h-full flex flex-col">
                  {item.image && (
                    <div className="h-48 mb-3">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-stroke-strong flex-grow">{item.description?.substring(0, 100) || 'No description available'}...</p>
                  <div className="mt-auto pt-3">
                    <p className="text-xs text-lavender-500">{item.owner?.name || 'Unknown owner'}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
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
                      {item.available !== undefined && (
                        <span className={`inline-block text-xs px-2 py-1 rounded ${
                          item.available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.available ? 'Available' : 'Borrowed'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-lavender-50 rounded-lg">
            <p className="text-lg text-lavender-800 mb-2">No items found matching your criteria</p>
            <p className="text-stroke-strong">Try adjusting your filters or check back later</p>
            <button
              type="button"
              onClick={() => setSearchParams({})}
              className="mt-4 px-4 py-2 bg-lavender-800 text-white rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
