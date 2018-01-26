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
      },
      include: [{ model: Recipes, include: [{ model: Favorite, as: 'favorites' }] }]
    })
      .then((favorite) => {
        if (favorite) {
          setStatus(
            res,
            { success: true, status: 'cancel', recipe: favorite.Recipe },
            200
          );
          return favorite.destroy();
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then(() =>
          Favorite.findOne({
            where: {
              recipeId: req.params.recipeId,
              userId: req.decoded.id
            },
            include: [{ model: Recipes, include: [{ model: Favorite, as: 'favorites' }] }]
          }).then(response =>
            setStatus(
              res,
              { success: true, status: 'favorited', recipe: response.Recipe },
              200
            )));
      })
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
