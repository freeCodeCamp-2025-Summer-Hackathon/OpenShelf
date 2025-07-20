import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import { Link, NavLink, useRevalidator } from 'react-router-dom'
import { logout } from '../features/auth/api/logout'
import SearchBar from './SearchBar'

export default function Navbar({ profile }) {
  const profileAvatar = profile && `https://eu.ui-avatars.com/api/?name=${profile.name}&size=48`
  const revalidator = useRevalidator()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    revalidator.revalidate()
  }

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm border-b border-gray-200 transition-all duration-300">
      <div className="py-2 sm:py-2.5 px-3 sm:px-5 md:px-8 flex flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand - positioned to the left */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group">
            <img src="/OpenShelf.png" alt="OpenShelf logo" className="h-9 sm:h-10 max-w-[120px] sm:max-w-[160px] transition-transform duration-300 group-hover:scale-105" />
            <span className="text-gray-800 font-bold text-lg ml-1 hidden xs:block transition-colors duration-300 group-hover:text-[#5e60ce]">OpenShelf</span>
          </Link>
        </div>
        
        {/* Desktop Navigation and Search - with centered search bar */}
        <div className="hidden md:flex flex-1 items-center justify-center mx-6">
          {/* Navigation Links - positioned to the left of search */}
          <div className="flex items-center space-x-8 mr-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2.5 text-base font-medium transition-all duration-300 ${isActive
                  ? 'border-b-2 border-[#5e60ce] text-[#5e60ce] font-semibold'
                  : 'text-gray-700 hover:text-[#5e60ce] hover:border-b-2 hover:border-[#5e60ce]/30'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/listings"
              className={({ isActive }) =>
                `px-3 py-2.5 text-base font-medium transition-all duration-300 ${isActive
                  ? 'border-b-2 border-[#5e60ce] text-[#5e60ce] font-semibold'
                  : 'text-gray-700 hover:text-[#5e60ce] hover:border-b-2 hover:border-[#5e60ce]/30'}`
              }
            >
              Listings
            </NavLink>
          </div>
          
          {/* Search Bar - centered and wider */}
          <div className="flex-1 max-w-md">
            <SearchBar className="w-full" />
          </div>
        </div>
        
        {/* Small screens navigation - only show links */}
        <div className="md:hidden sm:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
                ? 'border-b-2 border-lavender-600 text-lavender-800 font-semibold'
                : 'text-gray-700 hover:text-lavender-600'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/listings"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
                ? 'border-b-2 border-lavender-600 text-lavender-800 font-semibold'
                : 'text-gray-700 hover:text-lavender-600'}`
            }
          >
            Listings
          </NavLink>
        </div>

        {/* Right Side: Profile or Auth Buttons */}
        <div className="flex flex-row items-center gap-2 sm:gap-3">
          {/* Mobile menu button */}
          <button
            type="button"
            className="sm:hidden text-lavender-800 p-2 rounded-md hover:bg-lavender-50 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Icon icon={mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'} className="text-2xl transition-transform duration-300" />
          </button>
          
          {profile ? (
            <div className="flex items-center">
              <div className="group relative">
                <Link to="/profile">
                  <div className="relative overflow-hidden rounded-full transform transition-all duration-300 hover:scale-105">
                    <img
                      src={profileAvatar}
                      className="rounded-full w-10 h-10 border-2 border-[#5e60ce] bg-white"
                      alt={profile.name}
                    />
                    <div className="absolute inset-0 bg-transparent group-hover:border-2 group-hover:border-[#5e60ce]/50 transition-all duration-300 rounded-full"></div>
                  </div>
                </Link>
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 transform opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-[#5e60ce]">{profile.name}</p>
                    <p className="text-sm text-gray-500 truncate">{profile.email}</p>
                  </div>
                  <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                    <Icon icon="heroicons:user-circle" className="mr-2 text-[#5e60ce]" />
                    <span>Profile</span>
                  </Link>
                  <Link to="/profile/items" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                    <Icon icon="heroicons:book-open" className="mr-2 text-[#5e60ce]" />
                    <span>My Items</span>
                  </Link>
                  <Link to="/profile/requests" className="flex items-center px-4 py-2 hover:bg-gray-50 transition-colors duration-150">
                    <Icon icon="heroicons:clipboard-document-check" className="mr-2 text-[#5e60ce]" />
                    <span>Borrow Requests</span>
                  </Link>
                  <hr className="my-1" />
                  <button
                    type="button"
                    className="flex w-full items-center text-left px-4 py-2 hover:bg-red-50 text-red-600 transition-colors duration-150"
                    onClick={handleLogout}
                  >
                    <Icon icon="heroicons:arrow-right-on-rectangle" className="mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-3">
              <Link
                to="/login"
                className="flex items-center justify-center text-white font-medium px-5 py-2 rounded-lg bg-[#5e60ce] hover:bg-[#4e50be] transition-all duration-200 shadow-md hover:shadow-lg min-w-[90px] text-center"
              >
                <span>Log in</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center bg-[#5e60ce] text-white px-5 py-2 rounded-lg hover:bg-[#4e50be] transition-all duration-200 shadow-md hover:shadow-lg font-medium min-w-[90px] text-center"
              >
                <span>Sign up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`
          sm:hidden bg-white shadow-lg border-t border-lavender-100
          transform transition-all duration-300 ease-in-out origin-top
          ${mobileMenuOpen ? 'opacity-100 scale-y-100 py-5 px-4' : 'opacity-0 scale-y-0 h-0 py-0 px-4 overflow-hidden'}
        `}
      >
        {/* Login/Signup Buttons for Mobile - Shown at the top of the menu */}
        {!profile && (
          <div className="mb-6 flex flex-col gap-4">
            <Link
              to="/login"
              className="px-5 py-3 rounded-lg text-white font-medium bg-[#5e60ce] hover:bg-[#4e50be] transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Log in to your account</span>
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center bg-[#5e60ce] text-white px-5 py-3 rounded-lg hover:bg-[#4e50be] transition-all duration-200 shadow-md hover:shadow-lg font-medium w-full"
            >
              <span>Create an account</span>
            </Link>
          </div>
        )}
        
        <div className="mb-4">
          <SearchBar />
        </div>
        
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 mt-2">
          <NavLink
            to="/"
            className={({ isActive }) => `px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${isActive ? 'bg-lavender-100 text-lavender-800 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon icon="heroicons:home" className="mr-3 text-xl text-lavender-600" />
            <span className="font-medium">Home</span>
          </NavLink>
          
          <NavLink
            to="/listings"
            className={({ isActive }) => `px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${isActive ? 'bg-lavender-100 text-lavender-800 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Icon icon="heroicons:squares-2x2" className="mr-3 text-xl text-lavender-600" />
            <span className="font-medium">Browse Listings</span>
          </NavLink>
          
          {profile && (
            <>
              <div className="h-px bg-gray-200 my-3"></div>
              <Link
                to="/profile"
                className="px-4 py-3 rounded-lg flex items-center hover:bg-lavender-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon icon="heroicons:user-circle" className="mr-3 text-xl text-lavender-600" />
                <span className="font-medium">My Profile</span>
              </Link>
              <Link
                to="/profile/items"
                className="px-4 py-3 rounded-lg flex items-center hover:bg-lavender-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon icon="heroicons:book-open" className="mr-3 text-xl text-lavender-600" />
                <span className="font-medium">My Items</span>
              </Link>
              <button
                type="button"
                className="mt-2 px-4 py-3 rounded-lg text-red-600 flex items-center hover:bg-red-50 text-left w-full border border-red-200"
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
              >
                <Icon icon="heroicons:arrow-right-on-rectangle" className="mr-3 text-xl" />
                <span className="font-medium">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}