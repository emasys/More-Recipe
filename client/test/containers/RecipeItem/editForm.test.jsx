import React from 'react';
import { shallow } from 'enzyme';

// Component
import EditForm from '../../../src/containers/RecipeItem/EditForm';

let wrapper = null;

describe('Test suite for add recipe page', () => {
  const props = {
    handleSubmit: jest.fn(),
    goBack: jest.fn(),
    state: {}
  };

  beforeEach(() => {
    wrapper = shallow(<EditForm {...props} />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('Should complete form and submit', () => {
    wrapper
      .find("input[name='recipe']")
      .simulate('change', { target: { value: 'How to boil water' } });
    wrapper
      .find("TextareaAutosize[name='description']")
      .simulate('change', { target: { value: 'A regular food' } });
    wrapper
      .find("TextareaAutosize[name='direction']")
      .simulate('change', { target: { value: 'Just do it' } });
    wrapper
      .find("TextareaAutosize[name='ingredients']")
      .simulate('change', { target: { value: 'water, salt' } });
    expect(wrapper.find("input[type='submit']").length).toEqual(1);
    wrapper.find('form').simulate('submit');
    wrapper.find('button.btn.btn-block.btn-lg.col-12.bg-warning.hovered').simulate('click');
    expect(props.goBack).toHaveBeenCalled();
    expect(props.handleSubmit).toBeCalled();
  });
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
