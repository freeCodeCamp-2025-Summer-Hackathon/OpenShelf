import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { getItems } from '../api/getItems'
import Item from '../components/Item'
import ItemsSortBy from '../components/ItemsSortBy'

export async function catalogueLoader() {
  const items = await getItems()
  return { items }
}

export default function CataloguePage() {
  const { items } = useLoaderData()
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
    <div className="py-[10rem] container mx-auto">
      <div className="flex justify-start mb-8">
        <ItemsSortBy
          options={sortingOptions}
          selectedOption={itemsSortBy}
          setSelectedOption={setItemsSortBy}
        />
      </div>
      <div className="grid grid-cols-8">
        {sortedItems.map(item => <Item key={item.id} item={item} />)}
      </div>
    </div>
  )
}
