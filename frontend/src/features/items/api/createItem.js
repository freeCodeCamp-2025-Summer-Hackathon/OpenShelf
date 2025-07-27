import { api } from '../../../app/api'

export function createItem({ title, description, category, condition, image_urls, tags }) {
  return api.post('items/create/', {
    title,
    description,
    category,
    condition,
    image_urls,
    tags,
    "number_of_items": 1,
    "is_available": true
  })
}
