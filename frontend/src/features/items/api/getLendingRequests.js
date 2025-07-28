import { api } from '../../../app/api'

export function getLendingRequests() {
  return api.get(`borrow-requests/my-lending/`)
}
