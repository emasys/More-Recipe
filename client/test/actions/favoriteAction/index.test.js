import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/actions/favoriteAction';
import * as favoriteMocks from '../../__mocks__/favoriteMocks';
import * as type from '../../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for review actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return an object containing an array of all favorite recipes of a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: favoriteMocks.getFavorites
      });
    });

    const expectedActions = [
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.GET_FAVORITES,
        payload: favoriteMocks.getFavorites
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getFavs(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing an array of a recipe added to user favorite', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: favoriteMocks.addFavorite
      });
    });

    const expectedActions = [
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SET_FAVORITE,
        payload: favoriteMocks.addFavorite
      }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.setFavorite(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
