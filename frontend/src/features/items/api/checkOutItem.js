import { api } from '../../../app/api'

export function checkOutItem({ item_id, expected_return_date, notes }) {
  return api.post('borrow-requests/create/', {
    item_id,
    expected_return_date,
    notes,
  })
}
