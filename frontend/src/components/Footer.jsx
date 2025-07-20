import { Icon } from '@iconify-icon/react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-lavender-50 border-t border-lavender-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-lavender-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-lavender-800 mb-3">Stay Connected</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for community updates, new features, and sharing tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-lg border border-lavender-200 focus:outline-none focus:ring-2 focus:ring-lavender-500 flex-grow"
                required
              />
              <button
                type="submit"
                className="bg-lavender-600 text-white px-6 py-3 rounded-lg hover:bg-lavender-700 transition-all duration-200 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="OpenShelf Logo" className="h-10" />
              <span className="ml-2 font-display-lg text-lavender-800">OpenShelf</span>
            </Link>
            <p className="mt-4 text-gray-600">
              A community platform for sharing books, tools, and other items with neighbors.
              Borrow what you need, lend what you don't use.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com" className="text-lavender-700 hover:text-lavender-900 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <Icon icon="fa-brands:twitter" className="h-6 w-6" />
              </a>
              <a href="https://facebook.com" className="text-lavender-700 hover:text-lavender-900 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <Icon icon="fa-brands:facebook" className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-lavender-700 hover:text-lavender-900 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <Icon icon="fa-brands:instagram" className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-display-md text-gray-800 font-semibold mb-4">Explore</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/listings" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">Browse Items</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">Search</Link>
              </li>
              <li>
                <Link to="/add-item" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">Add Item</Link>
              </li>
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="font-display-md text-gray-800 font-semibold mb-4">Account</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">Register</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">My Profile</Link>
              </li>
              <li>
                <Link to="/profile/items" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">My Items</Link>
              </li>
              <li>
                <Link to="/profile/requests" className="text-gray-600 hover:text-lavender-800 transition-colors duration-200">My Requests</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 border-t border-lavender-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            OpenShelf. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-lavender-800 transition-colors duration-200">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-lavender-800 transition-colors duration-200">Terms of Service</Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-lavender-800 transition-colors duration-200">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
