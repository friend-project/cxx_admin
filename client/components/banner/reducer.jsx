import {
  BANNER_LIST_REQUEST,
  BANNER_LIST_RECEIVE,
  BANNER_LIST_FAILURE,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_RECEIVE,
  BANNER_DELETE_FAILURE,
} from './constant';

export const bannerList = (state = {
  isFetching: false,
  response: [],
  error: null,
}, action) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case BANNER_LIST_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case BANNER_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const bannerDelete = (state = {
  isFetching: false,
  response: {},
  error: null,
}, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true,
      };
    case BANNER_DELETE_RECEIVE:
      return {
        ...state,
        isFetching: false,
        response: action.response,
      };
    case BANNER_DELETE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};
