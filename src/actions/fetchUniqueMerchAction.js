import { FETCH_UNIQUE_MERCH } from './types';

export const fetchUniqueMerch = (id) => dispatch => {
  dispatch({
    type: FETCH_UNIQUE_MERCH,
    payload: id
  })
}

