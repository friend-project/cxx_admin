import 'isomorphic-fetch';
import {
  BANNER_ADD_REQUEST,
  BANNER_ADD_RECEIVE,
  BANNER_ADD_FAILURE,
} from './constant';
import cfg from './../../../config/domain';

export const bannerAddRequest = n => ({
  type: BANNER_ADD_REQUEST,
  amount: n,
});

export const bannerAddReceive = (n, stories) => ({
  type: BANNER_ADD_RECEIVE,
  amount: n,
  response: stories,
});

export const bannerAddFailure = (n, error) => ({
  type: BANNER_ADD_FAILURE,
  amount: n,
  error,
});

export const addBanner = n => (dispatch) => {
  dispatch(bannerAddRequest(n));
  return fetch(
    `${cfg.web}/api/bannerAdd`,
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
        dispatch(bannerAddFailure(n, response.status));
      }
      return response.json();
    })
    .then(stories => dispatch(bannerAddReceive(n, stories)));
};
