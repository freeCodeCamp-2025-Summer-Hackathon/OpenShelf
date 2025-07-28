import { getProfile } from '../features/profile/api/getProfile'

export async function appLayoutLoader() {
  const response = await getProfile()

  if (response.status === 403) {
    return { profile: null }
  }

  return { profile: response.data }
}
