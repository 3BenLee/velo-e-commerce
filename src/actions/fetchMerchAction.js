import { FETCH_MERCH } from './types';

export const fetchMerch = () => dispatch => {
  console.log('fetchMerch');
  fetch('https://velo-velo.firebaseio.com/.json',{
  })
  .then(res => res.json())
  .then(cardData => dispatch({
    type: FETCH_MERCH,
    payload: cardData.products
  }));
}

