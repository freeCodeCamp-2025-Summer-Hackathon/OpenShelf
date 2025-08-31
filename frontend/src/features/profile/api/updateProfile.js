import { api } from '../../../app/api'

export async function updateProfile(profileData) {
  try {
    const response = await api.put('users/profile/', profileData)
    return response
  } catch (error) {
    if (error.response) {
      return error.response
    }
    throw error
  }
}
