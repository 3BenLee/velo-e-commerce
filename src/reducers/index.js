import { combineReducers } from 'redux';
import fetchMerchReducer from './fetchMerchReducer';
import fetchUniqueMerchReducer from './fetchUniqueMerchReducer';
// import {fetchUniqueMerch} from '../actions/fetchUniqueMerchAction'

export default combineReducers({
  data: fetchMerchReducer,
  card: fetchUniqueMerchReducer,
  // id: fetchUniqueMerchReducer
})