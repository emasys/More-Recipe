import { Recipes, Favorite } from '../models';
import {
  setStatus,
  serverErrorDispatcher
} from '../middleware/helper';
import setFavorite from '../services/favorite';

/**
 * Favorite Recipes Controller
 *
 * @export
 * @class FavoriteRecipes
 */
export default class FavoriteRecipes {
  /**
   * Add a recipe to User favorites list
   *
   * @returns {object} status message
   *
   * @param {object} req
   * @param {object} res
   */
  static addFavorite(req, res) {
    return Favorite.findOne({
      where: { recipeId: req.params.recipeId, userId: req.decoded.id },
      include: [{ model: Recipes }]
    })
      .then(favorite => setFavorite(req, res, favorite))
      .catch(error => serverErrorDispatcher(res, error));
  }

  /**
   * List all favorite recipes
   *
   * @returns {object} list of favorite recipes
   *
   * @param {object} req
   * @param {object} res
   */
  static listFavorites(req, res) {
    return Favorite.findAndCountAll({
      where: { userId: req.decoded.id },
      limit: req.query.limit || 1,
      offset: req.query.offset || 0,
      attributes: ['recipeId'],
      include: [{ model: Recipes }],
      order: [[{ model: Recipes }, 'category']]
    })
      .then(favorites =>
        setStatus(
          res,
          { success: true, favorites: favorites.rows, count: favorites.count },
          200
        ))
      .catch(error => serverErrorDispatcher(res, error));
  }
}
