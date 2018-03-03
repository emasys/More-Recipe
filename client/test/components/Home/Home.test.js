import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../../../src/components/Home';

const props = {
  recipes: { hotRecipes: [] },
  getHotRecipes: jest.fn()
};
jest.mock('../../../src/components/Navbar.jsx');

test('should render Home component correctly', () => {
  const wrapper = mount(<MemoryRouter>
    <Home {...props} />
  </MemoryRouter>);
  expect(wrapper).toMatchSnapshot();
});
