import {
  MURAL_LIST_REQUEST,
  MURAL_LIST_RECEIVE,
  MURAL_LIST_FAILURE,
  MURAL_DELETE_REQUEST,
  MURAL_DELETE_RECEIVE,
  MURAL_DELETE_FAILURE,
} from './constant';

export const muralList = (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case MURAL_LIST_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case MURAL_LIST_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case MURAL_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const muralDelete = (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case MURAL_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case MURAL_DELETE_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case MURAL_DELETE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

