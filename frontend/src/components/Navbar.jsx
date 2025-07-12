import { Icon } from '@iconify-icon/react'
import { Link, NavLink } from 'react-router'

export default function Navbar() {
  return (
    <nav className="fixed w-full z-10">
      <div className="py-6 px-12 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-16 items-center">
          <img src="OpenShelf.png" width="150"></img>
          <div className="flex flex-row gap-8 items-center">
            <NavLink
              to="/"
              className={({ isActive }) => [
                isActive
                  ? 'border-b-1 border-b-black px-3 py-1'
                  : 'text-stroke-strong',
              ]}
            >
              Home
            </NavLink>
            <NavLink
              to="/placeholder"
              className={({ isActive }) => [
                isActive
                  ? 'border-b-1 border-b-black px-3 py-1'
                  : 'text-stroke-strong',
              ]}
            >
              Placeholder
            </NavLink>
          </div>
        </div>

        <div className="flex flex-row items-center gap-8">
          <div className="relative flex items-center">
            <input
              placeholder="Find the right item..."
              className="border-1 border-stroke-strong bg-[#d3d3f1a2] pl-4 pr-12 py-2 w-80 rounded-xl focus:outline-stroke-strong"
            />
            <button type="button" className="cursor-pointer">
              <Icon
                icon="heroicons:magnifying-glass"
                className="absolute right-3 text-xl -translate-y-1/2 top-1/2 bottom-0"
              />
            </button>
          </div>
          <Link to="/login">Login</Link>
          <Link to="/register">
            <button
              type="button"
              className="bg-lavender-800 text-white px-5 py-2 rounded-lg cursor-pointer"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
