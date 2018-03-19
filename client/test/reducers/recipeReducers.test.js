import reducer from '../../src/reducers/recipeReducer';
import * as types from '../../src/actions/types';
import * as mockData from '../__mocks__/recipeMocks';

const initialState = {
  allRecipes: [],
  recipeItem: {},
  updateRecipes: {},
  category: [],
  userRecipes: [],
  userRecipesCount: 0,
  searchResult: []
};
describe('Test suite for recipe reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle HOT_RECIPES', () => {
    expect(reducer(
      {},
      {
        type: types.HOT_RECIPES,
        payload: { recipes: [mockData.hotRecipe] }
      }
    )).toEqual({
      hotRecipes: [mockData.hotRecipe]
    });
  });

  it('should handle ALL_RECIPES', () => {
    expect(reducer(initialState, {
      type: types.ALL_RECIPES,
      payload: mockData.allRecipes
    })).toEqual({
      ...initialState,
      allRecipes: mockData.allRecipes.recipes
    });
  });

  it('should handle SINGLE_RECIPE', () => {
    expect(reducer(
      {},
      {
        type: types.SINGLE_RECIPE,
        payload: mockData.singleRecipe
      }
    )).toEqual({
      recipeItem: mockData.singleRecipe
    });
  });

  it('should handle SINGLE_RECIPE_REACTION', () => {
    expect(reducer(
      {},
      {
        type: types.SINGLE_RECIPE_REACTION,
        payload: mockData.singleRecipe
      }
    )).toEqual({
      recipeItem: mockData.singleRecipe
    });
  });

  it('should handle USER_RECIPE', () => {
    expect(reducer(initialState, {
      type: types.USER_RECIPES,
      payload: mockData.userRecipes
    })).toEqual({
      ...initialState,
      userRecipes: mockData.userRecipes.recipes,
      userRecipesCount: mockData.userRecipes.count
    });
  });
  it('should handle EDIT_RECIPE', () => {
    expect(reducer(initialState, {
      type: types.EDIT_RECIPE,
      payload: mockData.userRecipes
    })).toEqual({
      ...initialState,
      recipeItem: mockData.userRecipes,
      updated: mockData.userRecipes.success
    });
  });

  it('should handle GET_CATEGORY', () => {
    expect(reducer(initialState, {
      type: types.GET_CATEGORY,
      payload: mockData.userRecipes
    })).toEqual({
      ...initialState,
      category: mockData.userRecipes.recipes,
      count: mockData.userRecipes.count
    });
  });

  it('should handle SEARCH', () => {
    expect(reducer(initialState, {
      type: types.SEARCH,
      payload: mockData.userRecipes
    })).toEqual({
      ...initialState,
      searchResult: mockData.userRecipes.recipes,
      success: mockData.userRecipes.success,
      searchCount: mockData.userRecipes.count
    });
  });

  it('should handle RESET_SEARCH', () => {
    expect(reducer(initialState, {
      type: types.RESET_SEARCH,
      payload: []
    })).toEqual({
      ...initialState,
      searchResult: []
    });
  });

  it('should handle DELETE_RECIPE', () => {
    expect(reducer(initialState, {
      type: types.DELETE_RECIPE,
      payload: {
        success: true,
        status: 'Recipe deleted'
      }
    })).toEqual({
      ...initialState,
      userRecipes: [],
      del_recipe: {
        success: true,
        status: 'Recipe deleted'
      }
    });
  });

  it('should handle NEW_RECIPE', () => {
    expect(reducer(initialState, {
      type: types.NEW_RECIPE,
      payload: mockData.newRecipe
    })).toEqual({
      ...initialState,
      new_recipe: mockData.newRecipe
    });
  });

  it('should handle UPLOAD_IMG', () => {
    expect(reducer(initialState, {
      type: types.UPLOAD_FOOD_IMG,
      payload: 'https://example.com'
    })).toEqual({
      ...initialState,
      uploadedImg: 'https://example.com'
    });
  });

  it('should clear recipe list', () => {
    expect(reducer(initialState, {
      type: types.CLEAR_RECIPES,
      payload: []
    })).toEqual({
      ...initialState,
      allRecipes: [],
      userRecipes: [],
      recipeItem: {},
      del_recipe: { success: false }
    });
  });
});
