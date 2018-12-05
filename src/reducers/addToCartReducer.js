import {ADD_TO_CART} from '../actions/types'

const initialState = {
  cards: [],
  id: '',
  cartItems: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_TO_CART:
    console.log('TOTAL_reducer');
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    default:
      return state;
  }
}