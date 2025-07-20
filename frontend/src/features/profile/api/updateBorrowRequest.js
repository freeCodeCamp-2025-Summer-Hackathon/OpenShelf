// src/features/profile/api/updateBorrowRequest.js
import { api } from '../../../app/api'

export async function updateBorrowRequest(requestId, status) {
  try {
    const response = await api.patch(`borrow-requests/${requestId}/`, { status })

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
        error: 'You must be logged in to update borrow requests',
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

    // Handle 404 (not found)
    if (error?.response?.status === 404) {
      return {
        status: 404,
        data: null,
        error: 'Borrow request not found',
      }
    }

    // Handle network errors or other issues
    if (!error?.response) {
      console.error('Network error in updateBorrowRequest:', error)
      return {
        status: 500,
        data: null,
        error: 'Network error',
      }
    }

    // Handle all other HTTP errors
    console.error('updateBorrowRequest error:', error)
    return {
      status: error.response.status || 500,
      data: null,
      error: error?.response?.data?.message || error?.message || 'Unexpected error',
    }
  }
}
