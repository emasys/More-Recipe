export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload
      };

    case 'USER_INFO':
      return {
        ...state,
        userInfo: action.payload
      };

    case 'USER_PROFILE':
      return {
        ...state,
        userProfile: action.payload
      };

    case 'ALL_USERS':
      return {
        ...state,
        allUsers: action.payload
      };
    case 'DELETE_USER':
      return {
        ...state,
        delUser: action.payload
      };

    default:
      return state;
  }
};
