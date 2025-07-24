import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import CreatePage from '../features/items/pages/CreatePage'
import DetailPage from '../features/items/pages/DetailPage'
import HomePage, { homePageLoader } from '../features/items/pages/HomePage'
import InboxPage from '../features/items/pages/InboxPage'
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
    ],
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/item/:itemId', element: <DetailPage /> },
  { path: '/inbox', element: <InboxPage /> },
  { path: '/create', element: <CreatePage /> },
])
