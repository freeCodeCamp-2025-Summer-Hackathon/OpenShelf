import { createBrowserRouter } from 'react-router'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import { catalogueLoader } from '../features/items/loaders/cataloguePageLoader'
import { detailPageLoader } from '../features/items/loaders/detailPageLoader'
import { homePageLoader } from '../features/items/loaders/homePageLoader'
import { inboxPageLoader } from '../features/items/loaders/inboxPageLoader'
import { myListingsLoader } from '../features/items/loaders/myListingsLoader'
import CataloguePage from '../features/items/pages/CataloguePage'
import CreatePage from '../features/items/pages/CreatePage'
import DetailPage from '../features/items/pages/DetailPage'
import HomePage from '../features/items/pages/HomePage'
import InboxPage from '../features/items/pages/InboxPage'
import MyListingsPage from '../features/items/pages/MyListingsPage'
import ProfilePage from '../features/profile/pages/ProfilePage'
import { profilePageLoader } from '../features/profile/loaders/profilePageLoader'
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
      {
        path: 'my-listings',
        element: <MyListingsPage />,
        loader: myListingsLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: profilePageLoader,
      },
    ],
  },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
])
