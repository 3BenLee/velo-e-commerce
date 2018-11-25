import { combineReducers } from 'redux';
import fetchMerchReducer from './fetchMerchReducer';

export default combineReducers({
  data: fetchMerchReducer
})