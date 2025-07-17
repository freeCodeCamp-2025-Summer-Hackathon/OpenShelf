import { api } from '../../../app/api'

export function login({ email, password }) {
  return api.post('users/login/', {
    email,
    password,
  })
}
