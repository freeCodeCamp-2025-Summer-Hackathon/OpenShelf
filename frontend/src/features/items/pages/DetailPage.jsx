import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { Fragment, useState } from 'react'
import { useLoaderData, useNavigate, useOutletContext } from 'react-router'
import Tags from '../../../components/Tags'
import { getImageUrls } from '../../../utils/imageUtils'
import { deleteItem } from '../api/deleteItem'
import BorrowRequestItemDetails from '../components/BorrowRequestItemDetails'
import CheckOutModal from '../components/CheckOutModal'
import useImageSlider from '../hooks/useImageSlider'

function DetailPage() {
  const { item, profile, lendingRequests } = useLoaderData()

  const currentItem = item.title

  const filteredLendingRequests = lendingRequests.results.filter(
    request => request.item_title === currentItem,
  )

  const navigate = useNavigate()
  const images = item.image_urls || []
  const imageUrls = getImageUrls(images)
  const isOwner = profile?.id === item.owner.id
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const { currentIndex, prevImage, nextImage, showImage }
    = useImageSlider(images)

  const handleDelete = async () => {
    try {
      const config = await deleteItem(item.id)

      if (config.status !== 204) {
        throw new Error(config.request.responseText)
      }

      navigate('/catalogue')
    }
    catch (err) {
      console.error('Error delete item:', err.message)
    }
  }

  const { navHeight } = useOutletContext()
  const profileAvatar = `https://eu.ui-avatars.com/api/?name=${profile.name}&size=48&background=6565C9&color=fff`

  return (
    <div className="min-h-[100dvh]" style={{ paddingTop: navHeight }}>
      <div className="flex h-screen w-full overflow-hidden">
        <div className="w-3/5 flex flex-col justify-center gap-4 px-16 py-14">
          <div className="rounded-xl bg-[#D3D3F1] w-full h-[80%] flex justify-between items-center px-20">
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
              src={
                imageUrls.length > 0 ? imageUrls[currentIndex] : '/grayBook.png'
              }
              alt={`Image ${currentIndex + 1}`}
              className="h-[70%] object-cover"
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
            {imageUrls.map((img, index) => (
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

        <div className="w-2/5 py-20 px-12 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-x-3">
                <img
                  src={profileAvatar}
                  alt="Profile Pic"
                  className="rounded-full"
                  width="50"
                />
                <span className="font-sans-base font-bold">{profile.name}</span>
              </div>

              <p className="text-stroke-strong">
                {item.is_available ? 'Is available' : 'Not available'}
              </p>
            </div>

            <div className="py-4">
              <h1 className="font-display-5xl">{item.title}</h1>
              <div className="flex gap-2 mt-4">
                <Tags type="condition" label={item.condition} />
                <Tags type="category" label={item.category} />
                {item.tags.map(tag => (
                  <Tags key={tag} type="genre" label={tag} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 mt-10 mb-20">
              <p>{item.description}</p>
            </div>

            {isOwner && (
              <div>
                <div>
                  <h1 className="font-display-2xl">Requests</h1>
                  <hr className="text-stroke-strong mx-[-20px] mt-2"></hr>
                </div>

                <div className="mt-4">
                  <div className="flex flex-col gap-4">
                    {filteredLendingRequests.length > 0
                      ? (
                          filteredLendingRequests.map(request => (
                            <Fragment key={request.id}>
                              <BorrowRequestItemDetails {...request} />
                              <hr className="mx-[-12px] text-stroke-weak"></hr>
                            </Fragment>
                          ))
                        )
                      : (
                          <p className="text-stroke-strong">
                            This item has no borrow requests.
                          </p>
                        )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {isOwner
            ? (
                <div className="">
                  <div className="flex flex-row items-center gap-4">
                    <button
                      type="button"
                      className="font-sans-lg-upper flex justify-center items-center gap-2 py-3 w-full max-w-[400px] bg-red text-white rounded-md cursor-pointer"
                      onClick={handleDelete}
                    >
                      <Icon icon="heroicons:trash" className="text-2xl" />
                      <span>Delete</span>
                    </button>
                    {/* <button
                      type="button"
                      className="font-sans-lg-upper flex justify-center items-center gap-2 py-3 w-full max-w-[400px] bg-lavender-500 text-white rounded-md"
                    >
                  <Icon icon="heroicons:pencil-square" className="text-2xl" />
                      <span>Edit</span>
                </button> */}
                  </div>
                </div>
              )
            : (
                <div className="">
                  <div className="flex flex-row items-center gap-4">
                    <button
                      type="button"
                      className="font-sans-lg-upper flex justify-center items-center gap-2 py-3 w-full max-w-[400px] bg-lavender-500 text-white rounded-md cursor-pointer"
                      onClick={openModal}
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
              )}
        </div>
        {isModalOpen && <CheckOutModal item={item} onCancel={closeModal} />}
      </div>
    </div>
  )
}

export default DetailPage
