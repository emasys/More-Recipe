import Validator from 'validatorjs';
import { Recipes, Reviews, Users } from '../models';
import { validateReviews, setStatus, mailer } from '../middleware/helper';
/**
 *
 *
 * @export
 * @class reviews
 */
export default class ReviewRecipe {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof ReviewRecipe
   *
   * Review a particular recipe with a certain recipeId provided as a params
   */
  static addReview(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateReviews());
    if (validator.passes()) {
      Recipes.findById(req.params.recipeId, {
        include: [{ model: Users }] // To allow us send a notification to the creator of the recipe
      })
        .then((recipe) => {
          const { name, User: { email } } = recipe;
          if (!recipe) return setStatus(res, { success: false, status: 'Recipe not found' }, 404);
          recipe.update({ comments: recipe.comments + 1 });
          return Reviews.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.decoded.id,
            user: req.decoded.moniker,
            avatar: req.decoded.avatar
          })
            .then((reviewedRecipe) => {
              mailer(reviewedRecipe.user, email, `has reviewed your recipe (${name})`);
              return setStatus(res, { success: true, reviewedRecipe }, 201);
            })
            .catch(() => setStatus(res, { success: false, error: 'could not complete this operation' }, 400));
        })
        .catch(() => setStatus(res, { success: false, error: 'something went wrong' }, 400));
    } else {
      return setStatus(res, { success: false, status: validator.errors.all() }, 422);
    }
  }
}
