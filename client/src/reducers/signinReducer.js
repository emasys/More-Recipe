export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload
      };
      break;

    default:
      return state;
  }
};
