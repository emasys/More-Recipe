const fakeStore = {
  recipes: {
    count: 1,
    allRecipes: [],
    recipeItem: {
      success: true,
      recipe: {
        id: 1,
        name: 'How to cook yam',
        ingredients: ['water, salt'],
        direction: 'just do it',
        searchIng: 'water, salt',
        description: 'just do it',
        category: 'Lunch',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 0,
        comments: 0,
        favorite: 0,
        createdAt: '2018-03-13T05:05:02.553Z',
        updatedAt: '2018-03-14T18:21:16.794Z',
        favorites: []
      }
    },
    updated: false,
    // updateRecipes: {},
    category: [
      {
        id: 1,
        name: 'A really long recipe title to make sure the words are truncated',
        ingredients: ['water, salt'],
        direction: 'Just do it',
        searchIng: 'water, salt',
        description: 'Normal food',
        category: 'Lunch',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 0,
        comments: 0,
        favorite: 0,
        createdAt: '2018-03-13T05:05:02.553Z',
        updatedAt: '2018-03-13T05:12:41.611Z'
      }
    ],
    userRecipes: [],
    userRecipesCount: 0,
    searchResult: [],
    hotRecipes: [
      {
        id: 1,
        name: 'A really long recipe title to make sure the words are truncated',
        ingredients: ['water, salt'],
        direction: 'Just do it',
        searchIng: 'water, salt',
        description: 'Normal food',
        category: 'Lunch',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 0,
        comments: 0,
        favorite: 0,
        createdAt: '2018-03-13T05:05:02.553Z',
        updatedAt: '2018-03-13T05:12:41.611Z'
      }
    ]
  },
  user: {
    message: null,
    authInfo: {
      isLoggedIn: true,
      userId: 1,
      username: 'admin'
    },
    isLoggedIn: true,
    userInfo: {
      success: true,
      data: {
        id: 1,
        firstName: 'emmy',
        lastName: 'endy',
        bio: null,
        email: 'emasysnd@gmail.com',
        country: 'Nigeria',
        avatar: null,
        moniker: 'admin'
      }
    },
    userProfile: {
      success: true,
      data: {
        id: 1,
        firstName: null,
        lastName: null,
        bio: null,
        email: 'emasysnd@gmail.com',
        country: null,
        avatar: null,
        moniker: 'admin'
      }
    },
    allUsers: {
      success: true,
      users: [
        {
          id: 1,
          email: 'emasysnd@gmail.com',
          password:
            '$2a$10$47oncNYPerLpBX2BfrUSpeUo4KMIU5dsHkJo3hRUWw1n58K6muoUS',
          firstName: null,
          moniker: 'admin',
          lastName: null,
          country: null,
          avatar: null,
          bio: null,
          createdAt: '2018-03-13T05:04:37.443Z',
          updatedAt: '2018-03-13T05:04:37.443Z'
        }
      ]
    }
  },
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

export const unauthenticatedFakeStore = {
  location: { pathname: '/signin' },
  recipes: {
    count: 1,
    allRecipes: [],
    recipeItem: {
      success: true,
      recipe: {
        id: 1,
        name: 'How to cook yam',
        ingredients: ['water, salt'],
        direction: 'just do it',
        searchIng: 'water, salt',
        description: 'just do it',
        category: 'Lunch',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 0,
        comments: 0,
        favorite: 0,
        createdAt: '2018-03-13T05:05:02.553Z',
        updatedAt: '2018-03-14T18:21:16.794Z',
        favorites: []
      }
    },
    updated: false,
    // updateRecipes: {},
    category: [
      {
        id: 1,
        name: 'A really long recipe title to make sure the words are truncated',
        ingredients: ['water, salt'],
        direction: 'Just do it',
        searchIng: 'water, salt',
        description: 'Normal food',
        category: 'Lunch',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 0,
        comments: 0,
        favorite: 0,
        createdAt: '2018-03-13T05:05:02.553Z',
        updatedAt: '2018-03-13T05:12:41.611Z'
      }
    ],
    userRecipes: [],
    userRecipesCount: 0,
    searchResult: [],
    hotRecipes: [
    ]
  },
  user: {
    message: null,
    authInfo: {
      isLoggedIn: true,
      userId: 1,
      username: 'admin'
    },
    isLoggedIn: false,
    userInfo: {
      success: true,
      data: {
        id: 1,
        firstName: 'emmy',
        lastName: 'endy',
        bio: null,
        email: 'emasysnd@gmail.com',
        country: 'Nigeria',
        avatar: null,
        moniker: 'admin'
      }
    },
    userProfile: {
      success: true,
      data: {
        id: 1,
        firstName: null,
        lastName: null,
        bio: null,
        email: 'emasysnd@gmail.com',
        country: null,
        avatar: null,
        moniker: 'admin'
      }
    },
    allUsers: {
      success: true,
      users: [
        {
          id: 1,
          email: 'emasysnd@gmail.com',
          password:
            '$2a$10$47oncNYPerLpBX2BfrUSpeUo4KMIU5dsHkJo3hRUWw1n58K6muoUS',
          firstName: null,
          moniker: 'admin',
          lastName: null,
          country: null,
          avatar: null,
          bio: null,
          createdAt: '2018-03-13T05:04:37.443Z',
          updatedAt: '2018-03-13T05:04:37.443Z'
        }
      ]
    }
  },
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
export default fakeStore;
