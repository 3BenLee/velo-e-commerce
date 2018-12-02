import {ADD_TO_CART} from '../actions/types'


const initialState = {
  cards: [],
  id: '',
  items: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_TO_CART:
    console.log('TOTAL_reducer');
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}