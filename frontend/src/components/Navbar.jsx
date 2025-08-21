import { useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useRevalidator } from 'react-router'
import { logout } from '../features/auth/api/logout'
import NavButton from './NavButton'

export default function Navbar({ profile, onHeightChange }) {
  const navigate = useNavigate()
  const profileAvatar
    = profile
      && `https://eu.ui-avatars.com/api/?name=${profile.name}&size=48&background=6565C9&color=fff`
  const revalidator = useRevalidator()
  const linkClassNames = ({ isActive }) =>
    isActive ? 'border-b-1 border-b-black px-3 py-1' : 'text-stroke-strong'

  const handleLogout = async () => {
    await logout()
    try {
      revalidator.revalidate()
    }
    catch (err) {
      console.error(err)
      navigate('/')
    }
  }

  const navRef = useRef(null)

  useEffect(() => {
    if (navRef.current) {
      onHeightChange(navRef.current.offsetHeight)
    }
  }, [onHeightChange])

  return (
    <nav ref={navRef} className="fixed w-full z-10">
      <div className="py-6 px-12 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-16 items-center">
          <Link to="/">
            <img src="/OpenShelf.png" width="150" className="cursor-pointer"></img>
          </Link>
          <div className="flex flex-row gap-8 items-center">
            <NavLink to="/" className={linkClassNames}>
              Home
            </NavLink>
            <NavLink to="/catalogue" className={linkClassNames}>
              Catalogue
            </NavLink>
            {profile && (
              <NavLink to="/my-listings" className={linkClassNames}>
                My Listings
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-8">
          {/* <div className="relative flex items-center">
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
          </div> */}

          {profile
            ? (
                <>
                  <NavButton to="inbox" icon="inbox" info="Inbox" />
                  <NavButton
                    to="create"
                    icon="plus-circle"
                    info="Create new item"
                  />
                  <Link to="/profile">
                    <img src={profileAvatar} className="rounded-full size-11 cursor-pointer hover:ring-2 hover:ring-lavender-300 transition-all" />
                  </Link>
                  <button
                    type="button"
                    className="bg-lavender-800 text-white px-5 py-2 rounded-lg cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )
            : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">
                    <button
                      type="button"
                      className="bg-lavender-800 text-white px-5 py-2 rounded-lg cursor-pointer"
                    >
                      Sign up
                    </button>
                  </Link>
                </>
              )}
        </div>
      </div>
    </nav>
  )
}
