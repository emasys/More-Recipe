import * as type from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
  case type.REVIEW:
    return {
      ...state,
      review: action.payload
    };
  case type.GET_REVIEWS:
    return {
      ...state,
      fetch_reviews: action.payload
    };
  case type.DELETE_REVIEWS:
    return {
      ...state,
      delete_reviews: action.payload
    };
  default:
    return state;
  }
};
