import { api } from '../../../app/api'
import { getItemDetails } from './getItemDetails'

export async function searchItems({ query = '', category = '' } = {}) {
  try {
    const params = new URLSearchParams()
    if (query) params.append('q', query)
    if (category) params.append('category', category)
    
    console.log('Searching for category:', category)
    
    const config = await api.get(`items/search/?${params.toString()}`)
    
    // The search endpoint returns an array, not a paginated response
    const items = config.data
    console.log(`Found ${items.length} items for category: ${category}`)
    
    // Get detailed info for each item, similar to getItems
    return await Promise.all(
      items.map(async (item) => {
        try {
          const detailConfig = await getItemDetails(item.id)
          return detailConfig.data
        } catch (error) {
          console.warn(`Failed to get details for item ${item.id}, using basic data:`, error)
          // Return basic item data with owner name structure expected by components
          return {
            ...item,
            owner: {
              name: item.owner_name
            }
          }
        }
      }),
    )
  } catch (error) {
    console.error('Failed to search items:', error)
    return []
  }
}
