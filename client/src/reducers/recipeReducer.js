export default (state = {}, action) => {
  switch (action.type) {
    case 'RECIPES':
      return {
        ...state,
        allRecipes: action.payload
      };
      break;
    case 'RECIPE':
      return {
        ...state,
        oneRecipe: action.payload
      };

    default:
      return state;
  }
};
