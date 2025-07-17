import { Icon } from '@iconify-icon/react'
import { useLoaderData } from 'react-router'

export default function FeaturedItems() {
  const { items } = useLoaderData()

  const featuredItems = items.filter(item => 'featured' in item.tag)

  let itemElements
  if (featuredItems) {
    itemElements = featuredItems.map((item) => {
      return (
        <div className="w-36 flex flex-col gap-2" key={item.id}>
          <div className="w-full h-48 rounded-xl bg-[url(item-image-test.png)] bg-cover bg-center border-1 border-stroke-weak"></div>
          <div>
            <p className="font-semibold">{item.title}</p>
            <div className="flex flex-row justify-between items-center">
              <p className="text-stroke-strong">
                {item.is_available}
                {' '}
                available
              </p>
              {/* <p className="text-lavender-500">$40</p> */}
            </div>
          </div>

          <div className="flex flex-row gap-2">
            {item.tags.map(tag => (
              <div className="px-3 py-[3px] rounded bg-lavender-200" key={tag}>{tag}</div>
            ))}
          </div>
        </div>
      )
    })
  }

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

      <div className="mt-6 flex flex-row gap-8">{itemElements}</div>
    </div>
  )
}
