import {ADD_TO_CART} from '../actions/types';
import {REMOVE_FROM_CART} from '../actions/types';
import {CLEAR_CART} from '../actions/types';

const initialState = {
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
    case CLEAR_CART:
    console.log('CLEAR_REDUCER');
      return {
        ...state,
        cartItems: []
      }
    default:
      return state;
  }
}