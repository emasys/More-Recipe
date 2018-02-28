import reducer from '../../src/reducers/userReducer';
import * as types from '../../src/actions/types';
import * as mockData from '../__mocks__/userMocks';

const initialState = {
  message: null,
  authInfo: {
    username: ''
  }
};

describe('Test suite for user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle user SIGN_IN', () => {
    expect(reducer(initialState, {
      type: types.SIGN_IN,
      payload: {
        success: true,
        token: 'some jwt token'
      }
    })).toEqual({
      ...initialState,
      signIn: {
        success: true,
        token: 'some jwt token'
      }
    });
  });

  it('should handle user SIGN_UP', () => {
    expect(reducer(initialState, {
      type: types.SIGN_UP,
      payload: {
        success: true,
        user: {
          id: 17,
          moniker: 'nb32',
          avatar: null
        },
        token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm1vbmlrZXIiOiJuYjMyIiwiYXZhdGFyIjpudWxsLCJpYXQiOjE1MTk4NDc1MTYsImV4cCI6MTU1MTM4MzUxNn0.JSK49GxK3EeTxdOKRCQ1tR_ORVfnHNFZwBfbKwgjmOo'
      }
    })).toEqual({
      ...initialState,
      signUp: {
        success: true,
        user: {
          id: 17,
          moniker: 'nb32',
          avatar: null
        },
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsIm1vbmlrZXIiOiJuYjMyIiwiYXZhdGFyIjpudWxsLCJpYXQiOjE1MTk4NDc1MTYsImV4cCI6MTU1MTM4MzUxNn0.JSK49GxK3EeTxdOKRCQ1tR_ORVfnHNFZwBfbKwgjmOo'
      }
    });
  });
  it('should handle USER_INFO', () => {
    expect(reducer(initialState, {
      type: types.USER_INFO,
      payload: mockData.userInfo
    })).toEqual({
      ...initialState,
      userInfo: mockData.userInfo
    });
  });

  it('should handle USER_PROFILE', () => {
    expect(reducer(initialState, {
      type: types.USER_PROFILE,
      payload: mockData.userInfo
    })).toEqual({
      ...initialState,
      userProfile: mockData.userInfo
    });
  });

  it('should handle ALL_USERS', () => {
    expect(reducer(initialState, {
      type: types.ALL_USERS,
      payload: mockData.allUsers
    })).toEqual({
      ...initialState,
      allUsers: mockData.allUsers
    });
  });

  it('should handle DELETE_USERS', () => {
    expect(reducer(initialState, {
      type: types.DELETE_USER,
      payload: { success: true, message: 'user deleted' }
    })).toEqual({
      ...initialState,
      delUser: { success: true, message: 'user deleted' }
    });
  });

  it('should handle UPDATE_USERS', () => {
    expect(reducer(initialState, {
      type: types.UPDATE_USER,
      payload: {
        success: true,
        status: 'updated'
      }
    })).toEqual({
      ...initialState,
      updateUser: {
        success: true,
        status: 'updated'
      }
    });
  });

  it('should handle RESET_PASSWORD', () => {
    expect(reducer(initialState, {
      type: types.RESET_PASSWORD,
      payload: { success: true, message: 'password changed' }
    })).toEqual({
      ...initialState,
      reset: { success: true, message: 'password changed' }
    });
  });

  it('should handle SEND_TOKEN', () => {
    expect(reducer(initialState, {
      type: types.SEND_TOKEN,
      payload: { success: true, message: 'token sent' }
    })).toEqual({
      ...initialState,
      sendToken: { success: true, message: 'token sent' }
    });
  });

  it('should handle COMPARE_TOKEN', () => {
    expect(reducer(initialState, {
      type: types.COMPARE_TOKEN,
      payload: { success: true, message: 'token match' }
    })).toEqual({
      ...initialState,
      compareToken: { success: true, message: 'token match' }
    });
  });

  it('should handle authentication status', () => {
    expect(reducer(initialState, {
      type: types.IS_LOGGEDIN,
      payload: {
        isLoggedIn: true,
        userId: 1,
        username: 'masy'
      }
    })).toEqual({
      ...initialState,
      isLoggedIn: true,
      authInfo: {
        isLoggedIn: true,
        userId: 1,
        username: 'masy'
      }
    });
  });

  it('should handle flash message', () => {
    expect(reducer(initialState, {
      type: types.FLASH_MESSAGE,
      message: 'sign in to continue',
      path: 'recipe/2'
    })).toEqual({
      ...initialState,
      message: 'sign in to continue',
      path: 'recipe/2'
    });
  });
});
