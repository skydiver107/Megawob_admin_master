import { lazy } from 'react'

const Settings = lazy(() => import('../../views/custom/settings'))
const Proudcts = lazy(() => import('../../views/custom/products'))
const Orders = lazy(() => import('../../views/custom/orders'))
const NFTs = lazy(() => import('../../views/custom/nfts'))
const Account = lazy(() => import('../../views/custom/account'))

const CustomRoutes = [
  {
    path: '/custom/settings',
    element: <Settings />
  },
  {
    path: '/custom/products',
    element: <Proudcts />
  },
  {
    path: '/custom/orders',
    element: <Orders />
  },
  {
    path: '/custom/nfts',
    element: <NFTs />
  },
  {
    path: '/custom/account',
    element: <Account />
  }
]

export default CustomRoutes
