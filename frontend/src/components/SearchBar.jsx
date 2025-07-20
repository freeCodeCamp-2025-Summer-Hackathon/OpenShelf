// src/components/SearchBar.jsx
import { Icon } from '@iconify-icon/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ size = 'normal', className = '' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }
  
  return (
    <form onSubmit={handleSearch} className={`flex items-center ${className}`}>
      <div className={`relative flex items-center w-full ${size === 'large' ? 'max-w-2xl' : 'max-w-full'}`}>
        <input
          type="text"
          placeholder={size === 'large' ? 'Search for books, tools, games...' : 'Search...'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`
            w-full pl-3 pr-8 border border-gray-300 rounded-lg
            focus:outline-none focus:ring-1 focus:ring-[#5e60ce] focus:border-[#5e60ce]
            bg-white shadow-sm transition-all duration-300 ease-in-out
            hover:border-gray-400
            ${size === 'large' ? 'text-base py-2.5' : 'text-sm py-2'}
          `}
        />
        <button
          type="submit"
          className="absolute right-2 text-gray-500 hover:text-[#5e60ce] transition-all duration-300 transform hover:scale-110"
          aria-label="Search"
        >
          <Icon icon="heroicons:magnifying-glass" className={size === 'large' ? 'text-xl' : 'text-sm'} />
        </button>
      </div>
    </form>
  )
}
