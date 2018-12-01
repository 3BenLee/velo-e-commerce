import { TOTAL_MERCH } from '../actions/types';

const initialState = {
  cards: [],
  id: '',
  totalPrice: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TOTAL_MERCH:
    console.log('TOTAL_reducer');
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload
      }
    default:
      return state;
  }
}