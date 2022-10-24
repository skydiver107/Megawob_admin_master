import { lazy } from 'react'

const Country = lazy(() => import('../../views/init/country'))

const InitDataRoutes = [
  {
    path: '/init/country',
    element: <Country />
  }
]

export default InitDataRoutes
