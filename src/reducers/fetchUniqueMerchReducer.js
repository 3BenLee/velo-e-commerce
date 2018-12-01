import { FETCH_UNIQUE_MERCH } from '../actions/types';

const initialState = {
  cards: [],
  id: '',
  totalPrice: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
      case FETCH_UNIQUE_MERCH:
        console.log("UNIQUE REDUCER")
        console.log(action.payload)
        return {
          ...state,
          id: action.payload
        }
    default:
      return state;
  }
}