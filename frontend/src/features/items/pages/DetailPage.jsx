import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import Tags from '../../../components/Tags'
import useImageSlider from '../hooks/useImageSlider'

function DetailPage() {
  // get images from api later
  const images = ['/purpleBook.png', '/grayBook.png']

  const { currentIndex, prevImage, nextImage, showImage }
    = useImageSlider(images)

  return (
    <div className="min-h-[100dvh]">
      {/* No navbar for now */}
      {/* <Navbar /> */}
      <div className="flex h-screen w-full overflow-hidden">
        <div className="w-3/5 flex flex-col sticky justify-center gap-4 px-16 py-14">
          <div className="rounded-xl bg-[#D3D3F1] h-[70%] w-full flex justify-between items-center px-20">
            <button
              type="button"
              onClick={prevImage}
              disabled={currentIndex === 0}
              className={`size-8 rounded-full bg-white flex justify-center items-center transition-opacity ${
                currentIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <Icon
                icon="heroicons:chevron-left"
                className={`text-xl ${
                  currentIndex === 0 ? 'text-stroke-strong' : 'text-black'
                }`}
              />
            </button>

            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="h-[70%]"
            />
            {/* We can decide later on if the image should be covering the entire box or kept like this */}

            <button
              type="button"
              onClick={nextImage}
              disabled={currentIndex === images.length - 1}
              className={`size-8 rounded-full bg-white flex justify-center items-center transition-opacity ${
                currentIndex === images.length - 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <Icon
                icon="heroicons:chevron-right"
                className={`text-xl ${
                  currentIndex === images.length - 1
                    ? 'text-stroke-strong'
                    : 'text-black'
                }`}
              />
            </button>
          </div>

          <div className="flex gap-4">
            {images.map((img, index) => (
              <button type="button" key={img} onClick={() => showImage(index)}>
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`rounded-lg py-6 px-10 w-[160px] transition-colors cursor-pointer ${
                    index === currentIndex ? 'bg-[#D3D3F1]' : 'bg-gray-200'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="w-2/5 py-20 px-12 overflow-y-auto flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src="/placeholderPfp.jpg"
                  alt="Profile Pic"
                  className="rounded-full"
                  width="50"
                />
                <span className="font-sans-base font-bold">Smug Cat</span>
              </div>

              <p className="text-stroke-strong">2 available</p>
            </div>

            <div className="py-4">
              {/* Render name, author, tags, description, owner and owner's notes later */}
              <h1 className="font-display-5xl">
                Book In Purple by Book Author
              </h1>
              <div className="flex gap-2 mt-4">
                <Tags type="condition" label="new" />
                <Tags type="category" label="book" />
                <Tags type="genre" label="genre" />
                <Tags type="genre" label="genre" />
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-10">
              <p>
                A book in purple. Yep. You've guessed it! It's a book all about
                purple: purple plants, purple animals, purple houses, every
                purple existence that exists in our universe! You can find all
                the purple in this book!
              </p>
              <p>
                This is one of my treasures. So, please handle with care, avoid
                bending. Thank you!
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex flex-row items-center gap-4">
              <button
                type="button"
                className="font-sans-lg-upper flex justify-center items-center gap-2 py-3 w-full max-w-[400px] bg-lavender-500 text-white rounded-md"
              >
                <Icon icon="heroicons:shopping-bag" className="text-2xl" />
                <span>Check out</span>
              </button>
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
                className="flex justify-center items-center p-3 bg-[#F2ECF4] rounded-md"
              >
                <Icon icon="heroicons:heart" className="text-2xl" />
              </button>
            </div>
            <div className="flex flex-row items-center gap-1 mt-2">
              <Icon icon="heroicons:information-circle" className="text-xl" />
              <span>
                You can lend this item for
                {' '}
                <b>2 weeks</b>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
