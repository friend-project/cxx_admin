import {
  EXHIBITION_ADD_REQUEST,
  EXHIBITION_ADD_RECEIVE,
  EXHIBITION_ADD_FAILURE,
} from './constant';

export default (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case EXHIBITION_ADD_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case EXHIBITION_ADD_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case EXHIBITION_ADD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
