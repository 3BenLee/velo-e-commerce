import { FETCH_MERCH } from '../actions/types';

const initialState = {
  modalOpen: false,
  cards: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_MERCH:
    console.log('reducer');
    console.log(action.payload)
      return {
        ...state,
        cardData: action.payload
      }
    default:
      return state;

  }
}