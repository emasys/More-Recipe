export default (state = {}, action) => {
  switch (action.type) {
    case 'UPVOTE':
      return {
        ...state,
        votes: action.payload
      };
    case 'GET_UPV_STATUS':
      return {
        ...state,
        upvotes: action.payload
      };

    default:
      return state;
  }
};
