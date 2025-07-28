export function getImageUrl(imagePath) {
  if (!imagePath)
    return ''
  if (imagePath.startsWith('http'))
    return imagePath

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  return imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`
}

export function getImageUrls(imagePaths) {
  if (!Array.isArray(imagePaths))
    return []
  return imagePaths.map(getImageUrl)
}
