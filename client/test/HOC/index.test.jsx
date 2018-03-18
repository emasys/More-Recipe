import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import withHoc from '../../src/components/HOC/index';
import fakeStore from '../__mocks__/fakeStore';
import { unauthenticatedFakeStore } from '../__mocks__/fakeStore';


let store = createMockStore(fakeStore);


describe('higher-order component', () => {
  let MockComponent, WrapperComponent;

  beforeEach(() => {
    class MockComponent extends Component {
      render() {
        return (<div>Component</div>);
      }
    }

    WrapperComponent = withHoc(MockComponent);
  });

  test('withHoc should render without crashing', () => {
    const wrapper = mount(<Provider store={store}><WrapperComponent /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('withHoc should render with unauthenticated data without crashing', () => {
    store = createMockStore(unauthenticatedFakeStore);
    const props = {
      location: { pathname: '/signin' },
      history: { push: jest.fn() }
    };
    const wrapper = mount(<Provider store={store} ><WrapperComponent {...props} /></Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
