import { FETCH_MERCH } from './types';
// import axios from 'axios';

export const fetchMerch = () => dispatch => {
  console.log('fetching');
  fetch('https://velo-velo.firebaseio.com/.json',{
    // mode:'cors',
    // headers:'Access-Control-Allow-Origin'
  })
  .then(res => res.json())
  .then(cardData => dispatch({
    type: FETCH_MERCH,
    payload: cardData
  }));
}
