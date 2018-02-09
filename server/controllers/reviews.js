import Validator from 'validatorjs';
import { validateReviews, setStatus } from '../middleware/helper';
import { postReview, fetchReview, deleteReviewEntry } from '../services/review';
/**
 *
 *
 * @export
 * @class reviews
 * @returns {object} Reviews operation
 */
export default class ReviewRecipe {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} list of reviews for a particular recipe
   * @memberof ReviewRecipe
   */
  static getReviews(req, res) {
    return fetchReview(res, req);
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {object} list of reviews for a particular recipe
   * @memberof ReviewRecipe
   */
  static deleteReviews(req, res) {
    return deleteReviewEntry(res, req);
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
      return postReview(res, req);
    }
    return setStatus(
      res,
      { success: false, status: validator.errors.all() },
      422
    );
  }
}
