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
      recipe.update({ comments: recipe.comments + 1 });
      return Reviews.create({
        content: req.body.content,
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }).then((reviewedRecipe) => {
        mailer(moniker, email, `has reviewed your recipe (${name})`);
        return setStatus(res, { success: true, reviewedRecipe, recipe }, 201);
      });
    })
    .catch(() =>
      setStatus(res, { success: false, error: 'recipe not found' }, 500));
};

export const fetchReview = (res, req) =>
  Reviews.findAll({
    limit: req.query.limit,
    offset: req.query.offset,
    where: {
      recipeId: req.params.recipeId
    },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Users,
        attributes: ['moniker', 'avatar']
      }
    ]
  })
    .then((reviews) => {
      if (reviews.length < 1) {
        return setStatus(res, { message: 'no review', reviews }, 200);
      }
      return setStatus(res, { reviews }, 200);
    })
    .catch(() => setStatus(res, { error: 'something went wrong' }, 500));

export const deleteReviewEntry = (res, req) =>
  Reviews.findById(req.params.reviewId, {
    where: {
      userId: req.decoded.id
    }
  })
    .then(reviews => reviews.destroy())
    .then(() =>
      setStatus(res, { success: true, message: 'review deleted' }, 200))
    .catch(() => setStatus(res, { error: 'something went wrong' }, 500));
