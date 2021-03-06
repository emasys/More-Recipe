import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import instance from '../../../src/config/axios';
import { isLoggedInFalse } from '../../__mocks__/authMocks';
import * as actions from '../../../src/actions/recipeActions';
import * as recipeMocks from '../../__mocks__/recipeMocks';
import * as type from '../../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for recipe actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should return an array of objects containing load state and all the recipes available', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: recipeMocks.allRecipes
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      { type: type.ALL_RECIPES, payload: recipeMocks.allRecipes },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getRecipes(1, 0)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should test for errors while fetching all the recipes available', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      { type: type.ALL_RECIPES, payload: { success: false } },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getRecipes(1, 0)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of objects containing load state and single recipe detail', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.singleRecipe }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SINGLE_RECIPE,
        payload: { success: true, recipe: recipeMocks.singleRecipe }
      },
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getRecipeItem(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should test for errors while fetching single recipe detail', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SINGLE_RECIPE,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getRecipeItem(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of objects containing single recipe detail and all reaction detail', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.singleRecipe }
      });
    });

    const expectedActions = [
      {
        type: type.SINGLE_RECIPE_REACTION,
        payload: { success: true, recipe: recipeMocks.singleRecipe }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getRecipeReactions(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should test for errors while fetching single recipe detail and all reaction detail', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      {
        type: type.SINGLE_RECIPE_REACTION,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getRecipeReactions(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of objects containing edited recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.singleRecipe }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.EDIT_RECIPE,
        payload: { success: true, recipe: recipeMocks.singleRecipe }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.editRecipe({ category: 'breakfast' }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should test for errors while fetching edited recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.EDIT_RECIPE,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.editRecipe({ category: 'breakfast' }, 1))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return a confirmation that a recipe was deleted', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.deleteRecipe }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.DELETE_RECIPE,
        payload: { success: true, recipe: recipeMocks.deleteRecipe }
      },
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.delRecipe(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should test for errors while a recipe is been deleted', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.DELETE_RECIPE,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.delRecipe(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of recipes that match search parameter', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.allRecipes }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SEARCH,
        payload: { success: true, recipe: recipeMocks.allRecipes }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.searchRecipes({ query: 'water' }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should test for error while fetching searched parameter', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.SEARCH,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.searchRecipes({ query: 'water' }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an object containing the details of the new recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.singleRecipe.recipeItem }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.NEW_RECIPE,
        payload: { success: true, recipe: recipeMocks.singleRecipe.recipeItem }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.addRecipe({ name: 'how to cook something' }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should test for errors while adding new recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.NEW_RECIPE,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.addRecipe({ name: 'how to cook something' }))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should return an array of objects containing popular recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.allRecipes }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.HOT_RECIPES,
        payload: { success: true, recipe: recipeMocks.allRecipes }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getHotRecipes(1, 0, '')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should test for errors while fetching popular recipes', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.HOT_RECIPES,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getHotRecipes(1, 0, '')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an array of objects containing recipes of a particular category', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, recipe: recipeMocks.allRecipes }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.GET_CATEGORY,
        payload: { success: true, recipe: recipeMocks.allRecipes }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.getCategory({ category: 'lunch' }, 1, 0))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should test for errors while fetching recipes of a particular category', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: { success: false }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.GET_CATEGORY,
        payload: { success: false }
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store
      .dispatch(actions.getCategory({ category: 'lunch' }, 1, 0))
      .then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe('Clear recipe list', () => {
  it('should create an action to clear recipe list', () => {
    const expectedAction = {
      type: type.CLEAR_RECIPES,
      payload: []
    };
    expect(actions.clearRecipes()).toEqual(expectedAction);
  });

  it('should create an action to clear searched recipe list', () => {
    const expectedAction = {
      type: type.RESET_SEARCH,
      payload: []
    };
    expect(actions.resetSearch()).toEqual(expectedAction);
  });
});
