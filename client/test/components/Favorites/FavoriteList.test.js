import React from 'react';
import { shallow, mount } from 'enzyme';
import FavoriteList from '../../../src/components/Favorites/FavoriteList';

const propsEmpty = {
  userFav: {
    favorites: []
  }
};

const favorites = {
  userFav: {
    favorites: [
      {
        id: 44,
        recipeId: 27,
        userId: 5,
        createdAt: '2018-01-10T04:33:00.481Z',
        updatedAt: '2018-01-10T04:33:00.481Z',
        Recipe: {
          id: 27,
          name: 'How to cook something cool',
          ingredients: [
            'water',
            'salt',
            'oil',
            'preloading is working fine now',
            'new stuff'
          ],
          direction: 'just do it, really, really?',
          description: 'just do it, really?',
          category: 'Appetisers',
          foodImg:
            'https://res.cloudinary.com/emasys/image/upload/v1515914279/ruwl3dswlgju81udttvd.jpg',
          userId: 5,
          upvote: 1,
          downvote: 0,
          reactionUp: [5],
          reactionDown: [],
          views: 1,
          comments: 38,
          favorite: 1,
          createdAt: '2018-01-09T19:43:09.761Z',
          updatedAt: '2018-01-14T07:18:00.149Z'
        }
      }
    ]
  }
};

test('should render favorite list correctly with no favorite recipe', () => {
  const wrapper = shallow(<FavoriteList favorites={propsEmpty} />);
  expect(wrapper).toMatchSnapshot();
});

test('should render favorite list correctly with one favorite recipe', () => {
  const wrapper = mount(<FavoriteList favorites={favorites} />);
  expect(wrapper).toMatchSnapshot();
});
