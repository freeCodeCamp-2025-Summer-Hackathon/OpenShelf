import { api } from '../../../app/api'
import { getItemDetails } from './getItemDetails'

export async function getItems() {
  const itemsConfig = await api.get('items/')
  const items = itemsConfig.data.results

  return await Promise.all(
    items.map(async (item) => {
      const config = await getItemDetails(item.id)
      return config.data
    }),
  )
}
