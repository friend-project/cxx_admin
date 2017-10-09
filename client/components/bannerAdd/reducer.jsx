import {
  BANNER_ADD_REQUEST,
  BANNER_ADD_RECEIVE,
  BANNER_ADD_FAILURE,
} from './constant';

export default (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case BANNER_ADD_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case BANNER_ADD_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case BANNER_ADD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
