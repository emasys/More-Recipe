import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  UserProfile,
  mapStateToProps
} from '../../../src/containers/UserProfile/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/components/CatalogList');
jest.mock('../../../src/components/Navbar');

describe('Test suite for User profile component', () => {
  const props = {
    userInfo: fakeStore.user.userInfo,
    getUserRecipes: jest.fn(),
    clearRecipes: jest.fn(),
    user: [],
    getUserInfo: jest.fn(),
    match: { params: { id: 1 } },
    count: 1,
    recipes: fakeStore.recipes.userRecipes
  };
  beforeEach(() => {
    wrapper = mount(<Router>
      <UserProfile {...props} />
    </Router>);
  });
  it('Should render with props', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('small.header-title').text()).toMatch('admin');
  });

  it('Should render without props', () => {
    const miniProps = {
      userInfo: null,
      getUserRecipes: jest.fn(),
      clearRecipes: jest.fn(),
      user: [],
      getUserInfo: jest.fn(),
      match: { params: { id: 1 } },
      count: 1,
      recipes: fakeStore.recipes.userRecipes
    };
    const app = mount(<Router>
      <UserProfile {...miniProps} />
    </Router>);

    expect(app.length).toEqual(1);
    expect(app).toMatchSnapshot();
    expect(app.find('p#loading').text()).toMatch('loading...');
  });

  it('Should render without full names', () => {
    const miniProps = {
      userInfo: {
        data: {
          id: 1,
          firstName: null,
          lastName: null,
          bio: null,
          email: 'emasysnd@gmail.com',
          country: null,
          avatar: null,
          moniker: 'admin'
        }
      },
      getUserRecipes: jest.fn(),
      clearRecipes: jest.fn(),
      user: [],
      getUserInfo: jest.fn(),
      match: { params: { id: 1 } },
      count: 1,
      recipes: fakeStore.recipes.userRecipes
    };
    const app = mount(<Router>
      <UserProfile {...miniProps} />
    </Router>);

    expect(app.length).toEqual(1);
    expect(app).toMatchSnapshot();
    expect(app.find('h2.mb-10.bolder').text()).toMatch('admin');
  });

  it('Should click on the viewMore button', () => {
    const app = shallow(<UserProfile {...props} />);
    const instance = app.instance();
    const view = jest.spyOn(instance, 'viewMore');

    app
      .find('button.btn.btn-lg.btn-outline-dark.text-center')
      .simulate('click', {
        preventDefault: () => {}
      });
  });

  it('should call componentWillReceiveProps and unmount', () => {
    const app = shallow(<UserProfile {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
    const newProps = {
      count: 1
    };
    const nextProps = {
      count: 20
    };


    app.setProps(newProps);
    expect(compWRP).toHaveBeenCalled();
    app.setProps(nextProps);
    expect(compWRP).toHaveBeenCalled();

    app.unmount();
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      recipes: { userRecipes: [], userInfo: {}, userRecipesCount: 0 },
      user: { userInfo: {} }
    };
    expect(mapStateToProps(initialState).count).toEqual(0);
    expect(mapStateToProps(initialState).recipes).toEqual([]);
    expect(mapStateToProps(initialState).userInfo).toEqual({});
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
