import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/components/LoginPage'
import RegisterPage from '../features/auth/components/RegisterPage'

export const router = createBrowserRouter([
  { path: '/', element: <div>Hello World!</div> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
