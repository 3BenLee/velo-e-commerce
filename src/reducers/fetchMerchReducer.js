import { FETCH_MERCH } from '../actions/types';

const initialState = {
  cards: [],
  id: '',
  totalPrice: ''
}

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_MERCH:
    console.log('fetchMerchReducer',action.payload)
    console.log('cards', state.cards)  // There is actually nothing in
      return {
        ...state,
        cardData: action.payload
      }
    default:
      return state;
  }
}