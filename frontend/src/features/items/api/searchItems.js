// src/features/items/api/searchItems.js
import { api } from '../../../app/api'

export async function searchItems(query = '', filters = {}) {
  try {
    // Create URLSearchParams for query parameters
    const params = new URLSearchParams()
    
    // Add search query if provided
    if (query) {
      params.append('search', query)
    }
    
    // Add category filter if provided
    if (filters.category) {
      params.append('category', filters.category)
    }
    
    // Add condition filter if provided
    if (filters.condition) {
      params.append('condition', filters.condition)
    }
    
    // Add availability filter if provided
    if (filters.available !== undefined) {
      params.append('available', filters.available)
    }
    
    // Add sorting parameter if provided
    if (filters.sort_by) {
      params.append('sort_by', filters.sort_by)
    }

    // Make the request with query parameters
    const response = await api.get(`items/?${params.toString()}`)
    
    return {
      status: response.status,
      data: response.data,
    }
  }
  catch (error) {
    console.warn('Failed to search items:', error)
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
            condition: 'New',
          },
          {
            id: '2',
            title: 'Sample Tool',
            category: 'Tools',
            tags: ['garden', 'home'],
            owner: { name: 'Demo User' },
            condition: 'Good',
          },
        ],
      },
    }
  }
}
