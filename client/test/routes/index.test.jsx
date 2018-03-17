import React from 'react';
import { shallow } from 'enzyme';

// Component
import Routes from '../../src/routes/AppRoutes';

let wrapper = null;

describe('Test suite for routes', () => {
  beforeEach(() => {
    wrapper = shallow(<Routes />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
