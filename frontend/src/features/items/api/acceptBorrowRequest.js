import { api } from '../../../app/api'

export function acceptBorrowRequest(request_id) {
  return api.post(`borrow-requests/${request_id}/accept/`)
}
