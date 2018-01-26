import React from 'react';
import { mount } from 'enzyme';

// import { allRecipes } from '../__mocks__/recipeMocks';
import { Category } from '../../../src/components/Category';

const props = {
  getCategory: jest.fn(),
  category: {},
  match: { params: { cat: "Baking" } },
  recipes: {}
};
jest.mock('../../../src/components/Navbar.jsx');

test('should render category correctly', () => {
  const wrapper = mount(<Category {...props} />);
  expect(wrapper).toMatchSnapshot();
});
