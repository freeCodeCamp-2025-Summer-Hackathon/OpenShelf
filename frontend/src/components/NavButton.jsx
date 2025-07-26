import { Icon } from '@iconify-icon/react'
import { Link } from 'react-router'

export default function NavButton({ to, icon, info }) {
  return (
    <div className="relative">
      <Link
        to={`/${to}`}
        className="size-9 hover:bg-[#0000000d] rounded flex justify-center items-center cursor-pointer peer"
      >
        <Icon icon={`heroicons:${icon}`} className="text-2xl" />
      </Link>
      <div
        className="rounded border-1 border-stroke-weak px-[5px] bg-white text-center text-sm absolute left-1/2 transform -translate-x-1/2 top-full mt-2 shadow-2xs peer-hover:opacity-100 opacity-0 transition-opacity text-stroke-strong text-nowrap"
      >
        {info}
      </div>
    </div>
  )
}
