import * as type from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
  case type.SET_FAVORITE:
    return {
      ...state,
      fav: action.payload
    };
  case type.GET_FAVORITES:
    return {
      ...state,
      userFav: action.payload
    };
  case type.GET_FAVORITE_STATUS:
    return {
      ...state,
      favStatus: action.payload
    };

  default:
    return state;
  }
};
