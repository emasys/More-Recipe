import React from 'react';
import { mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import { Home, mapStateToProps } from '../../../src/components/Home';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/components/Navbar');
jest.mock('../../../src/components/BigNavbar');
jest.mock('../../../src/components/CatalogList');
jest.mock('react-sticky-dynamic-header');

describe('Test suite for Home page', () => {
  describe('Render component for unauthenticated user', () => {
    const props = {
      recipes: fakeStore.recipes,
      getHotRecipes: jest.fn(),
      auth: { isLoggedIn: false }
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <Home {...props} />
      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('#welcome-note').text()).toMatch('This is a platform for you to share the awesome and exciting recipe ideas you have invented or learnt.Recipes are by nature derivative and meant to be shared that is how they improve, are changed, how new ideas are formed.Have fun as you share and explore exciting recipesSignup to Get Started');
    });

    it('should assert for texts on action buttons', () => {
      expect(wrapper.find('a.signUp-btn').text()).toMatch('Signup to Get Started');
      expect(wrapper.find('h4.float-left.header-title').text()).toMatch('Top Recipes');
      expect(wrapper.find('a#view-all-recipes').text()).toMatch('see all recipes');
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        user: {},
        recipes: {}
      };
      expect(mapStateToProps(initialState).auth).toEqual({});
      expect(mapStateToProps(initialState).recipes).toEqual({});
    });
  });

  describe('Render component for authenticated user', () => {
    const props = {
      recipes: fakeStore.recipes,
      getHotRecipes: jest.fn(),
      auth: fakeStore.user
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <Home {...props} />
      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should assert for texts on action buttons', () => {
      expect(wrapper.find('a.signUp-btn').text()).toMatch('Add new recipe');
      expect(wrapper.find('h4.float-left.header-title').text()).toMatch('Top Recipes');
      expect(wrapper.find('a#view-all-recipes').text()).toMatch('see all recipes');
    });
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
