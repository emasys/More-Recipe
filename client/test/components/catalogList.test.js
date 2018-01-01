import React from 'react';
import { shallow } from 'enzyme';
import CatalogList from '../../src/components/CatalogList';
import initialState from '../../src/reducers/initialState';

test('should render catalog list correctly', () => {
  const wrapper = shallow(<CatalogList catalog={initialState} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render catalog list correctly with empty props', () => {
  const wrapper = shallow(<CatalogList catalog={{ success: true, recipes: [] }} />);
  expect(wrapper).toMatchSnapshot();
});
