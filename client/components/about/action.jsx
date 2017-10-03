import 'isomorphic-fetch';
import {
  ABOUT_REQUEST,
  ABOUT_RECEIVE,
  ABOUT_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const addRequest = n => ({
  type: ABOUT_REQUEST,
  amount: n,
});

export const addReceive = (n, stories) => ({
  type: ABOUT_RECEIVE,
  amount: n,
  response: stories,
});

export const addFailure = (n, error) => ({
  type: ABOUT_FAILURE,
  amount: n,
  error,
});

export const addGeneral = n => (dispatch) => {
  dispatch(addRequest(n));
  return fetch(
    `${cfg.web}/api/generalAdd`,
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

export const getAbout = n => {
  return fetch(`${cfg.web}/api/generalDetail/${n}`);
};
