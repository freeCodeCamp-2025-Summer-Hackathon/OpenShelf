import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/components/LoginPage'
import RegisterPage from '../features/auth/components/RegisterPage'
import HomePage from '../features/items/components/HomePage'
import AppLayout, { appLayoutLoader } from '../layouts/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    loader: appLayoutLoader,
    Component: AppLayout,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
