// src/features/profile/api/getUserItems.js
import { api } from '../../../app/api'

export async function getUserItems() {
  try {
    const response = await api.get('items/my-items/')

    // Successful response
    if (response.status === 200) {
      return {
        status: response.status,
        data: response.data,
      }
    }

    // Handle unexpected successful status codes
    return {
      status: response.status,
      data: null,
      error: 'Unexpected response status',
    }
  }
  catch (error) {
    // Handle 403 (unauthorized user) - not logged in
    if (error?.response?.status === 403) {
      return {
        status: 403,
        data: null,
        error: 'You must be logged in to view your items',
      }
    }

    // Handle 401 (unauthorized user) - invalid credentials
    if (error?.response?.status === 401) {
      return {
        status: 401,
        data: null,
        error: 'Authentication error',
      }
    }

    // Handle network errors or other issues
    if (!error?.response) {
      console.error('Network error in getUserItems:', error)
      return {
        status: 500,
        data: null,
        error: 'Network error',
      }
    }

    // Handle all other HTTP errors
    console.error('getUserItems error:', error)
    return {
      status: error.response.status || 500,
      data: null,
      error: error?.response?.data?.message || error?.message || 'Unexpected error',
    }
  }
}
