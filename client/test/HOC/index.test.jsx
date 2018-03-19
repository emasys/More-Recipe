import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import withHoc from '../../src/components/HOC/index';
import fakeStore, { unauthenticatedFakeStore } from '../__mocks__/fakeStore';
import Footer from '../../src/components/Footer';

let store = createMockStore(fakeStore);

describe('higher-order component', () => {
  let WrapperComponent;

  beforeEach(() => {
    WrapperComponent = withHoc(Footer);
  });

  test('withHoc should render without crashing', () => {
    const wrapper = mount(<Provider store={store}>
      <WrapperComponent />
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('withHoc should render with unauthenticated data without crashing', () => {
    store = createMockStore(unauthenticatedFakeStore);
    const props = {
      location: { pathname: '/signin' },
      history: { push: jest.fn() }
    };
    const wrapper = mount(<Provider store={store} >
      <WrapperComponent {...props} />
    </Provider>);
    expect(wrapper).toMatchSnapshot();
  });
});
