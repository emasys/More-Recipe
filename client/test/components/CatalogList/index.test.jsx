import React from 'react';
import { mount, shallow } from 'enzyme';
import Router from 'react-mock-router';
import sinon from 'sinon';

// Component
import {
  CatalogList,
  mapStateToProps
} from '../../../src/components/CatalogList';
import fakeStore from '../../__mocks__/fakeStore';

// onHoverIn = jest.fn();

let wrapper = null;

describe('Test suite for catalog list', () => {
  describe('Render catalog list without delete button', () => {
    const props = {
      showDeleteBtn: false,
      catalog: fakeStore.recipes.hotRecipes,
      auth: fakeStore.user,
      isLoading: false
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <CatalogList {...props} />
      </Router>);
    });
    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Render catalog list with no recipe', () => {
    const props = {
      showDeleteBtn: true,
      catalog: [],
      auth: fakeStore.user,
      isLoading: false,
      deleteRecipe: jest.fn()
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <CatalogList {...props} />
      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
    });
    it('Should render a message - that no recipe is available', () => {
      expect(wrapper.find('.error-message p').text()).toMatch('No recipe here');
    });
  });
  describe('Render catalog list with delete button', () => {
    const props = {
      showDeleteBtn: true,
      catalog: fakeStore.recipes.hotRecipes,
      auth: fakeStore.user,
      isLoading: false,
      deleteRecipe: jest.fn()
    };
    beforeEach(() => {
      wrapper = mount(<Router>
        <CatalogList {...props} />
      </Router>);
    });
    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should check if delete button was rendered', () => {
      expect(wrapper.find('.delete-btn').length).toEqual(1);
      wrapper.find('.delete-btn').simulate('click');
      expect(props.deleteRecipe).toBeCalled();
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        isLoading: false
      };
      expect(mapStateToProps(initialState).isLoading).toEqual(false);
    });

    it('Should simulate hover', () => {
      const app = shallow(<CatalogList {...props} />);
      const instance = app.instance();
      const hoverIn = jest.spyOn(instance, 'onHoverIn');
      const hoverOut = jest.spyOn(instance, 'onHoverOut');

      app.find('.card').simulate('mouseEnter');
      expect(hoverIn).toHaveBeenCalled();
      app.find('.card').simulate('mouseLeave');
      expect(hoverOut).toHaveBeenCalled();
    });
  });
});
