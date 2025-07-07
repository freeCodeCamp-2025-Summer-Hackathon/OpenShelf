import { createBrowserRouter } from 'react-router'
import RegisterPage from '../features/auth/components/RegisterPage'
import LoginPage from '../features/auth/components/LoginPage'

export const router = createBrowserRouter([
  { path: '/', element: <div>Hello World!</div> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
