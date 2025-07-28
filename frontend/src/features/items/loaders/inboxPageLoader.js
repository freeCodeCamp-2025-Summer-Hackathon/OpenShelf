import { getBorrowRequests } from '../api/getBorrowRequests'
import { getLendingRequests } from '../api/getLendingRequests'

export async function inboxPageLoader() {
  const [lendingResponse, borrowResponse] = await Promise.all([
    getLendingRequests(),
    getBorrowRequests(),
  ])
  return {
    lendingRequests: lendingResponse.status === 200 ? lendingResponse.data : null,
    borrowRequests: borrowResponse.status === 200 ? borrowResponse.data : null,
  }
}
