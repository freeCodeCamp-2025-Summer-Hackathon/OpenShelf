import { createBrowserRouter } from 'react-router-dom'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import DetailPage from '../features/items/pages/DetailPage'
import HomePage, { homePageLoader } from '../features/items/pages/HomePage'
import ListingsPage, { listingsPageLoader } from '../features/items/pages/ListingsPage'
import SearchPage, { searchPageLoader } from '../features/items/pages/SearchPage'
import AddItemPage from '../features/items/pages/AddItemPage'
import ProfilePage, { profileLoader } from '../features/profile/pages/ProfilePage'
import UserItemsPage, { userItemsLoader } from '../features/profile/pages/UserItemsPage'
import RequestsPage, { requestsLoader } from '../features/profile/pages/RequestsPage'
import ErrorBoundary from '../components/ErrorBoundary'
import AppLayout, { appLayoutLoader } from '../layouts/AppLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    loader: appLayoutLoader,
    Component: AppLayout,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homePageLoader,
      },
      {
        path: 'listings',
        element: <ListingsPage />,
        loader: listingsPageLoader,
      },
      {
        path: 'search',
        element: <SearchPage />,
        loader: searchPageLoader,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: 'profile/items',
        element: <UserItemsPage />,
        loader: userItemsLoader,
      },
      {
        path: 'profile/requests',
        element: <RequestsPage />,
        loader: requestsLoader,
      },
      {
        path: 'item/:itemId',
        element: <DetailPage />
      },
      {
        path: 'add-item',
        element: <AddItemPage />
      },
    ],
  },
  { 
    path: '/register', 
    element: <RegisterPage />,
    errorElement: <ErrorBoundary />
  },
  { 
    path: '/login', 
    element: <LoginPage />,
    errorElement: <ErrorBoundary /> 
  },
])
