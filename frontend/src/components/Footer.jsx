import { Link } from 'react-router'
import { Icon } from '@iconify-icon/react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/OpenShelf.png" width="120" alt="OpenShelf" className="brightness-0 invert" />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A community-driven digital lending library for books, tools, and games. 
              Share what you have, borrow what you need.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Icon icon="mdi:facebook" className="text-2xl" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Icon icon="mdi:twitter" className="text-2xl" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Icon icon="mdi:instagram" className="text-2xl" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Icon icon="mdi:github" className="text-2xl" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="text-gray-300 hover:text-white transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-300 hover:text-white transition-colors">
                  Add Item
                </Link>
              </li>
              <li>
                <Link to="/inbox" className="text-gray-300 hover:text-white transition-colors">
                  Inbox
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Community Guidelines
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Safety Tips
                </button>
              </li>
              <li>
                <button className="text-gray-300 hover:text-white transition-colors text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 OpenShelf. Part of the freeCodeCamp 2025 Summer Hackathon by Team Lavender.
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
