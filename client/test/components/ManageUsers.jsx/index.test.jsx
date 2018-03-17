import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  ManageUsers,
  mapStateToProps
} from '../../../src/components/ManageUsers';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

jest.mock('../../../src/components/Navbar');

describe('Test suite for Manage User component', () => {
  const props = {
    users: fakeStore.user.allUsers,
    deleteUser: jest.fn(),
    getAllUsers: jest.fn()
  };
  beforeEach(() => {
    wrapper = mount(<Router>
      <ManageUsers {...props} />
    </Router>);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.moniker').text()).toMatch('admin');
  });

  it('Should click on the delete button', () => {
    const app = shallow(<ManageUsers {...props} />);
    const instance = app.instance();
    const deleteUser = jest.spyOn(instance, 'deleteUser');

    app.find('.delete-user-btn').simulate('click', {
      preventDefault: () => {}
    });
    expect(deleteUser).toHaveBeenCalled();
    wrapper.find('.btn.btn-danger.btn-lg').simulate('click', {
      preventDefault: () => {}
    });
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      user: { allUsers: {} }
    };
    expect(mapStateToProps(initialState).users).toEqual({});
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
