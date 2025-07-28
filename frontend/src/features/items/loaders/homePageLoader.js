import { getItems } from '../api/getItems'

export async function homePageLoader() {
  const items = await getItems()
  return { items }
}
