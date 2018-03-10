import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import instance from '../../../src/config/axios';
import { isLoggedInFalse } from '../../__mocks__/authMocks';
import * as actions from '../../../src/actions/userActions';
import * as userMocks from '../../__mocks__/userMocks';
import * as type from '../../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for user actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });
  it('should return an object containing user data of a particular user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userMocks.userInfo
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.USER_INFO,
        payload: userMocks.userInfo
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getUserInfo(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of object containing user recipes of a particular user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userMocks.userRecipes
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.USER_RECIPES,
        payload: userMocks.userRecipes
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getUserRecipes(1, 1, 0)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing profile data of a user', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userMocks.userInfo
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.USER_PROFILE,
        payload: userMocks.userInfo
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getProfile(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should return an array of object containing data of all registered users', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: userMocks.allUsers
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.ALL_USERS,
        payload: userMocks.allUsers
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getAllUsers()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return a confirmation that a user has been deleted', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, status: 'user deleted' }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.DELETE_USER,
        payload: { success: true, status: 'user deleted' }
      },
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.deleteUser(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return a confirmation that a user has been updated', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, status: 'updated' }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.UPDATE_USER,
        payload: { success: true, status: 'updated' }
      },
      { type: type.IS_LOADING, isLoading: false },
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.updateUser(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
