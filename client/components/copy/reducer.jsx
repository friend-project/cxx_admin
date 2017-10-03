import {
  COPY_REQUEST,
  COPY_RECEIVE,
  COPY_FAILURE,
} from './constant';

export default (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case COPY_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case COPY_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case COPY_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
