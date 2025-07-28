import { Outlet, useLoaderData } from 'react-router'
import Navbar from '../components/Navbar'

export default function AppLayout() {
  const { profile } = useLoaderData()

  return (
    <div>
      <Navbar profile={profile} />
      <Outlet />
    </div>
  )
}
