import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  Profile,
  mapStateToProps
} from '../../../src/containers/Profile/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/containers/Profile/helper');
jest.mock('../../../src/components/CatalogList');
jest.mock('../../../src/components/Navbar');

describe('Test suite for profile page component', () => {
  const props = {
    getUserInfo: jest.fn(),
    getUserRecipes: jest.fn(),
    clearRecipes: jest.fn(),
    updateUser: jest.fn(),
    uploadImg: jest.fn(),
    match: { params: { id: 1 } },
    user: [],
    userInfo: fakeStore.user.userInfo,
    recipes: {},
    auth: fakeStore.user,
    count: 1,
    delRecipe: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(<Router>
      <Profile {...props} />
    </Router>);
  });
  it('Should render with props', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should view more recipe', () => {
    const viewMore = jest.spyOn(Profile.prototype, 'viewMore');

    const app = mount(<Router><Profile {...props} /></Router>);

    app.find('button#viewMore').simulate('click', {
      preventDefault: () => {}
    });

    expect(viewMore).toHaveBeenCalled();
  });

  it('should delete a recipe', () => {
    const confirmDelete = jest.spyOn(Profile.prototype, 'confirmDelete');

    const app = mount(<Router><Profile {...props} /></Router>);

    app.find('button#confirmDelete').simulate('click', {
      preventDefault: () => {}
    });

    expect(confirmDelete).toHaveBeenCalled();
  });

  it('Should complete form and submit', () => {
    const showForm = jest.spyOn(Profile.prototype, 'showForm');
    const edit = jest.spyOn(Profile.prototype, 'editProfile');
    const blur = jest.spyOn(Profile.prototype, 'onFocus');
    const focus = jest.spyOn(Profile.prototype, 'onBlur');
    const hoverIn = jest.spyOn(Profile.prototype, 'hoverIn');
    const hoverOut = jest.spyOn(Profile.prototype, 'hoverOut');
    const goBack = jest.spyOn(Profile.prototype, 'goBack');


    const app = mount(<Router><Profile {...props} /></Router>);

    app.find('button#edit-profile').simulate('click', {
      preventDefault: () => {}
    });

    app.find('button#goBack').simulate('click', {
      preventDefault: () => {}
    });

    expect(goBack).toHaveBeenCalled();

    app.find('button#edit-profile').simulate('click', {
      preventDefault: () => {}
    });

    expect(showForm).toHaveBeenCalled();

    app.find("input[name='firstName']").simulate('change', { target: { value: 'emmy' } });
    app.find("input[name='firstName']").simulate('blur');
    app.find("input[name='firstName']").simulate('focus');
    app.find("input[name='lastName']").simulate('change', { target: { value: 'endy' } });
    app.find("TextareaAutosize[name='bio']")
      .simulate('change', { target: { value: 'Test writer' } });

    app.find('.img-wrapper').simulate('mouseEnter');
    app.find('.img-wrapper').simulate('mouseLeave');

    expect(hoverOut).toHaveBeenCalled();
    expect(hoverIn).toHaveBeenCalled();

    app.find('form').simulate('submit');

    expect(edit).toHaveBeenCalled();
    expect(blur).toHaveBeenCalled();
    expect(focus).toHaveBeenCalled();
  });


  it('should call componentWillReceiveProps and unmount', () => {
    const app = shallow(<Profile {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
    const newProps = {
      count: 1
    };
    const nextProps = {
      count: 20
    };

    // expect(props.clearRecipes).toHaveBeenCalled();

    app.setProps(newProps);
    expect(compWRP).toHaveBeenCalled();
    app.setProps(nextProps);
    expect(compWRP).toHaveBeenCalled();

    app.unmount();
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      recipes: { userRecipes: [], userInfo: {}, userRecipesCount: 0 },
      user: { userInfo: {}, updateUser: {} }
    };
    expect(mapStateToProps(initialState).count).toEqual(0);
    expect(mapStateToProps(initialState).recipes).toEqual([]);
    expect(mapStateToProps(initialState).userInfo).toEqual({});
    expect(mapStateToProps(initialState).auth)
      .toEqual({ userInfo: {}, updateUser: {} });
    expect(mapStateToProps(initialState).updateUser).toEqual({});
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
