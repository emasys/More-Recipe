import React from 'react';
import { mount, shallow } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  RecipeItem,
  mapStateToProps
} from '../../../src/containers/RecipeItem/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/components/Navbar');
jest.mock('../../../src/containers/RecipeItem/Reviews');

describe('Test suite for recipe detail page', () => {
  describe('Render component with incomplete props', () => {
    const props = {
      userInfo: {
        data: {
          id: 1,
          firstName: '',
          lastName: '',
          bio: '',
          email: '',
          country: '',
          avatar: '',
          moniker: ''
        }
      },
      uploadImg: jest.fn(),
      downvote: jest.fn(),
      upvote: jest.fn(),
      setFavorite: jest.fn(),
      editRecipe: jest.fn(),
      delRecipe: jest.fn(),
      history: { push: jest.fn() },
      recipes: { recipeItem: {} },
      getRecipeItem: jest.fn(),
      match: { params: { id: 1 } },
      clearRecipes: jest.fn(),
      auth: fakeStore.user
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <RecipeItem {...props} />
                      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('div.col-lg-6.col-md-6.col-sm-8.mb-5.recipe-image').text()).toMatch('Loading...');
      expect(wrapper.find('div.p-10.direction.rounded.bg-light').text()).toMatch('loading...');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Render component with complete props', () => {
    const props = {
      userInfo: fakeStore.user.userInfo,
      uploadImg: jest.fn(),
      downvote: jest.fn(),
      upvote: jest.fn(),
      setFavorite: jest.fn(),
      editRecipe: jest.fn(),
      delRecipe: jest.fn(),
      history: { push: jest.fn() },
      recipes: fakeStore.recipes,
      getRecipeItem: jest.fn(),
      match: { params: { id: 1 } },
      clearRecipes: jest.fn(),
      auth: fakeStore.user,
      getRecipeReactions: jest.fn()
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <RecipeItem {...props} />
                      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('div.p-10.direction.rounded.bg-light').text()).toMatch('just do it');
      expect(wrapper.find('h2.wrapWord.text-capitalize').text()).toMatch('How to cook yam');
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('Should delete a recipe', () => {
      const deleteRecipe = jest.spyOn(RecipeItem.prototype, 'delRecipe');
      const app = mount(<Router>
        <RecipeItem {...props} />
                        </Router>);
      expect(app.find('a.text-dark.rounded').text()).toMatch('Lunch');
      app.setState({ edit: true });
      expect(app).toMatchSnapshot();
      app.find('button.btn.btn-danger.btn-lg').simulate('click');
      expect(deleteRecipe).toHaveBeenCalled();
    });

    it('should call componentWillReceiveProps and initiate delete process', () => {
      const app = shallow(<RecipeItem {...props} />);
      const instance = app.instance();
      const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
      const deleteRecipeInit = jest.spyOn(instance, 'deleteRecipeInit');
      app.setProps(props);
      expect(compWRP).toHaveBeenCalled();
      expect(instance.state.recipeItem).toHaveProperty('recipe');
      app.find('i#floating-delete').simulate('click', {
        preventDefault: () => {}
      });
      expect(deleteRecipeInit).toHaveBeenCalled();
      expect(app).toMatchSnapshot();

      const newProps = {
        userInfo: fakeStore.user.userInfo,
        uploadImg: jest.fn(),
        downvote: jest.fn(),
        upvote: jest.fn(),
        setFavorite: jest.fn(),
        editRecipe: jest.fn(),
        delRecipe: jest.fn(),
        history: { push: jest.fn() },
        recipes: { recipeItem: { message: 'Not found' } },
        getRecipeItem: jest.fn(),
        match: { params: { id: 1 } },
        clearRecipes: jest.fn(),
        auth: {
          message: null,
          authInfo: {
            isLoggedIn: false,
            userId: 1,
            username: 'admin'
          },
          isLoggedIn: false,
        }
      };

      app.setProps(newProps);
      expect(compWRP).toHaveBeenCalled();
      app.unmount();
    });

    it('should simulate click on all the reaction buttons', () => {
      const favRecipe = jest.spyOn(RecipeItem.prototype, 'favIt');
      const upvote = jest.spyOn(RecipeItem.prototype, 'upvote');
      const downvote = jest.spyOn(RecipeItem.prototype, 'downvote');

      const app = mount(<Router>
        <RecipeItem {...props} />
                        </Router>);
      expect(app).toMatchSnapshot();
      // expect(app.find('a.text-dark.rounded').text()).toMatch('Lunch');
      app.find('i#favorite-recipe').simulate('click');
      expect(favRecipe).toHaveBeenCalled();
      app.find('i#like').simulate('click');
      expect(upvote).toHaveBeenCalled();
      app.find('i#dislike').simulate('click');
      expect(downvote).toHaveBeenCalled();
    });


    it('should edit a recipe and submit', () => {
      const app = shallow(<RecipeItem {...props} />);
      const instance = app.instance();
      const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
      const showEditForm = jest.spyOn(instance, 'showEditForm');
      instance.goBack({
        preventDefault: () => {}
      });
      expect(instance.state.editRecipeItem).toBe(false);
      app.setProps(props);
      instance.hoverIn();
      expect(instance.state.status).toBe('show');
      instance.hoverOut();
      expect(instance.state.status).toBe('fade');
      expect(compWRP).toHaveBeenCalled();
      app.find('i#floating-edit').simulate('click', {
        preventDefault: () => {}
      });

      expect(showEditForm).toHaveBeenCalled();
      expect(app).toMatchSnapshot();
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        favorite: {},
        votes: {},
        review: {},
        recipes: {},
        user: { userInfo: {} }
      };
      expect(mapStateToProps(initialState).auth).toEqual({ userInfo: {} });
      expect(mapStateToProps(initialState).recipes).toEqual({});
      expect(mapStateToProps(initialState).review).toEqual({});
    });
  });
});

