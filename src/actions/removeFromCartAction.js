import { REMOVE_FROM_CART } from './types';

export const removeFromCart = (card) => dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: card
  }) 
};