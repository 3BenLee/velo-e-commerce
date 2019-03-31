import { FETCH_UNIQUE_MERCH } from '../actions/types';

const initialState = {
  cards: [],
  id: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
      case FETCH_UNIQUE_MERCH:
        return {
          ...state,
          id: action.payload
        }
    default:
      return state;
  }
}