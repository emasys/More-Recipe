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

    default:
      return state;
  }
};
