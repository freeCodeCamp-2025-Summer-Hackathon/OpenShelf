import { api } from '../../../app/api'

export function getBorrowRequests() {
  return api.get(`borrow-requests/my-requests/`)
}
