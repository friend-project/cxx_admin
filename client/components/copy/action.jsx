import 'isomorphic-fetch';
import {
  EXHIBITION_ADD_REQUEST,
  EXHIBITION_ADD_RECEIVE,
  EXHIBITION_ADD_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const addRequest = n => ({
  type: EXHIBITION_ADD_REQUEST,
  amount: n,
});

export const addReceive = (n, stories) => ({
  type: EXHIBITION_ADD_RECEIVE,
  amount: n,
  response: stories,
});

export const addFailure = (n, error) => ({
  type: EXHIBITION_ADD_FAILURE,
  amount: n,
  error,
});

export const addExhibition = n => (dispatch) => {
  dispatch(addRequest(n));
  return fetch(
    `${cfg.web}/api/exhibitionAdd`,
    {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      cache: 'default',
      body: JSON.stringify(n),
      credentials: 'include',
    },
  )
    .then((response) => {
      if (response.status > 200) {
        dispatch(addFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(addReceive(n, stories)));
};

