export default (state = {}, action) => {
  switch (action.type) {
    case 'GET_FAV_STATUS':
      return {
        ...state,
        favStatus: action.payload
      };

    default:
      return state;
  }
};
