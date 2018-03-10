import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../../src/components/NotFound';

jest.fn('react-router-dom');
test('should render 404 page without errors', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
