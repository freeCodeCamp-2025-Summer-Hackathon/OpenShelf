import { api } from '../../../app/api'

export async function uploadImages(images) {
  const formData = new FormData()
  
  // Add all images to FormData
  images.forEach((image) => {
    formData.append('images', image)
  })
  
  try {
    const response = await api.post('items/upload-images/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to upload images')
  }
}
