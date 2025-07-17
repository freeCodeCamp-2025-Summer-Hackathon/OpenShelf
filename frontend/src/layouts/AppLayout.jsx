import { Outlet, useLoaderData } from 'react-router'
import Navbar from '../components/Navbar'
import { getProfile } from '../features/profile/api/getProfile'

export async function appLayoutLoader() {
  const response = await getProfile()

  if (response.status === 403) {
    return { profile: null }
  }

  return { profile: response.data }
}

export default function AppLayout() {
  const { profile } = useLoaderData()

  return (
    <div>
      <Navbar profile={profile} />
      <Outlet />
    </div>
  )
}
