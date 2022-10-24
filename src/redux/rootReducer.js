// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import settings from '@src/views/custom/settings/store'
import products from '@src/views/custom/products/store'
import orders from '@src/views/custom/orders/store'
import nft from '@src/views/custom/nfts/store'
import country from '@src/views/init/country/store'


const rootReducer = {
  auth,
  settings,
  products,
  orders,
  nft,
  country,
  navbar,
  layout
}

export default rootReducer
