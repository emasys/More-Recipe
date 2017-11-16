export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        fav: action.payload
      };

    default:
      return state;
  }
};
