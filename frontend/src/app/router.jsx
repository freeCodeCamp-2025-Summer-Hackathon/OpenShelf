import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import { detailPageLoader } from '../features/items/loaders/detailPageLoader'
import CreatePage from '../features/items/pages/CreatePage'
import DetailPage from '../features/items/pages/DetailPage'
import HomePage, { homePageLoader } from '../features/items/pages/HomePage'
import InboxPage from '../features/items/pages/InboxPage'
import { inboxPageLoader } from '../features/items/loaders/inboxPageLoader'
import AppLayout, { appLayoutLoader } from '../layouts/AppLayout'

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: appLayoutLoader,
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      { path: 'create', element: <CreatePage /> },
      { path: 'inbox', element: <InboxPage /> },
      {
        path: '/item/:itemId',
        loader: detailPageLoader,
        element: <DetailPage />,
      },
      { path: '/inbox',
        loader: inboxPageLoader,
        element: <InboxPage />
      },
    ],
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
