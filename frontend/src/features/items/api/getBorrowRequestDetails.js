import { api } from '../../../app/api'

export function getBorrowRequestDetails(request_id) {
  return api.get(`borrow-requests/${request_id}/`)
}
