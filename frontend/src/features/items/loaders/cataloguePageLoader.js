import { getItems } from '../api/getItems'

export async function catalogueLoader() {
  const items = await getItems()
  return { items }
}
