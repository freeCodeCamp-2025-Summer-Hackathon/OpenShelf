import { getLendingRequests } from "../api/getLendingRequests"
import { getBorrowRequests } from "../api/getBorrowRequests"

export async function inboxPageLoader() {
    const [lendingResponse, borrowResponse] = await Promise.all([
        getLendingRequests(),
        getBorrowRequests()
    ])
    return {
        lendingRequests: lendingResponse.data,
        borrowRequests: borrowResponse.data
    }
}