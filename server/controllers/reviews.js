import Validator from 'validatorjs';
import { Recipes, Reviews } from '../models';
import { validateReviews } from '../middleware/helper';
/**
 *
 *
 * @export
 * @class reviews
 */
export default class reviews {
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @memberof reviews
   */
  static addReview(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateReviews());
    if (validator.passes()) {
      Recipes.findById(req.params.recipeId)
        .then((recipe) => {
          if (!recipe) {
            return res.status(404).send({ success: false, status: 'Recipe not found' });
          }
          recipe.update({
            comments: recipe.comments + 1,
            views: recipe.views - 1
          });
          return Reviews.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.decoded.id,
            user: req.decoded.moniker,
            avatar: req.decoded.avatar
          })
            .then((reviewedRecipe) => {
              return res.status(201).send({ success: true, reviewedRecipe });
            })
            .catch(error => res.status(404).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
  }
}
