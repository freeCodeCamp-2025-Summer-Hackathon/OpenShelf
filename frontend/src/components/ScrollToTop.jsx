import { Icon } from '@iconify-icon/react'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    }
    else {
      setIsVisible(false)
    }
  }

  // Set the top coordinate to 0
  // Make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="bg-lavender-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-lavender-700 hover:scale-105"
          aria-label="Scroll to top"
        >
          <Icon icon="heroicons:arrow-up" className="text-xl" />
        </button>
      )}
    </div>
  )
}
