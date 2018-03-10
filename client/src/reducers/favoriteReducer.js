import * as type from '../actions/types';

export default (
  state = {
    userFavorites: []
  },
  action
) => {
  switch (action.type) {
  case type.SET_FAVORITE:
    return {
      ...state,
      fav: action.payload
    };
  case type.GET_FAVORITES:
    return {
      ...state,
      userFavorites: [...state.userFavorites, ...action.payload.favorites],
      favoriteCount: action.payload.count
    };
  case type.CLEAR_RECIPES:
    return {
      ...state,
      userFavorites: []
    };
  default:
    return state;
  }
};
