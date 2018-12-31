import { CLEAR_CART } from './types';

// export const clearCart = (dispatch)  => { 
//   console.log('clear_action')
//   dispatch({
//     type: CLEAR_CART,
//   })   
// } 

export function clearCart() {
  console.log('clear_action')
  return { 
    type: CLEAR_CART
  }
}