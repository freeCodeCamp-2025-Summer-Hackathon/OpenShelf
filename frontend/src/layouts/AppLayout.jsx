// src/layouts/AppLayout.jsx
import { Outlet, useLoaderData } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'
import { getProfile } from '../features/profile/api/getProfile'

// Safe loader for AppLayout
export async function appLayoutLoader() {
  try {
    const response = await getProfile()

    // Defensive check for unexpected responses
    if (!response || typeof response.status !== 'number') {
      console.error('Invalid response from getProfile:', response)
      return { profile: null }
    }

    // Handle successful response
    if (response.status === 200 && response.data) {
      return { profile: response.data }
    }

    // Handle 403 Forbidden (not logged in) or 401 Unauthorized
    if (response.status === 403 || response.status === 401) {
      return { profile: null }
    }

    // Handle other error statuses
    console.error('Profile fetch failed with status:', response.status, response.error)
    return { profile: null }
  }
  catch (error) {
    console.error('Loader error in AppLayout:', error)
    // Return null profile instead of throwing to allow the app to render
    return { profile: null }
  }
}

export default function AppLayout() {
  const { profile } = useLoaderData()

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar profile={profile} />
      <main className="flex-grow pt-16 sm:pt-20">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
