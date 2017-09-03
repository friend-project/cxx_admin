import 'isomorphic-fetch';
import {
  MURAL_LIST_REQUEST,
  MURAL_LIST_RECEIVE,
  MURAL_LIST_FAILURE,
  MURAL_DELETE_REQUEST,
  MURAL_DELETE_RECEIVE,
  MURAL_DELETE_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const muralListRequest = n => ({
  type: MURAL_LIST_REQUEST,
  amount: n,
});

export const muralListReceive = (n, stories) => ({
  type: MURAL_LIST_RECEIVE,
  amount: n,
  response: stories,
});

export const muralListFailure = (n, error) => ({
  type: MURAL_LIST_FAILURE,
  amount: n,
  error,
});
export const muralDeleteRequest = n => ({
  type: MURAL_DELETE_REQUEST,
  amount: n,
});

export const muralDeleteReceive = (n, stories) => ({
  type: MURAL_DELETE_RECEIVE,
  amount: n,
  response: stories,
});

export const muralDeleteFailure = (n, error) => ({
  type: MURAL_DELETE_FAILURE,
  amount: n,
  error,
});

export const muralList = n => (dispatch) => {
  dispatch(muralListRequest(n));
  return fetch(
    `${cfg.web}/api/muralList`,
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
        dispatch(muralListFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(muralListReceive(n, stories)));
};

export const muralDelete = n => (dispatch) => {
  dispatch(muralDeleteRequest(n));
  return fetch(
    `${cfg.web}/api/muralDelete`,
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
        dispatch(muralDeleteFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(muralDeleteReceive(n, stories)));
};

