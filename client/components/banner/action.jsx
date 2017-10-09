import 'isomorphic-fetch';
import {
  BANNER_LIST_REQUEST,
  BANNER_LIST_RECEIVE,
  BANNER_LIST_FAILURE,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_RECEIVE,
  BANNER_DELETE_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const bannerListRequest = n => ({
  type: BANNER_LIST_REQUEST,
  amount: n,
});

export const bannerListReceive = (n, stories) => ({
  type: BANNER_LIST_RECEIVE,
  amount: n,
  response: stories,
});

export const bannerListFailure = (n, error) => ({
  type: BANNER_LIST_FAILURE,
  amount: n,
  error,
});
export const bannerDeleteRequest = n => ({
  type: BANNER_DELETE_REQUEST,
  amount: n,
});

export const bannerDeleteReceive = (n, stories) => ({
  type: BANNER_DELETE_RECEIVE,
  amount: n,
  response: stories,
});

export const bannerDeleteFailure = (n, error) => ({
  type: BANNER_DELETE_FAILURE,
  amount: n,
  error,
});

export const bannerList = n => (dispatch) => {
  dispatch(bannerListRequest(n));
  return fetch(`${cfg.web}/api/bannerList`)
    .then((response) => {
      if (response.status > 200) {
        dispatch(bannerListFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(bannerListReceive(n, stories)));
};

export const bannerDelete = n => (dispatch) => {
  dispatch(bannerDeleteRequest(n));
  return fetch(
    `${cfg.web}/api/bannerDelete`,
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
        dispatch(bannerDeleteFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(bannerDeleteReceive(n, stories)));
};
