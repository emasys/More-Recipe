export default (state = {}, action) => {
  switch (action.type) {
  case 'NEW_RECIPE':
    return {
      ...state,
      new_recipe: action.payload
    };

  default:
    return state;
  }
};
