export default (state = {}, action) => {
  switch (action.type) {
    case 'RECIPES':
      return {
        ...state,
        allRecipes: action.payload
      };
    case 'RECIPES_ITEM':
      return {
        ...state,
        recipeItem: action.payload
      };
    case 'USER_RECIPES':
      return {
        ...state,
        userRecipes: action.payload
      };
    case 'EDIT_RECIPE':
      return {
        ...state,
        updateRecipes: action.payload
      };
    case 'GET_CATEGORY':
      return {
        ...state,
        category: action.payload
      };

    case 'SEARCH':
      return {
        ...state,
        search: action.payload
      };

    case 'DELETE_RECIPE':
      return {
        ...state,
        del_recipe: action.payload
      };

    default:
      return state;
  }
};
