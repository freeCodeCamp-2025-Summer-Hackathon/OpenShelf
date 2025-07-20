import { api } from '../../../app/api'

export async function getItems() {
  try {
    const response = await api.get('items/')
    return {
      status: response.status,
      data: response.data,
    }
  }
  catch (error) {
    console.warn('Failed to fetch items, using mock data:', error)
    // Return mock data when API is unavailable
    return {
      status: 200,
      data: {
        results: [
          {
            id: '1',
            title: 'Sample Book',
            category: 'Books',
            tags: ['fiction', 'adventure'],
            owner: { name: 'Demo User' },
          },
          {
            id: '2',
            title: 'Sample Tool',
            category: 'Tools',
            tags: ['garden', 'home'],
            owner: { name: 'Demo User' },
          },
        ],
      },
    }
  }
}
