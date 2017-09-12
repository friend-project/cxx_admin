import 'isomorphic-fetch';
import {
  EXHIBITION_LIST_REQUEST,
  EXHIBITION_LIST_RECEIVE,
  EXHIBITION_LIST_FAILURE,
  EXHIBITION_DELETE_REQUEST,
  EXHIBITION_DELETE_RECEIVE,
  EXHIBITION_DELETE_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const exhibitionListRequest = n => ({
  type: EXHIBITION_LIST_REQUEST,
  amount: n,
});

export const exhibitionListReceive = (n, stories) => ({
  type: EXHIBITION_LIST_RECEIVE,
  amount: n,
  response: stories,
});

export const exhibitionListFailure = (n, error) => ({
  type: EXHIBITION_LIST_FAILURE,
  amount: n,
  error,
});
export const exhibitionDeleteRequest = n => ({
  type: EXHIBITION_DELETE_REQUEST,
  amount: n,
});

export const exhibitionDeleteReceive = (n, stories) => ({
  type: EXHIBITION_DELETE_RECEIVE,
  amount: n,
  response: stories,
});

export const exhibitionDeleteFailure = (n, error) => ({
  type: EXHIBITION_DELETE_FAILURE,
  amount: n,
  error,
});

export const exhibitionList = n => (dispatch) => {
  dispatch(exhibitionListRequest(n));
  return fetch(
    `${cfg.web}/api/exhibitionList`,
    {
      method: 'GET',
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
        dispatch(exhibitionListFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(exhibitionListReceive(n, stories)));
};

export const exhibitionDelete = n => (dispatch) => {
  dispatch(exhibitionDeleteRequest(n));
  return fetch(
    `${cfg.web}/api/exhibitionDelete`,
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
        dispatch(exhibitionDeleteFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(exhibitionDeleteReceive(n, stories)));
};

