import { Recipes, Reviews, Users } from '../../models';
import { setStatus, mailer } from '../../middleware/helper';

export const postReview = (res, req) => {
  Recipes.findById(req.params.recipeId, {
    include: [
      { model: Users, attributes: ['moniker', 'avatar', 'email', 'id'] }
    ]
    // enable sending a notification to the creator of the recipe
  })
    .then((recipe) => {
      const { name, User: { email, moniker } } = recipe;
      recipe.increment('comments');
      return Reviews.create({
        content: req.body.content,
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }).then((reviewedRecipe) => {
        const emailBody = {
          name,
          recipeId: recipe.id
        };
        mailer(moniker, email, emailBody);
        return setStatus(res, { success: true, reviewedRecipe, recipe }, 201);
      });
    })
    .catch(() =>
      setStatus(res, { success: false, error: 'recipe not found' }, 404));
};

export const fetchReview = (res, req, reviews) => {
  if (reviews.count < 1) {
    return setStatus(res, { message: 'no review', reviews: reviews.rows }, 200);
  }
  return setStatus(res, { reviews: reviews.rows, count: reviews.count }, 200);
};

export const deleteReviewEntry = (res, req, reviews) => {
  if (req.decoded.id !== reviews.userId) {
    return setStatus(res, { error: 'cannot delete review' }, 401);
  }
  return reviews.Recipe.decrement('comments').then(() =>
    reviews
      .destroy()
      .then(() =>
        setStatus(res, { success: true, message: 'review deleted' }, 200)));
};
