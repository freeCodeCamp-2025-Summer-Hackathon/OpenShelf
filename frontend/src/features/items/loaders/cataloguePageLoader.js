import { getItems } from '../api/getItems'
import { searchItems } from '../api/searchItems'

export async function catalogueLoader({ request }) {
  const url = new URL(request.url)
  const category = url.searchParams.get('category')
  const query = url.searchParams.get('q')
  
  let items
  if (category || query) {
    items = await searchItems({ query, category })
  } else {
    items = await getItems()
  }
  
  return { items, currentCategory: category, currentQuery: query }
}
