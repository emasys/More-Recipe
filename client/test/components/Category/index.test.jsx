import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  Category,
  mapStateToProps
} from '../../../src/components/Category/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('react-infinite-scroll-component');
jest.mock('../../../src/components/Navbar');
jest.mock('../../../src/components/CatalogList');

describe('Test suite for Manage User component', () => {
  const props = {
    getCategory: jest.fn(),
    category: {},
    match: { params: { cat: 'Breakfast' } },
    recipes: fakeStore.recipes,
    history: {}
  };
  beforeEach(() => {
    wrapper = mount(<Router>
      <Category {...props} />
    </Router>);
  });
  it('Should render Lunch category without errors', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.float-left.header-title').text()).toMatch('Breakfast');
    expect(wrapper.find('a.btn.btn-dark.hvr-icon-wobble-horizontal').text()).toMatch('see all recipes');
  });

  it('Should click on the delete button', () => {
    wrapper.find('#catalog').simulate('click');
  });

  it('should call componentWillReceiveProps', () => {
    const app = shallow(<Category {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
    const newProps = {
      getCategory: jest.fn(),
      category: {},
      match: { params: { cat: 'Breakfast' } },
      recipes: { count: 2 },
      history: {}
    };
    app.setProps(newProps);
    expect(compWRP).toHaveBeenCalled();
    expect(instance.state.showMore).toBe(false);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      recipes: {}
    };
    expect(mapStateToProps(initialState).recipes).toEqual({});
  });
});
