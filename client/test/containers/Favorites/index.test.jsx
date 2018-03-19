import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  Favorites,
  mapStateToProps
} from '../../../src/containers/Favorites/index';

jest.mock('../../../src/components/Navbar');

describe('Test suite for profile page component', () => {
  it('Should render with no recipe', () => {
    const props = {
      favorites: {},
      isLoggedIn: true,
      auth: { isLoggedIn: true },
      getFavorite: jest.fn(),
      clearFavoriteList: jest.fn()
    };
    const wrapper = mount(<Router>
      <Favorites {...props} />
    </Router>);

    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('h2.float-left.clearfix').text()).toMatch('Favorite Recipes');
    expect(wrapper.find('h4.p-3.m-2').text()).toMatch('You do not have any favorite recipe yet');
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render with one favorite recipe and filter list', () => {
    const filter = jest.spyOn(Favorites.prototype, 'filterFavorites');
    const props = {
      auth: { isLoggedIn: true },
      favorites: {
        userFavorites: [
          {
            recipeId: 5,
            Recipe: {
              id: 5,
              name: "How to cook yam",
              ingredients: [
                "water",
                "salt"
              ],
              direction: "just do it",
              searchIng: "water, salt",
              description: "sadasd",
              category: "Breakfast",
              foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
              userId: 1,
              upvote: 1,
              downvote: 0,
              reactionUp: [
                1
              ],
              reactionDown: [],
              views: 0,
              comments: 0,
              favorite: 1,
              createdAt: "2018-03-15T10:02:06.889Z",
              updatedAt: "2018-03-15T12:02:24.578Z"
            }
          }
        ],
        favoriteCount: 1,
      },
      getFavorite: jest.fn(),
      clearFavoriteList: jest.fn()
    };
    const wrapper = mount(<Router><Favorites {...props} /></Router>);

    expect(wrapper.length).toEqual(1);
    wrapper.find('a.list-group-item.d-flex.justify-content-between.align-items-center').simulate('click', {
      preventDefault: () => {}
    });
    expect(filter).toHaveBeenCalled();

    expect(wrapper).toMatchSnapshot();
  });


  it('should call componentWillReceiveProps and unmount', () => {
    const props = {
      auth: { isLoggedIn: true },
      favorites: {
        userFavorites: [
          {
            recipeId: 5,
            Recipe: {
              id: 5,
              name: "How to cook yam",
              ingredients: [
                "water",
                "salt"
              ],
              direction: "just do it",
              searchIng: "water, salt",
              description: "sadasd",
              category: "Breakfast",
              foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
              userId: 1,
              upvote: 1,
              downvote: 0,
              reactionUp: [
                1
              ],
              reactionDown: [],
              views: 0,
              comments: 0,
              favorite: 1,
              createdAt: "2018-03-15T10:02:06.889Z",
              updatedAt: "2018-03-15T12:02:24.578Z"
            }
          }
        ],
        favoriteCount: 1
      },
      getFavorite: jest.fn(),
      clearFavoriteList: jest.fn()
    };
    const app = shallow(<Favorites {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');

    app.setProps(props);
    expect(compWRP).toHaveBeenCalled();

    app.unmount();
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      favorite: {}
    };
    expect(mapStateToProps(initialState).favorites).toEqual({});
  });
});
