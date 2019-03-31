import { ADD_TO_CART } from './types';

export const addToCart = (card) => dispatch => {
  dispatch({
    type: ADD_TO_CART,
    payload: card
  }) 
}
