import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

// import { allRecipes } from '../__mocks__/recipeMocks';
import { Navbar } from '../../../src/components/Navbar';

test('should render navbar correctly with empty props', () => {
  const wrapper = mount(<BrowserRouter>
    <Navbar />
  </BrowserRouter>);
  expect(wrapper).toMatchSnapshot();
});
