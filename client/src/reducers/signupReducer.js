export default (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return {
        ...state,
        user: action.payload
      };
      break;

    default:
      return state;
  }
};
