import * as type from '../actions/types';

export default (
  state = {
    message: null,
    authInfo: {
      username: ''
    }
  },
  action
) => {
  switch (action.type) {
  case type.SIGN_IN:
    return {
      ...state,
      signIn: action.payload
    };

  case type.USER_INFO:
    return {
      ...state,
      userInfo: action.payload
    };

  case type.USER_PROFILE:
    return {
      ...state,
      userProfile: action.payload
    };

  case type.ALL_USERS:
    return {
      ...state,
      allUsers: action.payload
    };
  case type.DELETE_USER:
    return {
      ...state,
      delUser: action.payload
    };

  case type.UPDATE_USER:
    return {
      ...state,
      updateUser: action.payload
    };

  case type.SIGN_UP:
    return {
      ...state,
      signUp: action.payload
    };
  case type.RESET_PASSWORD:
    return {
      ...state,
      reset: action.payload
    };
  case type.SEND_TOKEN:
    return {
      ...state,
      sendToken: action.payload
    };
  case type.COMPARE_TOKEN:
    return {
      ...state,
      compareToken: action.payload
    };
  case type.CLEAR_AUTH:
    return {
      ...state,
      compareToken: null,
      sendToken: null,
      reset: null
    };
  case type.IS_LOGGEDIN:
    return {
      ...state,
      isLoggedIn: action.payload.isLoggedIn,
      authInfo: action.payload
    };

  case type.FLASH_MESSAGE:
    return {
      ...state,
      message: action.message,
      path: action.path
    };

  case type.SIGN_OUT:
    return {
      ...state,
      message: null,
      path: null
    };

  default:
    return state;
  }
};
