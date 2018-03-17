import React from 'react';
import { mount, shallow } from 'enzyme';
import Router from 'react-mock-router';

// Component
import { SignUp, mapStateToProps } from '../../../src/containers/SignUp/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;
jest.mock('../../../src/containers/validator/index');
jest.mock('../../../src/components/Navbar');

const props = {
  user: fakeStore.user,
  signUp: jest.fn()
};
describe('Test suite for Add recipe page', () => {
  describe('Render component for unauthenticated user', () => {
    beforeEach(() => {
      wrapper = mount(<Router>
        <SignUp {...props} />
      </Router>);
    });

    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
      expect(wrapper.find('h4.mt-10.text-white.p-10').text()).toMatch('We are extremely glad you have decided to join this elite family of recipe explorer, together we will make sure the world always have quality meals on their table. Thank You!');
    });

    it('Should complete form and submit', () => {
      const handleSubmit = jest.spyOn(SignUp.prototype, 'handleSubmit');
      const onFocus = jest.spyOn(SignUp.prototype, 'onFocused');
      const showerror = jest.spyOn(SignUp.prototype, 'showError');
      const onChange = jest.spyOn(SignUp.prototype, 'onChange');
      const app = mount(<Router>
        <SignUp {...props} />
      </Router>);

      app
        .find("input[name='email']")
        .simulate('change', { target: { value: 'sample@example.com' } });
      app
        .find("input[name='moniker']")
        .simulate('change', { target: { value: 'sample007' } });
      app
        .find("input[name='password']")
        .simulate('change', { target: { value: 'p@ssw0rd' } });
      app.find("input[name='email']").simulate('focus');
      app.find("input[name='moniker']").simulate('focus');
      app.find("input[name='password']").simulate('focus');
      expect(onFocus).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
      expect(showerror).toHaveBeenCalled();
      app
        .find("input[name='confirmPassword']")
        .simulate('change', { target: { value: 'p@ssw0rd' } });

      app.find('form').simulate('submit');

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        user: {}
      };
      expect(mapStateToProps(initialState).user).toEqual({});
    });
  });

  it('should call componentWillReceiveProps', () => {
    const app = shallow(<SignUp {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');
    const newProps = {
      user: {
        signUp: { data: { success: false, error: [{ path: 'email' }] } }
      },
      history: {}
    };
    const errorProps = {
      user: {
        signUp: { data: { success: false, error: [{ path: 'moniker' }] } }
      },
      history: {}
    };
    const nextProps = {
      user: {
        signUp: { success: true }
      },
      history: { push: jest.fn() },
      addRecipe: jest.fn(),
      auth: fakeStore.user
    };
    app.setProps(newProps);
    expect(compWRP).toHaveBeenCalled();
    app.setProps(errorProps);
    expect(compWRP).toHaveBeenCalled();
    app.setProps(nextProps);
    expect(compWRP).toHaveBeenCalled();
  });
});
