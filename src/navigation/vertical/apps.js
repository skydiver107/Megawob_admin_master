// ** Icons Import
import { Settings, Package, Droplet, Image } from 'react-feather'

export default [
  {
    header: 'Apps'
  },
  {
    id: 'products',
    title: 'Products',
    icon: <Package size={20} />,
    navLink: '/custom/products'
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: <Droplet size={20} />,
    navLink: '/custom/orders'
  },
  {
    id: 'nfts',
    title: 'NFTs',
    icon: <Image size={20} />,
    navLink: '/custom/nfts'
  }
  // ,
  // {
  //   id: 'settings',
  //   title: 'Settings',
  //   icon: <Settings size={20} />,
  //   navLink: '/custom/settings'
  // }
]
