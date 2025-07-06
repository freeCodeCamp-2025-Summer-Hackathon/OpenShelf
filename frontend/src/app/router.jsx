import { createBrowserRouter } from 'react-router'
import RegisterPage from '../features/auth/components/RegisterPage'

export const router = createBrowserRouter([
  { path: '/', element: <div>Hello World!</div> },
  { path: '/register', element: <RegisterPage /> },
])
