import { getProfile } from '../api/getProfile'

export async function profilePageLoader() {
  const response = await getProfile()
  
  if (response.status === 403) {
    // User is not authenticated, redirect to login
    throw new Response('Unauthorized', { status: 401 })
  }
  
  if (response.status !== 200) {
    throw new Response('Failed to load profile', { status: response.status })
  }
  
  return { profile: response.data }
}
