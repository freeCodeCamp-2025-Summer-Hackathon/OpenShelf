import { Link } from 'react-router'

export default function FeaturedItem({ item }) {
  return (
    <Link to={`/items/${item.id}`}>
      <div className="w-36 flex flex-col gap-2">
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
        <p>
          {item.owner.name}
        </p>
      </div>
    </Link>
  )
}
