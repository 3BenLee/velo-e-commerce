import { REMOVE_FROM_CART } from './types';

// export const removeFromCart = (card) => {
//   console.log('Remover_Action', card);
//   return {
//     type: REMOVE_FROM_CART,
//     payload: card
//   } 
// }

export const removeFromCart = (card) => dispatch => {
  console.log('REMOVER_ACTION', card);
  dispatch({
    type: REMOVE_FROM_CART,
    payload: card
  }) 
}