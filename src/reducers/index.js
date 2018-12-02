import { combineReducers } from 'redux';
import fetchMerchReducer from './fetchMerchReducer';
import fetchUniqueMerchReducer from './fetchUniqueMerchReducer';
import addToCartReducer from './addToCartReducer';

export default combineReducers({
  data: fetchMerchReducer,
  card: fetchUniqueMerchReducer,
  total: addToCartReducer
})