import React from 'react';
import { mount } from 'enzyme';
import { allRecipes } from '../__mocks__/recipeMocks';

import CatalogList from '../../src/components/CatalogList';

jest.mock('react-router-dom');
test('should render catalog list correctly', () => {
  const wrapper = mount(<CatalogList catalog={allRecipes.recipes} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render catalog list correctly with empty props', () => {
  const wrapper = mount(<CatalogList catalog={[]} />);
  expect(wrapper).toMatchSnapshot();
});
