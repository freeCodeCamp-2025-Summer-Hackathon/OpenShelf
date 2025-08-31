import { getMyItems } from '../api/getMyItems'

export async function myListingsLoader() {
  const items = await getMyItems()
  return { items }
}
