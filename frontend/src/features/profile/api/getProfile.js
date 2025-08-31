import { api } from '../../../app/api'

export async function getProfile() {
  try {
    const response = await api.get('users/profile/')
    return response
  } catch (error) {
    // Handle network errors (no response)
    if (!error.response) {
      return {
        status: 500,
        data: null,
        error: 'Network Error'
      }
    }
    
    // Handle HTTP errors with response
    if (error?.response?.status === 403) {
      return {
        status: 403,
        data: null,
      }
    }
    
    // Always return an object for other errors
    return {
      status: error?.response?.status || 500,
      data: null,
    }
  }
}
