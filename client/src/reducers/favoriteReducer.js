export default (state = {}, action) => {
  switch (action.type) {
  case 'SET_FAVORITE':
    return {
      ...state,
      fav: action.payload
    };
  case 'GET_FAVORITES':
    return {
      ...state,
      userFav: action.payload
    };
  case 'GET_FAV_STATUS':
    return {
      ...state,
      favStatus: action.payload
    };

  default:
    return state;
  }
};
