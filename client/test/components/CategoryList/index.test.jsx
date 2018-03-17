import React from 'react';
import { shallow } from 'enzyme';

// Component
import CategoryList from '../../../src/components/CategoryList';

let wrapper = null;

describe('Test suite for Footer component', () => {
  beforeEach(() => {
    wrapper = shallow(<CategoryList />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
