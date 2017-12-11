import { Recipes, Favorite } from '../models';
import { setStatus } from '../middleware/helper';

/**
 *
 *
 * @export
 * @class FavoriteRecipes
 */
export default class FavoriteRecipes {
  /**
     * Create User favorite
     *
     * @param {object} req
     * @param {object} res
     */
  static addFavorite(req, res) {
    return Favorite.findOne({
      where: {
        recipeId: req.params.recipeId,
        userId: req.decoded.id
      }
    })
      .then((favorite) => {
        if (favorite) {
          return favorite
            .destroy()
            .then(() => setStatus(res, { success: true, status: 'unfavorited' }, 200));
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        })
          .then(() => setStatus(res, { success: true, status: 'favorited' }, 200));
      })
      .catch(() => setStatus(res, { success: false, message: 'recipe not found' }, 404));
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @returns checks if a user viewing the recipe item page has favorited the recipe
 * @memberof FavoriteRecipes
 */
  static favoriteStatus(req, res) {
    return Favorite.findAll({
      where: {
        recipeId: req.params.recipeId
      }
    })
      .then((favorites) => {
        if (favorites.length > 0) return setStatus(res, { success: true }, 200);
        return setStatus(res, { success: false }, 200);
      })
      .catch(() => setStatus(res, { success: false }, 404));
  }

  /**
     * List all favorited recipes
     *
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
      .catch(() => setStatus(res, { success: false }, 500));
  }
}
