import { singleRecipe } from './recipeMocks';

export const getFavorites = {
  success: true,
  favorites: [
    {
      id: 6,
      recipeId: 28,
      userId: 24,
      createdAt: '2018-02-18T07:23:12.409Z',
      updatedAt: '2018-02-18T07:23:12.409Z',
      Recipe: {
        id: 28,
        name: 'slide up',
        ingredients: ['water', 'salt'],
        direction:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Phasellus egestas tellus rutrum tellus pellentesque eu. Ornare arcu odio ut sem. Maecenas pharetra convallis posuere morbi leo urna molestie.',
        searchIng: 'water,salt',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Phasellus egestas tellus rutrum tellus pellentesque eu. Ornare arcu odio ut sem. Maecenas pharetra convallis posuere morbi leo urna molestie.',
        category: 'Breakfast',
        foodImg:
          'https://res.cloudinary.com/emasys/image/upload/v1518694369/soxukmhdrqtzwlmflnkx.jpg',
        userId: 24,
        upvote: 0,
        downvote: 0,
        reactionUp: [],
        reactionDown: [],
        views: 0,
        comments: 5,
        favorite: 1,
        createdAt: '2018-02-15T11:25:43.204Z',
        updatedAt: '2018-02-18T07:23:12.444Z'
      }
    }
  ]
};

export const addFavorite = {
  success: true,
  status: 'favorited',
  recipe: singleRecipe.recipeItem
};
