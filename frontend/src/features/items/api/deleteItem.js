import { api } from '../../../app/api'

export function deleteItem(item_id) {
  return api.delete(`items/${item_id}/delete`)
}
