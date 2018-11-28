import { FETCH_UNIQUE_MERCH } from './types';
// import axios from 'axios';

export const fetchUniqueMerch = (id) => dispatch => {
  console.log('fetching UNIQUE', id);
  dispatch({
    type: FETCH_UNIQUE_MERCH,
    payload: id
  })
  
}

