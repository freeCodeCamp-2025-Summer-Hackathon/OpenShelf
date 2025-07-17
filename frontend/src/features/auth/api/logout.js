import { api } from '../../../app/api'

export function logout() {
  return api.post('users/logout/')
}
