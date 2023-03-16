import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../reducers/userReducer'
import searchReducer from '../reducers/searchReducer.js'
import {cartReducer} from '../reducers/cartReducer.js'
import { couponReducer } from '../reducers/couponReducer.js'
export const store = configureStore({
    reducer: {
      user :userReducer,
      search:searchReducer,
      cart:cartReducer,
      coupon: couponReducer,
    },
  })