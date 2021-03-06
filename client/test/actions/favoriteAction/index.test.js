import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import instance from '../../../src/config/axios';
import * as actions from '../../../src/actions/favoriteAction';
import * as favoriteMocks from '../../__mocks__/favoriteMocks';
import { isLoggedInFalse } from '../../__mocks__/authMocks';
import * as type from '../../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for favorite actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
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
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.GET_FAVORITES,
        payload: favoriteMocks.getFavorites
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getFavorite(1, 0)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should test for errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.GET_FAVORITES,
        payload: { favorites: [] }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getFavorite(1, 0)).then(() => {
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
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
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

  it('should test for errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SET_FAVORITE,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.setFavorite(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Clear Favorite list', () => {
  it('should create an action to clear favorite list', () => {
    const expectedAction = {
      type: type.CLEAR_RECIPES,
      payload: []
    };
    expect(actions.clearFavoriteList()).toEqual(expectedAction);
  });
});
