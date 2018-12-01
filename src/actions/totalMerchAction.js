import { TOTAL_MERCH } from './types';

export const totalMerch = (price) => dispatch => {
  console.log('TOTAL', price);
  dispatch({
    type: TOTAL_MERCH,
    payload: price
  }) 
}