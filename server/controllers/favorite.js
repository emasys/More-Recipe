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
   * @returns {object} success message
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
          return favorite.destroy().then(() =>
            setStatus(
              res,
              {
                success: true,
                status: 'unfavorited'
              },
              200
            ));
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then(response =>
          setStatus(res, { success: true, status: 'favorited', response }, 200));
      })
      .catch(() =>
        setStatus(res, { success: false, message: 'recipe not found' }, 404));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} checks if a user viewing the recipe
   * item page has favorited the recipe
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
        if (favorites.length > 0) {
          return setStatus(
            res,
            {
              success: true,
              status: 'favorite'
            },
            200
          );
        }
        return setStatus(res, { success: false, status: 'not favorite' }, 200);
      })
      .catch(() =>
        setStatus(res, { success: false, status: 'recipe not found' }, 404));
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
