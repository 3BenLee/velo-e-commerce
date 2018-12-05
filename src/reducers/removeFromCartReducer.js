import {REMOVE_FROM_CART} from '../actions/types'

const initialState = {
  cards: [],
  id: '',
  cartItems: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case REMOVE_FROM_CART:
    console.log('REMOVE_reducer');
      return {
        ...state,
        cartItems: state.cartItems.filter(item => action.payload !== item)
      }
    default:
      return state;
  }
}
