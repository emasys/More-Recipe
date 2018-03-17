import React from 'react';
import { shallow, mount } from 'enzyme';
import Router from 'react-mock-router';

// Component
import {
  FullCatalog,
  mapStateToProps
} from '../../../src/containers/FullCatalog/index';
import fakeStore from '../../__mocks__/fakeStore';

jest.mock('../../../src/components/CatalogList');
jest.mock('../../../src/components/Navbar');

describe('Test suite for full catalog page component', () => {
  const props = {
    recipes: { allRecipes: [] },
    user: fakeStore.user.userProfile,
    getRecipes: jest.fn(),
    searchRecipes: jest.fn(),
    getProfile: jest.fn(),
    resetSearch: jest.fn(),
    history: { push: jest.fn() },
    auth: fakeStore.user,
    clearRecipes: jest.fn()
  };
  const propswithSearchResult = {
    recipes: {
      allRecipes: [
        {
          id: 5,
          name: "how to cook yam",
          ingredients: [
            "water",
            "salt"
          ],
          direction: "just do it",
          searchIng: "water, salt",
          description: "just do it",
          category: "Breakfast",
          foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
          userId: 1,
          upvote: 1,
          downvote: 0,
          reactionUp: [
            1
          ],
          reactionDown: [],
          views: 1,
          comments: 0,
          favorite: 1,
          createdAt: "2018-03-15T10:02:06.889Z",
          updatedAt: "2018-03-15T12:02:24.578Z"
        },
        {
          id: 4,
          name: "how to cook yams",
          ingredients: [
            "water",
            "salt"
          ],
          direction: "just do it",
          searchIng: "water, salt",
          description: "just do it",
          category: "Breakfast",
          foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
          userId: 1,
          upvote: 2,
          downvote: 0,
          reactionUp: [
            1
          ],
          reactionDown: [],
          views: 2,
          comments: 0,
          favorite: 2,
          createdAt: "2018-03-15T10:02:07.889Z",
          updatedAt: "2018-03-15T12:02:24.578Z"
        },
        {
          id: 3,
          name: "how to cook yams",
          ingredients: [
            "water",
            "salt"
          ],
          direction: "just do it",
          searchIng: "water, salt",
          description: "just do it",
          category: "Breakfast",
          foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
          userId: 1,
          upvote: 2,
          downvote: 0,
          reactionUp: [
            1
          ],
          reactionDown: [],
          views: 2,
          comments: 0,
          favorite: 2,
          createdAt: "2018-03-15T10:02:06.889Z",
          updatedAt: "2018-03-15T12:02:24.578Z"
        },
        {
          id: 1,
          name: "how to cook yams",
          ingredients: [
            "water",
            "salt"
          ],
          direction: "just do it",
          searchIng: "water, salt",
          description: "just do it",
          category: "Breakfast",
          foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
          userId: 1,
          upvote: 0,
          downvote: 0,
          reactionUp: [
            1
          ],
          reactionDown: [],
          views: 0,
          comments: 0,
          favorite: 2,
          createdAt: "2018-03-15T10:02:03.889Z",
          updatedAt: "2018-03-15T12:02:24.578Z"
        }
      ],
      count: 1,
      searchResult: [{
        id: 1,
        name: "how to cook yams",
        ingredients: [
          "water",
          "salt"
        ],
        direction: "just do it",
        searchIng: "water, salt",
        description: "just do it",
        category: "Breakfast",
        foodImg: "https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png",
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [
          1
        ],
        reactionDown: [],
        views: 0,
        comments: 0,
        favorite: 2,
        createdAt: "2018-03-15T10:02:03.889Z",
        updatedAt: "2018-03-15T12:02:24.578Z"
      }]
    },
    user: fakeStore.user.userProfile,
    getRecipes: jest.fn(),
    searchRecipes: jest.fn(),
    getProfile: jest.fn(),
    resetSearch: jest.fn(),
    history: { push: jest.fn() },
    auth: fakeStore.user,
    clearRecipes: jest.fn()
  };
  it('Should render with no recipe', () => {
    const wrapper = mount(<Router><FullCatalog {...props} /></Router>);

    expect(wrapper.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });


  it('should call componentWillReceiveProps and unmount', () => {
    const newProps = {
      recipes: {
        allRecipes: [
          {
            id: 5,
            name: "how to cook yam",
            ingredients: [
              "water",
              "salt"
            ],
            direction: "just do it",
            searchIng: "water, salt",
            description: "just do it",
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
        ],
        recipeItem: {},
        updateRecipes: {},
        category: [],
        userRecipes: [],
        userRecipesCount: 0,
        searchResult: [],
        searchCount: 1,
        count: 1,
        success: true
      },
      user: fakeStore.user.userProfile,
      favorite: {
        userFavorites: []
      },
      review: {
        review: {},
        fetch_reviews: []
      },
      votes: {},
      isLoading: false
    };
    const nextProps = {
      recipes: {
        allRecipes: [
        ],
        recipeItem: {},
        updateRecipes: {},
        category: [],
        userRecipes: [],
        userRecipesCount: 0,
        searchResult: [],
        searchCount: 10,
        count: 1,
        success: true
      },
      user: fakeStore.user.userProfile,
      favorite: {
        userFavorites: []
      },
      review: {
        review: {},
        fetch_reviews: []
      },
      votes: {},
      isLoading: false
    };
    const app = shallow(<FullCatalog {...props} />);
    const instance = app.instance();
    const compWRP = jest.spyOn(instance, 'componentWillReceiveProps');

    app.setProps(newProps);
    expect(app).toMatchSnapshot();
    expect(compWRP).toHaveBeenCalled();

    app.setState({ searchOffset: 30 });
    app.update();
    app.setProps(nextProps);
    expect(compWRP).toHaveBeenCalled();


    app.unmount();
  });

  it('should search and sort recipes', () => {
    const recent = jest.spyOn(FullCatalog.prototype, 'recentlyAdded');
    const views = jest.spyOn(FullCatalog.prototype, 'mostViewed');
    const favorites = jest.spyOn(FullCatalog.prototype, 'mostFavorited');
    const upvoted = jest.spyOn(FullCatalog.prototype, 'mostUpvoted');
    const onChange = jest.spyOn(FullCatalog.prototype, 'searchBar');
    const onSearch = jest.spyOn(FullCatalog.prototype, 'onSearch');

    const app = mount(<Router><FullCatalog {...propswithSearchResult} /></Router>);

    app.find('a#recent').simulate('click', {
      preventDefault: () => {}
    });

    app.find('a#upvotes').simulate('click', {
      preventDefault: () => {}
    });

    app.find('a#favorites').simulate('click', {
      preventDefault: () => {}
    });

    app.find('a#viewed').simulate('click', {
      preventDefault: () => {}
    });

    expect(recent).toHaveBeenCalled();
    expect(views).toHaveBeenCalled();
    expect(favorites).toHaveBeenCalled();
    expect(upvoted).toHaveBeenCalled();

    app.find("input[name='search']").simulate('change', { target: { value: 'water' } });
    app.find("input[name='search']").simulate('change', { target: { value: '' } });
    app.find("input[name='search']").simulate('change', { target: { value: 'water' } });
    app.find('form').simulate('submit');
    app.find("input[name='search']").simulate('change', { target: { value: '' } });
    expect(onChange).toHaveBeenCalled();
    expect(onSearch).toHaveBeenCalled();
  });

  it('Should simulate click on add new recipe button', () => {
    const newProps = {
      recipes: {
        allRecipes: [
          {
            id: 5,
            name: "how to cook yam",
            ingredients: [
              "water",
              "salt"
            ],
            direction: "just do it",
            searchIng: "water, salt",
            description: "just do it",
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
        ],
        recipeItem: {},
        updateRecipes: {},
        category: [],
        userRecipes: [],
        userRecipesCount: 0,
        searchResult: [],
        searchCount: 1,
        count: 1,
        success: true
      },
      user: fakeStore.user.userProfile,
      favorite: {
        userFavorites: []
      },
      review: {
        review: {},
        fetch_reviews: []
      },
      votes: {},
      isLoading: false
    };

    const app = mount(<Router>
      <FullCatalog {...propswithSearchResult} />
    </Router>);
    // const app = shallow(<FullCatalog {...props} />);
    // const instance = app.instance();
    // const addMore = jest.spyOn(instance, 'addMore');

    app.setProps(newProps);
    expect(app).toMatchSnapshot();
    // expect(compWRP).toHaveBeenCalled();

    app.setState({ searching: false });
    app.update();
    // app.setProps(nextProps);
    expect(app).toMatchSnapshot();


    // expect(addMore).toHaveBeenCalled();
  });

  it('should test mapStateToProps', () => {
    const initialState = {
      recipes: {},
      user: { userProfile: {} },
    };
    expect(mapStateToProps(initialState).auth).toEqual({ userProfile: {} });
    expect(mapStateToProps(initialState).recipes).toEqual({});
    expect(mapStateToProps(initialState).user).toEqual({});
  });
});
