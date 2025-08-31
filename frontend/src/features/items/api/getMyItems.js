import { api } from '../../../app/api'
import { getItemDetails } from './getItemDetails'

export async function getMyItems() {
  try {
    const itemsConfig = await api.get('items/my-items/')
    const items = itemsConfig.data.results

    // Try to get detailed info for each item, but fallback to basic data if it fails
    return await Promise.all(
      items.map(async (item) => {
        try {
          const config = await getItemDetails(item.id)
          return config.data
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
    console.error('Failed to fetch my items:', error)
    return []
  }
}
