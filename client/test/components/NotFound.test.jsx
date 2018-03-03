import React from 'react';
import { mount } from 'enzyme';

import NotFound from '../../src/components/NotFound';

jest.fn('react-router-dom');
test('should render favorite list correctly with one favorite recipe', () => {
  const wrapper = mount(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
