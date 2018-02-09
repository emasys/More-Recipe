import { Recipes, Favorite } from '../models';
import { setStatus } from '../middleware/helper';
import { setFavorite } from '../services/favorite';

/**
 *
 *
 * @export
 * @class FavoriteRecipes
 */
export default class FavoriteRecipes {
  /**
   * Add a recipe to User favorites list
   * @returns {object} success message
   * @param {object} req
   * @param {object} res
   */
  static addFavorite(req, res) {
    return Favorite.findOne({
      where: { recipeId: req.params.recipeId, userId: req.decoded.id },
      include: [
        { model: Recipes, include: [{ model: Favorite, as: 'favorites' }] }
      ]
    })
      .then(favorite => setFavorite(req, res, favorite))
      .catch(() =>
        setStatus(res, { success: false, message: 'recipe not found' }, 404));
  }

  /**
   * List all favorited recipes
   * @returns {object} list of favorite recipes
   * @param {object} req
   * @param {object} res
   */
  static listFavorites(req, res) {
    Favorite.findAll({
      where: { userId: req.decoded.id },
      include: [
        {
          model: Recipes
        }
      ]
    })
      .then(favorites => setStatus(res, { success: true, favorites }, 200))
      .catch(error => setStatus(res, { success: false, error }, 500));
  }
}
