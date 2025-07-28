import { useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import Navbar from '../components/Navbar'

export default function AppLayout() {
  const { profile } = useLoaderData()
  const [navHeight, setNavHeight] = useState(0)

  return (
    <div>
      <Navbar profile={profile} onHeightChange={setNavHeight} />
      <Outlet context={{ navHeight }} />
    </div>
  )
}
