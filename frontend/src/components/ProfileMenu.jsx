// src/components/ProfileMenu.jsx
import { NavLink } from 'react-router-dom'

export default function ProfileMenu() {
  const linkClassNames = ({ isActive }) =>
    isActive
      ? 'block px-4 py-2 bg-lavender-100 text-lavender-800 rounded-lg font-medium'
      : 'block px-4 py-2 text-stroke-strong hover:bg-lavender-50 rounded-lg'

  return (
    <div className="bg-white border border-stroke-weak rounded-lg p-4">
      <h2 className="font-display-xl mb-4 px-4">Profile</h2>
      <nav className="flex flex-col gap-1">
        <NavLink
          to="/profile"
          className={linkClassNames}
          end
        >
          My Account
        </NavLink>
        <NavLink
          to="/profile/items"
          className={linkClassNames}
        >
          My Items
        </NavLink>
        <NavLink
          to="/profile/requests"
          className={linkClassNames}
        >
          Borrow Requests
        </NavLink>
        <NavLink
          to="/profile/settings"
          className={linkClassNames}
        >
          Settings
        </NavLink>
      </nav>
    </div>
  )
}
