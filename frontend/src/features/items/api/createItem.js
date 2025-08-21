import { api } from '../../../app/api'

export async function createItem({ title, description, category, condition, image_urls, tags }) {
  try {
    return await api.post('items/create/', {
      title,
      description,
      category,
      condition,
      image_urls,
      tags,
      number_of_items: 1,
      is_available: true,
    })
  } catch (error) {
    console.error('CreateItem API error:', error)
    console.error('Error response:', error.response?.data)
    throw error
  }
}
