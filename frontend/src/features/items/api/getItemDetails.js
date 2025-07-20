import { api } from '../../../app/api'

export async function getItemDetails(item_id) {
  try {
    const response = await api.get(`items/${item_id}`)
    return {
      status: response.status,
      data: response.data,
    }
  }
  catch (error) {
    console.warn(`Failed to fetch item details for ${item_id}, using mock data:`, error)
    // Return mock data when API is unavailable
    return {
      status: 200,
      data: {
        id: item_id,
        title: item_id === '1' ? 'Sample Book' : 'Sample Tool',
        category: item_id === '1' ? 'Books' : 'Tools',
        tags: item_id === '1' ? ['fiction', 'adventure'] : ['garden', 'home'],
        description: 'A sample item description for development purposes.',
        condition: 'New',
        owner: {
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
        },
        is_available: true,
        image_urls: ['/item-image-test.png'],
      },
    }
  }
}
