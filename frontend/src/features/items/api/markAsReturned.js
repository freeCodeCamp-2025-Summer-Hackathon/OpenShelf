import { api } from '../../../app/api'

export function markAsReturned(request_id) {
  return api.post(`borrow-requests/${request_id}/returned/`)
}
