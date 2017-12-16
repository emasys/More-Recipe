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
     * Add a recipe to User favorites list
     *
     * @param {object} http request
     * @param {object} http response
     */
  static addFavorite(req, res) {
    return Favorite.findOne({
      where: {
        recipeId: req.params.recipeId
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
 * @param {object} http request
 * @param {object} http response
 * @returns checks if a user viewing the recipe item page has favorited the recipe
 * @memberof FavoriteRecipes
 */
  static favoriteStatus(req, res) {
    return Favorite.findAll({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    })
      .then((favorites) => {
        if (favorites.length > 0) return setStatus(res, { success: true, status: 'favorite' }, 200);
        return setStatus(res, { success: false, status: 'not favorite' }, 200);
      })
      .catch(() => setStatus(res, { success: false, status: 'recipe not found' }, 404));
  }

  /**
     * List all favorited recipes
     *
     * @param {object} http request
     * @param {object} http response
     */
  static listFavorites(req, res) {
    console.log({ userId: req.decoded.id });
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
