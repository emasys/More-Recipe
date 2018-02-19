import { singleRecipe } from './recipeMocks';

export const upvoteResponse = {
  success: true,
  recipe: singleRecipe.recipeItem,
  status: 'upvoted'
};

export const downvoteResponse = {
  success: true,
  recipe: singleRecipe.recipeItem,
  status: 'downvoted'
};
