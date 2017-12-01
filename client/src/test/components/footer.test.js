import React, { Component } from 'react';
import Footer from '../../components/footer';
import ReactShallowRenderer from 'react-test-renderer/shallow';

test('should render correctly', () => {
  const renderer = new ReactShallowRenderer();
  renderer.render(<Footer />);
  expect(renderer.getRenderOutput()).toMatchSnapshot();
});
