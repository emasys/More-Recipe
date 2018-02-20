export const allRecipes = {
  recipes: [
    {
      id: 1,
      name: 'How to cook yam',
      ingredients: ['water', 'oil', 'pepper', 'salt'],
      direction: 'just do it',
      searchIng: null,
      recipeCount: null,
      description: 'just do it',
      category: 'Breakfast',
      foodImg:
        'https://res.cloudinary.com/emasys/image/upload/v1514202541/hse0xuqzyqlxjqwemigv.jpg',
      userId: 1,
      upvote: 2,
      downvote: 0,
      reactionUp: [1, 3],
      reactionDown: [],
      views: 3,
      comments: 5,
      favorite: 2,
      createdAt: '2017-12-25T11:49:01.973Z',
      updatedAt: '2018-01-25T06:05:27.480Z'
    }
  ]
};

export const singleRecipe = {
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
};

export const reviews = {
  reviews: [
    {
      id: 1,
      content: 'review content',
      createdAt: '2018-02-16T00:07:41.741Z',
      updatedAt: '2018-02-16T00:07:41.741Z',
      recipeId: 1,
      userId: 1,
      User: {
        moniker: 'admin',
        avatar: 'secret url'
      }
    }
  ]
};

export const deleteRecipe = {
  success: true,
  status: 'Recipe deleted'
};
