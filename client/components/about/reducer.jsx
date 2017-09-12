import {
  ABOUT_REQUEST,
  ABOUT_RECEIVE,
  ABOUT_FAILURE,
} from './constant';

export default (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case ABOUT_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case ABOUT_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case ABOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
