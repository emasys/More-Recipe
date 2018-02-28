import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../../src/actions/authActions';
import * as authMocks from '../../__mocks__/authMocks';
import * as type from '../../../src/actions/types';
import instance from '../../../src/config/axios';

const mockStore = configureStore([thunk]);

describe('Test suite for Authentication actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should return an object containing token after sign up', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: authMocks.signup
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: authMocks.isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SIGN_UP,
        payload: authMocks.signup
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.signUp(authMocks.signUpData)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing token after sign in', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: authMocks.signin
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: authMocks.isLoggedInTrue },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SIGN_IN,
        payload: authMocks.signin
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.signIn(authMocks.signInData)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing confirmation of reset password', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, status: 'updated' }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: authMocks.isLoggedInTrue },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.RESET_PASSWORD,
        payload: { success: true, status: 'updated' }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.resetPassword(authMocks.signInData))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an object containing confirmation of token sent', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, status: 'token sent' }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: authMocks.isLoggedInTrue },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SEND_TOKEN,
        payload: { success: true, status: 'token sent' }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.sendToken(authMocks.signInData.email))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return a boolean value based on the token provide and token in database', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: authMocks.isLoggedInTrue },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.COMPARE_TOKEN,
        payload: { success: true }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.compareToken({ token: 1234 })).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
