import { combineReducers } from 'redux';
import fetchMerchReducer from './fetchMerchReducer';
import fetchUniqueMerchReducer from './fetchUniqueMerchReducer';
import CartReducers from './CartReducers';

export default combineReducers({
  data: fetchMerchReducer,
  card: fetchUniqueMerchReducer,
  shoppingCart: CartReducers
})

