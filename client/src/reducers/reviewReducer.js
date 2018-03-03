import * as type from '../actions/types';

export default (
  state = {
    review: {},
    fetch_reviews: []
  },
  action
) => {
  switch (action.type) {
  case type.REVIEW:
    return {
      ...state,
      review: action.payload
    };
  case type.GET_REVIEWS:
    return {
      ...state,
      fetch_reviews: [...state.fetch_reviews, ...action.payload.reviews],
      count_reviews: action.payload.count
    };
  case type.CLEAR_REVIEW:
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
