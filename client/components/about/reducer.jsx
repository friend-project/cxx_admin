import {
  LOGIN_REQUEST,
  LOGIN_RECEIVE,
  LOGIN_FAILURE,
} from './constant';

export default (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case LOGIN_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
