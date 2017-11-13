export default (state = {}, action) => {
  switch (action.type) {
    case 'RECIPES':
      return {
        ...state,
        allRecipes: action.payload
      };
      break;
    case 'RECIPES_ITEM':
      return {
        ...state,
        recipeItem: action.payload
      };

    default:
      return state;
  }
};
