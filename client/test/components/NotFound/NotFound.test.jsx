import React from 'react';
import { shallow } from 'enzyme';

// Component
import NotFound from '../../../src/components/NotFound';

let wrapper = null;

describe('Test suite for 404 page', () => {
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('#error_msg').text()).toMatch('The content you are looking for does not exist');
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
