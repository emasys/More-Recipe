import React from 'react';
import { shallow } from 'enzyme';

// Component
import Ingredients from '../../../src/containers/RecipeItem/Ingredients';
// import { AddRecipe } from '../../../src/containers/AddRecipe/index';
import fakeStore from '../../__mocks__/fakeStore';

let wrapper = null;

describe('Test suite for add recipe page', () => {
  const props = {
    ingredients: fakeStore.recipes.recipeItem,
    data: fakeStore.user.userInfo
  };

  beforeEach(() => {
    wrapper = shallow(<Ingredients {...props} />);
  });
  it('Should render without errors', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
