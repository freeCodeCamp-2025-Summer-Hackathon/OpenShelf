import { api } from '../../../app/api'

export async function getProfile() {
  try {
    const response = await api.get('users/profile/')
    return response
  }
  catch (error) {
    if (error?.response?.status === 403) {
      return {
        status: 403,
        data: null,
      }
    }
  }
}
