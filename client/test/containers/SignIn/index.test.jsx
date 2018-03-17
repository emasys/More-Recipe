import React from 'react';
import { mount, shallow } from 'enzyme';
import Router from 'react-mock-router';

// Component
import { SignIn, mapStateToProps } from '../../../src/containers/SignIn/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/containers/validator/index');

jest.mock('../../../src/components/Navbar');

const props = {
  msg: 'you cannot view this page',
  reset: {},
  signin: fakeStore.user,
  signIn: jest.fn(),
  compareToken: jest.fn(),
  history: { push: jest.fn() },
  sendToken: jest.fn(),
  clearAuthInfo: jest.fn()
};
describe('Test suite for SignIn page', () => {
  describe('sign in', () => {
    beforeEach(() => {
      wrapper = mount(<Router>
        <SignIn {...props} />
      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('h4.mt-10.text-white.mb-10.pr-50.pl-50.pb-20').text()).toMatch('We trust it has been an amazing experience for you so far... Keep adding spices to life!');
    });

    it('Should complete login form and submit', () => {
      const handleSubmit = jest.spyOn(SignIn.prototype, 'handleSubmit');
      // const onFocus = jest.spyOn(SignIn.prototype, 'onFocus');
      const clearError = jest.spyOn(SignIn.prototype, 'clearError');
      const app = mount(<Router><SignIn {...props} /></Router>);

      app
        .find("input[name='email']")
        .simulate('change', { target: { value: 'sample@example.com' } });
      app.find("input[name='pass']").simulate('focus');
      app
        .find("input[name='pass']")
        .simulate('change', { target: { value: 'p@ssw0rd' } });
      app.find('form').simulate('submit');

      expect(handleSubmit).toHaveBeenCalled();
      expect(clearError).toHaveBeenCalled();
    });

    it('Should complete reset password form and submit', () => {
      const generateToken = jest.spyOn(SignIn.prototype, 'generateToken');
      const onFocus = jest.spyOn(SignIn.prototype, 'onFocus');
      const onChange = jest.spyOn(SignIn.prototype, 'onChange');
      const onBlur = jest.spyOn(SignIn.prototype, 'onBlur');
      const resetPassword = jest.spyOn(SignIn.prototype, 'resetPassword');

      const app = mount(<Router><SignIn {...props} /></Router>);

      app.find('span#forgotPassword').simulate('click');
      expect(app).toMatchSnapshot();
      app
        .find("input[name='recoveryEmail']")
        .simulate('change', { target: { value: 'sample007@example.com' } });
      app.find('#sendToken').simulate('click');
      expect(generateToken).toHaveBeenCalled();
      app
        .find("input[name='newPassword']")
        .simulate('change', { target: { value: 'p@ssw0rd' } });
      app.find("input[name='newPassword']").simulate('focus');
      app.find("input[name='newPassword']").simulate('blur');
      expect(onBlur).toHaveBeenCalled();
      expect(onFocus).toHaveBeenCalled();
      app
        .find("input[name='confirmPassword']")
        .simulate('change', { target: { value: 'p@ssw0rd' } });
      app
        .find("input[name='token']")
        .simulate('change', { target: { value: '1234' } });
      expect(onChange).toHaveBeenCalled();
      app.find('form').simulate('submit');
      expect(resetPassword).toBeCalled();
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        user: {},
        isLoading: false
      };
      expect(mapStateToProps(initialState).signin).toEqual({});
      expect(mapStateToProps(initialState).isLoading).toEqual(false);
    });
  });

  it('should call componentWillReceiveProps', () => {
    const app = shallow(<SignIn {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
    const newProps = {
      user: {
        compareToken: { success: true },
        reset: {
          success: true,
          status: 'updated'
        }
      }
    };

    const nextProps = {
      user: {
        signIn: { tokenStatus: true }
      }
    };

    app.setProps(newProps);
    expect(compWRP).toHaveBeenCalled();
    expect(instance.state.tokenError).toBe('d-none');

    app.setProps(nextProps);
    expect(compWRP).toHaveBeenCalled();
  });
});
