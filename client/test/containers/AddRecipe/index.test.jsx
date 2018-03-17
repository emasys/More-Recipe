import React from 'react';
import { mount, shallow } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  AddRecipe,
  mapStateToProps
} from '../../../src/containers/AddRecipe/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/components/Navbar');

const props = {
  new_recipe: {},
  history: {},
  addRecipe: jest.fn(),
  auth: fakeStore.user
};
describe('Test suite for Add recipe page', () => {
  describe('Render component for unauthenticated user', () => {
    beforeEach(() => {
      wrapper = mount(<Router>
        <AddRecipe {...props} />
      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('h3.text-white').text()).toMatch('Hey admin');
    });

    it.skip('Should complete form and submit', () => {
      const app = shallow(<AddRecipe {...props} />);
      const instance = app.instance();
      const handleSubmit = jest.spyOn(instance, 'handleForm');
      wrapper.find("input[name='recipe']").instance().value =
        'How to cook beans';
      wrapper.find("textarea[name='description']").instance().value =
        'some description';
      wrapper.find("textarea[name='direction']").instance().value =
        'some direction';
      wrapper.find("textarea[name='ingredients']").instance().value =
        'water, salt';
      wrapper.find('form').simulate('submit');

      expect(handleSubmit).toHaveBeenCalled();
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
      expect(mapStateToProps(initialState).new_recipe).toEqual({});
    });
  });

  it('should call onFocused', () => {
    const app = mount(<AddRecipe {...props} />);
    expect(app).toMatchSnapshot();
    app.find("textarea[name='ingredients']").simulate('focus');
  });

  it.skip('should call handleForm', () => {
    const app = mount(<AddRecipe {...props} />);
    const instance = app.instance();
    const handleForm = jest.spyOn(instance, 'handleForm');
    app.find('form').simulate('submit');
    expect(handleForm).toHaveBeenCalled();
  });
  it('should call componentWillReceiveProps', () => {
    const app = shallow(<AddRecipe {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
    const newProps = {
      new_recipe: {
        new_recipe: { data: { success: false, error: 'conflict' } }
      },
      history: {},
      addRecipe: jest.fn(),
      auth: fakeStore.user
    };
    const nextProps = {
      new_recipe: {
        new_recipe: { success: true, recipe: [] }
      },
      history: { push: jest.fn() },
      addRecipe: jest.fn(),
      auth: fakeStore.user
    };
    app.setProps(newProps);
    expect(compWRP).toHaveBeenCalled();
    app.setProps(nextProps);
    expect(compWRP).toHaveBeenCalled();
    expect(instance.state.nameConflict).toBe(false);
  });
});
