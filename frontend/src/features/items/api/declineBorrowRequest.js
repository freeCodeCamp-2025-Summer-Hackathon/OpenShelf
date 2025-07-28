import { api } from '../../../app/api'

export function declineBorrowRequest(request_id) {
  return api.post(`borrow-requests/${request_id}/decline/`)
}
