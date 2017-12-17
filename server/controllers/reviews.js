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
          recipe.update({ comments: recipe.comments + 1 });
          return Reviews.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.decoded.id,
            user: req.decoded.moniker,
            avatar: req.decoded.avatar || 'http://res.cloudinary.com/emasys/image/upload/v1512284211/wgeiqliwzgzpcmyl0ypd.png'
          })
            .then((reviewedRecipe) => {
              mailer(reviewedRecipe.user, email, `has reviewed your recipe (${name})`);
              return setStatus(res, { success: true, reviewedRecipe }, 201);
            })
            .catch(() => setStatus(res, { success: false, error: 'could not complete this operation' }, 500));
        })
        .catch(() => setStatus(res, { success: false, error: 'recipe not found' }, 404));
    } else {
      return setStatus(res, { success: false, status: validator.errors.all() }, 422);
    }
  }
}
