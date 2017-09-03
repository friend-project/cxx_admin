import 'isomorphic-fetch';
import {
  LOGIN_REQUEST,
  LOGIN_RECEIVE,
  LOGIN_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const loginRequest = n => ({
  type: LOGIN_REQUEST,
  amount: n,
});

export const loginReceive = (n, stories) => ({
  type: LOGIN_RECEIVE,
  amount: n,
  response: stories,
});

export const loginFailure = (n, error) => ({
  type: LOGIN_FAILURE,
  amount: n,
  error,
});

export const loginCheck = n => (dispatch) => {
  dispatch(loginRequest(n.username));
  return fetch(
    `${cfg.web}/api/login`,
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
        dispatch(loginFailure(n.username, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(loginReceive(n.username, stories)));
};
