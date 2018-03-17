import React from 'react';
import { shallow } from 'enzyme';

// Component
import { Preloader, mapStateToProps } from '../../../src/components/Preloader';

let wrapper = null;

describe('Test suite for Preloader component', () => {
  describe('show proloader when a network request is triggered', () => {
    const props = {
      isLoading: true
    };
    beforeEach(() => {
      wrapper = shallow(<Preloader {...props} />);
    });
    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should test mapStateToProps', () => {
      const initialState = {
        isLoading: true
      };
      expect(mapStateToProps(initialState).isLoading).toEqual(true);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('hide preloader after a network request is complete', () => {
    const props = {
      isLoading: false
    };
    beforeEach(() => {
      wrapper = shallow(<Preloader {...props} />);
    });
    it('Should render without errors', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
