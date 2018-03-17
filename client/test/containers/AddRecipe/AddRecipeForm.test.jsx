import React from 'react';
import { shallow, mount } from 'enzyme';

// Component
import AddRecipeForm from '../../../src/containers/AddRecipe/AddRecipeForm';
import { AddRecipe } from '../../../src/containers/AddRecipe/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

describe('Test suite for add recipe page', () => {
  const props = {
    handleForm: jest.fn(),
    onFocus: jest.fn(),
    state: { required: false, nameConflict: false }
  };

  beforeEach(() => {
    wrapper = mount(<AddRecipeForm {...props} />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Should complete form and submit', () => {
    wrapper.find("input[name='recipe']").instance().value = 'How to cook beans';
    wrapper.find("textarea[name='description']").instance().value =
      'some description';
    wrapper.find("textarea[name='direction']").instance().value =
      'some direction';
    wrapper.find("textarea[name='ingredients']").simulate('focus');
    expect(props.onFocus).toHaveBeenCalled();
    wrapper.find("textarea[name='ingredients']").instance().value =
      'water, salt';
    wrapper.find('form').simulate('submit');

    expect(props.handleForm).toHaveBeenCalled();
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
