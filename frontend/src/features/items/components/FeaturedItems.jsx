import { Icon } from '@iconify-icon/react'

import { getItems } from '../api/items'

export default function FeaturedItems() {
  return (
    <div>
      <div className='flex flex-row justify-between'>
        <div>
          <h2 className="font-display-3xl">Featured listings</h2>
          <p className="mt-1">Handpicked by the curators of OpenShelf.</p>
        </div>

        <div className='flex flex-row gap-4'>
            <button type='button'>
                <Icon icon="heroicons:arrow-left" className='text-xl text-stroke-strong'/>
            </button>
            <button type='button'>
                <Icon icon="heroicons:arrow-right" className='text-xl'/>
            </button>
        </div>
      </div>

      <div className="mt-6 flex flex-row gap-8">
        <div className="w-36 flex flex-col gap-2">
          <div className="w-full h-48 rounded-xl bg-[url(item-image-test.png)] bg-cover bg-center border-1 border-stroke-weak"></div>
          <div>
            <p className="font-semibold">Book in Purple</p>
            <div className="flex flex-row justify-between items-center">
              <p className="text-stroke-strong">2 available</p>
              <p className="text-lavender-500">$40</p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="px-3 py-[3px] rounded bg-lavender-200">new</div>
            <div className="px-3 py-[3px] rounded bg-red-200">book</div>
          </div>
        </div>

        <div className="w-36 flex flex-col gap-2">
          <div className="w-full h-48 rounded-xl bg-[url(item-image-test.png)] bg-cover bg-center border-1 border-stroke-weak"></div>
          <div>
            <p className="font-semibold">Book in Purple</p>
            <div className="flex flex-row justify-between items-center">
              <p className="text-stroke-strong">2 available</p>
              <p className="text-lavender-500">$40</p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <div className="px-3 py-[3px] rounded bg-lavender-200">new</div>
            <div className="px-3 py-[3px] rounded bg-red-200">book</div>
          </div>
        </div>
      </div>
    </div>
  )
}
