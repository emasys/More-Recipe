import Validator from 'validatorjs';
import {
  validateReviews,
  setStatus,
  notFoundDispatcher,
  serverErrorDispatcher
} from '../middleware/helper';
import { postReview, fetchReview, deleteReviewEntry } from '../services/review';
import { Recipes, Reviews, Users, ReviewsReply } from '../models';

/**
 * Review controller
 *
 * @export
 * @class reviews
 */
export default class ReviewRecipe {
  /**
   * Fetch all the reviews of a single recipe
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} list of reviews for a particular recipe
   *
   * @memberof ReviewRecipe
   */
  static getReviews(req, res) {
    return Reviews.findAndCountAll({
      limit: req.query.limit,
      offset: req.query.offset,
      where: { recipeId: req.params.recipeId },
      order: [['createdAt', 'DESC']],
      include: [
        { model: Users, attributes: ['moniker', 'avatar'] }
        // { model: ReviewsReply, as: 'reviewsreply' }
      ]
    })
      .then(reviews => fetchReview(res, req, reviews))
      .catch(error => serverErrorDispatcher(res, error));
  }
  /**
   *
   * Delete a review
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} list of reviews for a particular recipe
   *
   * @memberof ReviewRecipe
   */
  static deleteReviews(req, res) {
    return Reviews.findById(req.params.reviewId, {
      where: { userId: req.decoded.id },
      include: [{ model: Recipes }]
    })
      .then((reviews) => {
        if (!reviews) {
          return notFoundDispatcher(res);
        }
        return deleteReviewEntry(res, req, reviews);
      })
      .catch(error => serverErrorDispatcher(res, error));
  }
  /**
   * Post a review
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof ReviewRecipe
   *
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

  /**
   * Post a review
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof ReviewRecipe
   *
   * @returns {object}
   * reply a review of another user
   */
  static replyReview(req, res) {
    const request = req.body;
    const validator = new Validator(request, validateReviews());
    if (validator.passes()) {
      return ReviewsReply.create({
        content: request.content,
        reviewId: req.params.reviewId
      })
        .then(review => setStatus(res, { success: true, review }, 201))
        .catch(error =>
          setStatus(res, { success: false, error: error.message }, 500));
    }
    return setStatus(
      res,
      { success: false, status: validator.errors.all() },
      422
    );
  }

  /**
   * Post a review
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @memberof ReviewRecipe
   *
   * @returns {object}
   * fetch replies of a review
   */
  static getReplyReview(req, res) {
    return ReviewsReply.findAndCountAll({
      reviewId: req.params.reviewId
    })
      .then(review =>
        setStatus(res, { reviews: review.rows, count: review.count }, 200))
      .catch(error =>
        setStatus(res, { success: false, error: error.message }, 500));
  }
}
