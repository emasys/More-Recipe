import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Footer from '../../src/components/Footer';

test('should render Footer correctly', () => {
  const wrapper = shallow(<Footer/>);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
