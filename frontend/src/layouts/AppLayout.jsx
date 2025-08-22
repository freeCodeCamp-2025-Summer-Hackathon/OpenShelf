import { useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AppLayout() {
  const { profile } = useLoaderData()
  const [navHeight, setNavHeight] = useState(0)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar profile={profile} onHeightChange={setNavHeight} />
      <main className="flex-grow" style={{ paddingTop: `${navHeight}px` }}>
        <Outlet context={{ navHeight }} />
      </main>
      <Footer />
    </div>
  )
}
