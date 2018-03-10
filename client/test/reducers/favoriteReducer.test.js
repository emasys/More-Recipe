import expect from 'expect';
import reducer from '../../src/reducers/favoriteReducer';
import * as types from '../../src/actions/types';
import { addFavorite, getFavorites } from '../__mocks__/favoriteMocks';

const initialState = {
  userFavorites: []
};
describe('Test suite for favorite reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should return recipe detail added to user favorite list', () => {
    const { fav } = reducer(undefined, {
      type: types.SET_FAVORITE,
      payload: addFavorite
    });
    expect(fav).toEqual(addFavorite);
  });

  it('should return all recipes in user favorite list', () => {
    const { userFavorites, favoriteCount } = reducer(
      { userFavorites: [] },
      {
        type: types.GET_FAVORITES,
        payload: getFavorites
      }
    );
    expect(userFavorites).toEqual(getFavorites.favorites);
    expect(favoriteCount).toEqual(getFavorites.count);
  });
});
