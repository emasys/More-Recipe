import { singleRecipe } from './recipeMocks';

export const getFavorites = {
  success: true,
  favorites: [
    {
      recipeId: 2,
      Recipe: {
        id: 2,
        name: 'asdasd',
        ingredients: ['sad'],
        direction: 'sda',
        searchIng: 'sad',
        description: 'asda',
        category: 'Breakfast',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1514552968/thumb_image_not_available_dqr7h2.png',
        userId: 1,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 19,
        comments: 5,
        favorite: 2,
        createdAt: '2018-02-20T18:25:22.598Z',
        updatedAt: '2018-02-23T17:28:26.985Z'
      }
    }
  ],
  count: 3
};

export const addFavorite = {
  success: true,
  status: 'favorited',
  recipe: singleRecipe.recipeItem
};
