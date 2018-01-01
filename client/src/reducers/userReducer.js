import * as type from '../actions/types';

export default (state = {}, action) => {
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

  default:
    return state;
  }
};
