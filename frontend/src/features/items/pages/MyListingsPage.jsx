import { useState } from 'react'
import { useLoaderData, Link } from 'react-router'
import Item from '../components/Item'
import ItemsSortBy from '../components/ItemsSortBy'

export default function MyListingsPage() {
  const { items } = useLoaderData()
  const [itemsSortBy, setItemsSortBy] = useState(null)

  const sortingOptions = [
    { label: 'Title (A to Z)', value: 'alphabetical-asc' },
    { label: 'Title (Z to A)', value: 'alphabetical-dsc' },
    { label: 'Newest First', value: 'newest-first' },
    { label: 'Oldest First', value: 'oldest-first' },
  ]

  const sortedItems = items.sort((a, b) => {
    if (itemsSortBy === 'alphabetical-asc') {
      return a.title.localeCompare(b.title)
    }

    if (itemsSortBy === 'alphabetical-dsc') {
      return b.title.localeCompare(a.title)
    }

    if (itemsSortBy === 'newest-first') {
      return new Date(b.created_at || 0) - new Date(a.created_at || 0)
    }

    if (itemsSortBy === 'oldest-first') {
      return new Date(a.created_at || 0) - new Date(b.created_at || 0)
    }

    return items
  })

  return (
    <div className="flex h-screen justify-center items-center py-[8rem]">
      <div className="flex flex-col justify-start max-w-7xl w-2/3 min-w-2xl h-full">
        <div>
          <h1 className="font-display-3xl">
            My Listings {items.length > 0 && `(${items.length})`}
          </h1>
          <p className="text-stroke-strong mt-1">
            Manage your shared items and see their availability status
          </p>
          <hr className="text-stroke-strong mx-[-20px] mt-2"></hr>
        </div>
        
        <div className="flex justify-between items-center mt-4 mb-8">
          <ItemsSortBy
            options={sortingOptions}
            selectedOption={itemsSortBy}
            setSelectedOption={setItemsSortBy}
          />
          <Link 
            to="/create" 
            className="bg-lavender-500 text-white px-4 py-2 rounded-lg hover:bg-lavender-600 transition-colors"
          >
            Add New Item
          </Link>
        </div>

        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {sortedItems.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="font-display-2xl mb-2">No Items Yet</h2>
            <p className="text-stroke-strong mb-6">
              You haven't listed any items for sharing yet.
            </p>
            <Link 
              to="/create" 
              className="bg-lavender-500 text-white px-6 py-3 rounded-lg hover:bg-lavender-600 transition-colors"
            >
              Create Your First Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
