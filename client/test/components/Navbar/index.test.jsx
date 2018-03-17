import React from 'react';
import { mount } from 'enzyme';
import Router from 'react-mock-router';


// components
import { Navbar } from '../../../src/components/Navbar';
import * as props from '../../__mocks__/navbarMocks';

let wrapperNotAuthenticated = null;
let wrapperAuthenticated = null;

describe('Test suite for Navbar component', () => {
  beforeEach(() => {
    wrapperNotAuthenticated = mount(<Router>
      <Navbar {...props.props} />
    </Router>);

    wrapperAuthenticated = mount(<Router>
      <Navbar {...props.propsAuth} />
    </Router>);
  });

  describe('View as an unauthenticated user', () => {
    it('Should render without errors', () => {
      expect(wrapperNotAuthenticated.length).toEqual(1);
      expect(wrapperNotAuthenticated.find('.nb').text()).toMatch('More Recipes');
      expect(wrapperNotAuthenticated.find('a#signUp').text()).toMatch('Sign up');
      expect(wrapperNotAuthenticated.find('a#signIn').text()).toMatch('Sign in');
    });

    it('should match snapshot', () => {
      expect(wrapperNotAuthenticated).toMatchSnapshot();
    });
  });

  describe('View as an authenticated user', () => {
    it('Should render without errors', () => {
      expect(wrapperAuthenticated.length).toEqual(1);
      expect(wrapperAuthenticated.find('.nb').text()).toMatch('More Recipes');
      expect(wrapperAuthenticated.find('.dropdown-header.text-center').text()).toMatch('Signed in as admin');
    });

    it('should match snapshot', () => {
      expect(wrapperAuthenticated).toMatchSnapshot();
    });
  });
});
