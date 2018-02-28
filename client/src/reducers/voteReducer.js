import * as type from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
  case type.UPVOTE:
    return {
      ...state,
      upvote: action.payload,
      downvote: action.payload
    };

  case type.DOWNVOTE:
    return {
      ...state,
      downvote: action.payload,
      upvote: action.payload
    };

  default:
    return state;
  }
};
