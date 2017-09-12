import {
  MURAL_ADD_REQUEST,
  MURAL_ADD_RECEIVE,
  MURAL_ADD_FAILURE,
} from './constant';

export default (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case MURAL_ADD_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case MURAL_ADD_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case MURAL_ADD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
