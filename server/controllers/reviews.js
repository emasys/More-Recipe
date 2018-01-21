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
  static getReviews(req, res) {
    Reviews.findAll({
      where: {
        recipeId: req.params.recipeId
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Users
        }
      ]
    })
      .then(reviews => setStatus(res, { reviews }, 200))
      .catch(() => setStatus(res, { error: 'something went wrong' }, 500));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof ReviewRecipe
   * @returns {object}
   * Review a particular recipe with a certain recipeId provided as a params
   */
  static addReview(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateReviews());
    if (validator.passes()) {
      Recipes.findById(req.params.recipeId, {
        include: [{ model: Users }]
        // enable sending a notification to the creator of the recipe
      })
        .then((recipe) => {
          const { name, User: { email } } = recipe;
          recipe.update({ comments: recipe.comments + 1 });
          return Reviews.create({
            content: req.body.content,
            userId: req.decoded.id,
            recipeId: req.params.recipeId,
          })
            .then((reviewedRecipe) => {
              mailer(
                reviewedRecipe.user,
                email,
                `has reviewed your recipe (${name})`
              );
              return setStatus(res, { success: true, reviewedRecipe }, 201);
            })
            .catch(err => setStatus(res, { success: false, error: err }, 500));
        })
        .catch(() =>
          setStatus(res, { success: false, error: 'recipe not found' }, 404));
    } else {
      return setStatus(
        res,
        { success: false, status: validator.errors.all() },
        422
      );
    }
  }
}
