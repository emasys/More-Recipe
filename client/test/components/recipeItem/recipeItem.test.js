import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DumbRecipeItem } from '../../../src/containers/RecipeItem';

const props = {
  userInfo: {
    data: {
      avatar:
        'https://res.cloudinary.com/emasys/image/upload/v1516859258/fhnah0swk08ow8orie0e.png',
      bio: 'Admin of this great platform.',
      country: 'Nigeria',
      email: 'emasysnd@gmail.com',
      firstName: 'emasys',
      id: 1,
      lastName: 'endy',
      moniker: 'admin'
    }
  },
  uploadImg: jest.fn(),
  downvote: jest.fn(),
  upvote: jest.fn(),
  setFavorite: jest.fn(),
  getRecipeReactions: jest.fn(),
  editRecipe: jest.fn(),
  delRecipe: jest.fn(),
  history: { push: jest.fn() },
  getRecipe: jest.fn(),
  getUserInfo: jest.fn(),
  recipes: {
    recipeItem: {
      recipe: {
        id: 26,
        name: 'msnbxmanmaxmnaxbaxbnbxasdadaasdad ba xbn xanb xaxasxxax',
        ingredients: ['xs'],
        direction: 'xax',
        searchIng: null,
        recipeCount: null,
        description: 'axx',
        category: 'Breakfast',
        foodImg:
          'http://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 11,
        comments: 1,
        favorite: 2,
        createdAt: '2017-12-31T18:42:38.431Z',
        updatedAt: '2018-01-14T18:55:09.486Z'
      }
    }
  },
  netReq: false,
  getRecipeItem: jest.fn(),
  match: { params: jest.fn() }
};
jest.mock('../../../src/components/Navbar.jsx');
jest.mock('../../../src/containers/RecipeItem/Reviews.jsx');

describe('Example test', () => {
  test('should render recipe item component', () => {
    const wrapper = mount(<BrowserRouter>
      <DumbRecipeItem {...props} />
    </BrowserRouter>);
    expect(wrapper.find('RecipeItem').length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
