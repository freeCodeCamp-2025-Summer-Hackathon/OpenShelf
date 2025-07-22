import { getItemDetails } from '../api/getItemDetails'

export async function detailPageLoader({ params }) {
  const respond = await getItemDetails(params.itemId)
  return { item: respond.data }
}
