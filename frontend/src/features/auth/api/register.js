import { api } from '../../../app/api'

export function register({ name, email, password, passwordConfirm, phoneNum, address }) {
  return api.post('users/register/', {
    name,
    email,
    password,
    password_confirm: passwordConfirm,
    phone_num: phoneNum,
    address,
  })
}
