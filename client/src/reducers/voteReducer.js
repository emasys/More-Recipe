import * as type from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
  case type.UPVOTE:
    return {
      ...state,
      upvote: action.payload
    };

  case type.DOWNVOTE:
    return {
      ...state,
      downvote: action.payload
    };
  case type.GET_VOTE_STATUS:
    return {
      ...state,
      votes: action.payload
    };

  default:
    return state;
  }
};
