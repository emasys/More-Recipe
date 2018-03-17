import React from 'react';
import { shallow } from 'enzyme';

// Component
import Footer from '../../../src/components/Footer';

let wrapper = null;

describe('Test suite for Footer component', () => {
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
