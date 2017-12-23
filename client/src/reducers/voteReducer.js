export default (state = {}, action) => {
  switch (action.type) {
  case 'UPVOTE':
    return {
      ...state,
      upvote: action.payload
    };

  case 'DOWNVOTE':
    return {
      ...state,
      downvote: action.payload
    };
  case 'GET_UPV_STATUS':
    return {
      ...state,
      votes: action.payload
    };

  default:
    return state;
  }
};
