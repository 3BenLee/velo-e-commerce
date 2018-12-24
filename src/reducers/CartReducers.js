import {ADD_TO_CART} from '../actions/types';
import {REMOVE_FROM_CART} from '../actions/types';

const initialState = {
  cards: [],
  id: '',
  cartItems: [],
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_TO_CART:
    console.log('ADD_reducer');
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      }
    case REMOVE_FROM_CART:
    console.log('REMOVE_REDUCER', action.payload, state.cartItems);
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      }
    default:
      return state;
  }
}