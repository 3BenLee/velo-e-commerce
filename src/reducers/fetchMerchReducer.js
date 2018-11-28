import { FETCH_MERCH , FETCH_UNIQUE_MERCH } from '../actions/types';

const initialState = {
  modalOpen: false,
  cards: [],
  id: ''
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