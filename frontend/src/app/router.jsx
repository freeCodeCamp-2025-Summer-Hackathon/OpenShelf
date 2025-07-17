import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/components/LoginPage'
import RegisterPage from '../features/auth/components/RegisterPage'
import HomePage from '../features/items/components/HomePage'
import { getItems } from '../features/items/api/getItems'
import { getItemDetails } from '../features/items/api/getItemDetails'

async function fetchItemDetails() {
  try {
    const config = await getItems()
    if (config.status !== 200) {
      throw new Error(config.request.responseText)
    }

    const responseJSON = JSON.parse(config.request.responseText)
    const items = responseJSON.results

    items.map(async (item) => {
      const config = await getItemDetails(item.id)
      if (config.status !== 200) {
        throw new Error(config.request.responseText)
      }

      const responseJSON = JSON.parse(config.request.responseText)
      return responseJSON
    })

    return items
  } catch (err) {
    console.error(err)
  }
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    loader: async () => {
      return { items: await fetchItemDetails() }
    },
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
