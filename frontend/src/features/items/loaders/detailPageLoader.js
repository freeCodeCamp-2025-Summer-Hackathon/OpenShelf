import { getProfile } from '../../profile/api/getProfile'
import { getItemDetails } from '../api/getItemDetails'

export async function detailPageLoader({ params }) {
  const [itemResponse, profileResponse] = await Promise.all([
    getItemDetails(params.itemId),
    getProfile(),
  ])
  return {
    item: itemResponse.data,
    profile: profileResponse.status === 403 ? null : profileResponse.data,
  }
}
