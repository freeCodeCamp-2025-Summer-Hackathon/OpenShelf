import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/components/LoginPage'
import RegisterPage from '../features/auth/components/RegisterPage'
import HomePage from '../features/items/components/HomePage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
