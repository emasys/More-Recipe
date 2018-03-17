import React from 'react';
import { mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import { BigNavbar, mapStateToProps } from '../../../src/components/BigNavbar';
import * as props from '../../__mocks__/navbarMocks';
import Auth from '../../../src/components/auth';

const logout = jest.spyOn(Auth, 'logout');

let wrapper = null;
let wrapperAuthenticated = null;

describe('Test suite for Big Navbar component', () => {
  beforeEach(() => {
    wrapper = mount(<Router>
      <BigNavbar {...props.props} />
    </Router>);

    wrapperAuthenticated = mount(<Router>
      <BigNavbar {...props.propsAuth} />
    </Router>);
  });

  describe('View as an unauthenticated user', () => {
    it('Should render without errors', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('View as an authenticated user', () => {
    it('Should render without errors', () => {
      expect(wrapperAuthenticated.length).toEqual(1);
      expect(wrapperAuthenticated.find('.nb').text()).toMatch('More Recipes');
      expect(wrapperAuthenticated.find('#greetings a').text()).toMatch('Hi admin,');
      wrapperAuthenticated.find('#logout').simulate('click');
      expect(logout).toBeCalled();
    });

    it('should match snapshot', () => {
      expect(wrapperAuthenticated).toMatchSnapshot();
    });
  });

  it('should test mapStateToProps', () => {
    const state = {
      user: { user: 'emmy' }
    };
    expect(mapStateToProps(state).auth).toEqual({ user: 'emmy' });
  });
});
