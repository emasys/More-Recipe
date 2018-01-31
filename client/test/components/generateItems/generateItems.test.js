import React from 'react';
import { mount } from 'enzyme';
import GenerateRecipeItems from '../../../src/containers/RecipeItem/GenerateRecipeItems';
import { singleRecipe } from '../../__mocks__/recipeMocks';

const props = {
  handleImg: jest.fn(),
  state: singleRecipe,
  reactionUp: [],
  reactionDown: [],
  hoverIn: jest.fn(),
  hoverOut: jest.fn(),
  handleDrop: jest.fn(),
  favIt: jest.fn(),
  upvote: jest.fn(),
  downvote: jest.fn(),
  foodImg: ''
};
jest.mock('react-router-dom');
test('should render favorite list correctly with one favorite recipe', () => {
  const wrapper = mount(<GenerateRecipeItems {...props} />);
  expect(wrapper.find('GeneraterecipeItem').length).toBe(1);
  expect(wrapper).toMatchSnapshot();
});

test('should render favorite', () => {
  const wrapper = mount(<GenerateRecipeItems {...props} />);
  const favBtn = wrapper.find('.fa-heart');
  favBtn.simulate('click');
  expect(favBtn.length).toBe(1);
  expect(props.favIt).toBeCalled();
  expect(wrapper).toMatchSnapshot();
});
