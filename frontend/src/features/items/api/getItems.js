import { api } from '../../../app/api'

export function getItems() {
  return api.get('items/')
}
