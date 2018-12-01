import { combineReducers } from 'redux';
import fetchMerchReducer from './fetchMerchReducer';
import fetchUniqueMerchReducer from './fetchUniqueMerchReducer';
import totalMerchReducer from './totalMerchReducer';
// import {fetchUniqueMerch} from '../actions/fetchUniqueMerchAction'

export default combineReducers({
  data: fetchMerchReducer,
  card: fetchUniqueMerchReducer,
  total: totalMerchReducer
  // id: fetchUniqueMerchReducer
})