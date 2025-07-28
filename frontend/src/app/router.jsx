import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import { catalogueLoader } from '../features/items/loaders/cataloguePageLoader'
import { detailPageLoader } from '../features/items/loaders/detailPageLoader'
import { homePageLoader } from '../features/items/loaders/homePageLoader'
import { inboxPageLoader } from '../features/items/loaders/inboxPageLoader'
import CataloguePage from '../features/items/pages/CataloguePage'
import CreatePage from '../features/items/pages/CreatePage'
import DetailPage from '../features/items/pages/DetailPage'
import HomePage from '../features/items/pages/HomePage'
import InboxPage from '../features/items/pages/InboxPage'
import AppLayout from '../layouts/AppLayout'
import { appLayoutLoader } from '../loader/appLayoutLoader'

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
      {
        path: 'items/:itemId',
        loader: detailPageLoader,
        element: <DetailPage />,
      },
      { path: 'inbox', loader: inboxPageLoader, element: <InboxPage /> },
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
