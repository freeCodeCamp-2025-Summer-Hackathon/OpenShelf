import { api } from '../../../app/api'

export function getItemDetails(item_id) {
  return api.get(`items/${item_id}`)
}
