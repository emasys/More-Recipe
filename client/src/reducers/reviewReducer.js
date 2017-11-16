export default (state = {}, action) => {
  switch (action.type) {
    case 'REVIEW':
      return {
        ...state,
        review: action.payload
      };

    default:
      return state;
  }
};
