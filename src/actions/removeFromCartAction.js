import { REMOVE_FROM_CART } from './types';

export const removeFromCart = (item) => dispatch => {
  console.log('Remover_Action', item);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: item
  }) 
}