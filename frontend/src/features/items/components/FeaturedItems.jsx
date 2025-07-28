import { Icon } from '@iconify-icon/react'
import { useLoaderData } from 'react-router'
import Item from './Item'

export default function FeaturedItems() {
  const { items } = useLoaderData()
  const featuredItems = items.filter(item => item.tags.includes('featured'))

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="font-display-3xl">Featured listings</h2>
          <p className="mt-1">Handpicked by the curators of OpenShelf.</p>
        </div>

        <div className="flex flex-row gap-4">
          <button type="button">
            <Icon
              icon="heroicons:arrow-left"
              className="text-xl text-stroke-strong"
            />
          </button>
          <button type="button">
            <Icon icon="heroicons:arrow-right" className="text-xl" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-8">
        {featuredItems.length > 1
          ? featuredItems.map(item => <Item key={item.id} item={item} />)
          : <p className="text-lavender-800">No items are featured.</p>}
      </div>
    </div>
  )
}
