import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { useState } from 'react'
import Tags from '../../../components/Tags'

function DetailPage() {
  // get images from api later
  const images = ['/purpleBook.png', '/grayBook.png']

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevImage = () => {
    if (currentIndex > 0)
      setCurrentIndex(prev => prev - 1)
  }

  const nextImage = () => {
    if (currentIndex < images.length - 1)
      setCurrentIndex(prev => prev + 1)
  }

  const showImage = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="min-h-[100dvh]">
      {/* No navbar for now */}
      {/* <Navbar /> */}
      <div className="flex h-screen overflow-hidden">
        <div className="w-3/5 bg-[#D3D3F1] sticky flex justify-center items-center">
          <div className="w-[75%] flex justify-between items-center">
            <div className="flex justify-center items-center gap-x-5">
              <button
                type="button"
                onClick={prevImage}
                disabled={currentIndex === 0}
                className={`size-11 rounded-full bg-white flex justify-center items-center transition-opacity ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <Icon icon="heroicons:chevron-left" className="text-4xl" />
              </button>
              <img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                width="400"
              />
              <button
                type="button"
                onClick={nextImage}
                disabled={currentIndex === images.length - 1}
                className={`size-11 rounded-full bg-white flex justify-center items-center transition-opacity ${
                  currentIndex === images.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <Icon icon="heroicons:chevron-right" className="text-4xl" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {images.map((img, index) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => showImage(index)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-28 object-cover border-2 rounded ${
                      index === currentIndex
                        ? 'border-lavender-500 ring-2 ring-lavender-300'
                        : 'border-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/5 pt-5 px-12 overflow-y-auto">
          <div className="py-4">
            {/* Render name, author, tags, description, owner and owner's notes later */}
            <h1 className="font-display-5xl">Book In Purple</h1>
            <p className="font-sans-sm my-3">Book Author</p>
            <div className="flex gap-2">
              <Tags type="condition" label="new" />
              <Tags type="category" label="book" />
              <Tags type="genre" label="genre" />
              <Tags type="genre" label="genre" />
            </div>
          </div>
          <div className="py-4">
            <p className="font-sans-2xl font-semibold">Description</p>
            <p className="mt-2">
              A book in purple. Yep. You've guessed it! It's a book all about
              purple. Purple things, purple plants, purple animals, purple
              houses, every purple existence that exists in our universe! You
              can find all the purple in this book!
            </p>
          </div>
          <div className="py-4">
            <div className="flex items-center gap-x-3">
              <img
                src="/placeholderPfp.jpg"
                alt="Profile Pic"
                className="rounded-full"
                width="50"
              />
              <span className="font-sans-base font-bold">Smug Cat</span>
              <Icon
                icon="heroicons-solid:check-badge"
                className="text-lavender-300"
              />
            </div>
            <p className="mt-2">
              This is one of my treasures. So, please handle with care, avoid
              bending. Thank you!
            </p>
          </div>
          <div className="flex justify-between items-center py-4">
            <button
              type="button"
              className="flex justify-center items-center p-3 bg-lavender-500 text-white rounded-md"
            >
              <Icon
                icon="heroicons:chat-bubble-oval-left-ellipsis"
                className="text-2xl"
              />
            </button>
            <button
              type="button"
              className="font-sans-lg-upper flex justify-center items-center py-3 w-4/6 bg-lavender-500 text-white rounded-md"
            >
              Check out
            </button>
            <button
              type="button"
              className="flex justify-center items-center p-3 bg-[#F2ECF4] rounded-md"
            >
              <Icon icon="heroicons:heart" className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
