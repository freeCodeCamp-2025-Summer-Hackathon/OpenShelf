import { Link } from 'react-router'
import { getImageUrl } from '../../../utils/imageUtils'

export default function Item({ item }) {
  return (
    <Link to={`/items/${item.id}`} className="flex">
      <div className="w-36 flex flex-col gap-2">
        <img
          src={item.image_urls.length > 0 ? getImageUrl(item.image_urls[0]) : 'grayBook.png'}
          className="w-full h-48 object-cover rounded-xl border-1 border-stroke-weak"
        />
        <div>
          <p className="font-semibold">{item.title}</p>
          <div className="flex flex-row justify-between items-center">
            {item.is_available && (
              <p className="text-stroke-strong">Available</p>
            )}
            {/* <p className="text-lavender-500">$40</p> */}
          </div>
        </div>
        <p>
          by
          {' '}
          <i>{item.owner.name}</i>
        </p>
      </div>
    </Link>
  )
}
