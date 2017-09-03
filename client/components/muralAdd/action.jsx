import 'isomorphic-fetch';
import {
  MURAL_ADD_REQUEST,
  MURAL_ADD_RECEIVE,
  MURAL_ADD_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const muralAddRequest = n => ({
  type: MURAL_ADD_REQUEST,
  amount: n,
});

export const muralAddReceive = (n, stories) => ({
  type: MURAL_ADD_RECEIVE,
  amount: n,
  response: stories,
});

export const muralAddFailure = (n, error) => ({
  type: MURAL_ADD_FAILURE,
  amount: n,
  error,
});

export const addMural = n => (dispatch) => {
  dispatch(muralAddRequest(n.username));
  return fetch(
    `${cfg.web}/api/muralAdd`,
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
        dispatch(muralAddFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(muralAddReceive(n.username, stories)));
};

