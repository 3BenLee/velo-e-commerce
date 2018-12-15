import { ADD_TO_CART } from './types';

export const addToCart = (card) => dispatch => {
  console.log('TOTAL', card);
  dispatch({
    type: ADD_TO_CART,
    payload: card
  }) 
}

export const test = {
  addToCart: (card) => {
    console.log('TOTAL', card);
    return {
      type: ADD_TO_CART,
      payload: card
    } 
  }
}