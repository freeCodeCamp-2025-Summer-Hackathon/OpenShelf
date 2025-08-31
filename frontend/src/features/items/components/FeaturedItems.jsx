import { Icon } from '@iconify-icon/react'
import { useLoaderData } from 'react-router'
import Item from './Item'

export default function FeaturedItems() {
  const { items } = useLoaderData()
  
  // Show all items created by all users
  const featuredItems = items

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="font-display-3xl">All listings</h2>
          <p className="mt-1">Discover items shared by the OpenShelf community.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {featuredItems.length > 0
          ? featuredItems.map(item => <Item key={item.id} item={item} />)
          : <p className="text-lavender-800 col-span-full">No items available.</p>}
      </div>
    </div>
  )
}
