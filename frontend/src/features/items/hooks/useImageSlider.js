import { useState } from 'react'

export default function useImageSlider(images) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const showImage = (index) => {
    setCurrentIndex(index)
  }

  return { currentIndex, prevImage, nextImage, showImage }
}
