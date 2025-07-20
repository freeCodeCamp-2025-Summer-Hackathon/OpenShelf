// src/features/items/pages/SearchPage.jsx
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { searchItems } from '../api/searchItems'
import SearchBar from '../../../components/SearchBar'
import { ItemSortBy } from '../components'

export async function searchPageLoader({ request }) {
  const url = new URL(request.url)
  const query = url.searchParams.get('q') || ''
  const category = url.searchParams.get('category') || ''
  const condition = url.searchParams.get('condition') || ''
  const sortBy = url.searchParams.get('sort_by') || 'newest'
  
  try {
    const response = await searchItems(query, { 
      category, 
      condition,
      sort_by: sortBy
    })
    
    return { 
      items: response.data.results || [],
      searchParams: {
        query,
        category,
        condition,
        sortBy
      }
    }
  } catch (error) {
    console.error('Error in searchPageLoader:', error)
    return { 
      items: [],
      searchParams: {
        query,
        category,
        condition,
        sortBy
      }
    }
  }
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const condition = searchParams.get('condition') || ''
  const sortBy = searchParams.get('sort_by') || 'newest'
  
  // Extract unique categories and conditions
  const categories = [...new Set(results.map(item => item.category).filter(Boolean))]
  const conditions = [...new Set(results.map(item => item.condition).filter(Boolean))]
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        const response = await searchItems(query, {
          category,
          condition,
          sort_by: sortBy
        })
        setResults(response.data.results || [])
      } catch (error) {
        console.error('Error fetching search results:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchResults()
  }, [query, category, condition, sortBy])
  
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
        <div className="mb-8">
          <h1 className="font-display-5xl mb-4">Search Results</h1>
          <SearchBar size="large" className="mb-6" />
          
          {query && (
            <p className="text-stroke-strong">
              {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
            </p>
          )}
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-8 p-4 bg-lavender-100 rounded-lg">
          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select 
              value={category} 
              onChange={(e) => updateFilter('category', e.target.value)}
              className="p-2 border rounded"
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
              className="p-2 border rounded"
            >
              <option value="">Any Condition</option>
              {conditions.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>
          
          <ItemSortBy 
            value={sortBy}
            onChange={updateFilter}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lavender-500"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map(item => (
              <Link key={item.id} to={`/item/${item.id}`}>
                <div className="border border-stroke-weak p-4 rounded-lg hover:shadow-md transition-shadow">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover mb-3 rounded"
                    />
                  )}
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-stroke-strong">{item.description?.substring(0, 100) || 'No description available'}...</p>
                  <p className="text-xs mt-2 text-lavender-500">{item.owner?.name || 'Unknown owner'}</p>
                  
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-lavender-800 mb-2">No results found</p>
            <p className="text-stroke-strong">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}
