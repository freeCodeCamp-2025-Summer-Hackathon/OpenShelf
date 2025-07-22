import { Icon } from '@iconify-icon/react'

import FeaturedItems from './FeaturedItems'
import Categories from './Categories'

export default function HomePage() {
  return (
    <div>

      <div className="bg-[#D3D3F1] h-[550px] bg-[url(home-hero-brush.svg)] bg-no-repeat bg-size-[auto_500px] bg-center relative flex justify-center items-center">
        <div>
          <h1 className="font-display-7xl">
            What's on
            {' '}
            <br></br>
            your
            {' '}
            <i className="text-lavender-500">Shelf</i>
            {' '}
            today?
          </h1>
          <p className="mt-8 mb-10">
            Share and borrow books, tools, and games with the community.
          </p>
          <button
            type="button"
            className="rounded-lg bg-lavender-500 px-4 py-2 text-white flex flex-row items-center justify-center gap-2"
          >
            <span>View listings</span>
            <Icon icon="heroicons:arrow-right" />
          </button>
        </div>
        <img
          src="home-hero-illustration.svg"
          className="ml-[-40px] h-[400px]"
        />
      </div>

      <div className="flex flex-row justify-center mt-8">
        <main className="w-[1280px]">
          <Categories />
          <FeaturedItems />
        </main>
      </div>
    </div>
  )
}
