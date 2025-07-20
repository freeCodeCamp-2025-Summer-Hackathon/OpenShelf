import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import CataloguePage, { catalogueLoader } from '../features/items/pages/CataloguePage'
import HomePage, { homePageLoader } from '../features/items/pages/HomePage'
import AppLayout, { appLayoutLoader } from '../layouts/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    loader: appLayoutLoader,
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: 'catalogue',
        element: <CataloguePage />,
        loader: catalogueLoader,
      },
    ],
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
