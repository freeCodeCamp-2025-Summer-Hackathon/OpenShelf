import { useState } from 'react'
import { useLoaderData, Link } from 'react-router'
import Item from '../components/Item'
import ItemsSortBy from '../components/ItemsSortBy'

export default function CataloguePage() {
  const { items, currentCategory, currentQuery } = useLoaderData()
  const [itemsSortBy, setItemsSortBy] = useState(null)

  const sortingOptions = [
    { label: 'Title (A to Z)', value: 'alphabetical-asc' },
    { label: 'Title (Z to A)', value: 'alphabetical-dsc' },
  ]

  const sortedItems = items.sort((a, b) => {
    if (itemsSortBy === 'alphabetical-asc') {
      return a.title.localeCompare(b.title)
    }

    if (itemsSortBy === 'alphabetical-dsc') {
      return b.title.localeCompare(a.title)
    }

    return items
  })

  return (
    <div className="flex h-screen justify-center items-center py-[8rem]">
      <div className="flex flex-col justify-start max-w-7xl w-2/3 min-w-2xl h-full">
        <div>
          <h1 className="font-display-3xl">
            {currentCategory ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Catalogue` : 'Item Catalogue'}
          </h1>
          {currentCategory && (
            <p className="text-stroke-strong mt-1">
              Showing items in category: <span className="font-semibold">{currentCategory}</span>
            </p>
          )}
          <hr className="text-stroke-strong mx-[-20px] mt-2"></hr>
        </div>
        <div className="flex justify-between items-center mt-4 mb-8">
          <ItemsSortBy
            options={sortingOptions}
            selectedOption={itemsSortBy}
            setSelectedOption={setItemsSortBy}
          />
          {currentCategory && (
            <Link 
              to="/catalogue" 
              className="text-lavender-500 hover:text-lavender-600 font-medium"
            >
              View All Items
            </Link>
          )}
        </div>
        <div className="grid grid-cols-4 xl:grid-cols-7 xl:max-w-7xl gap-2">
          {sortedItems.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
