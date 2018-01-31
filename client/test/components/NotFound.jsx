import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';

import NotFound from '../../src/components/NotFound';

test('should render favorite list correctly with one favorite recipe', () => {
  const wrapper = mount(<BrowserRouter>
    <NotFound />
  </BrowserRouter>);
  expect(wrapper).toMatchSnapshot();
});
