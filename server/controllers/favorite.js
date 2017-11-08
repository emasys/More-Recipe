import { Recipes, Favorite } from '../models';

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
      .then(favorite => {
        if (favorite) {
          return res.status(404).json({
            code: 404,
            message: 'This recipe is already your favorite'
          });
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        });
      })
      .then(isFavorite => {
        return res.status(200).json({
          code: 200,
          message: 'Recipe successfully made your favorite',
          data: isFavorite
        });
      })
      .catch(error =>
        res.status(400).json({
          message: 'An error occured during this operation',
          error: error.errors
        })
      );
  }

  /**
     * List all favorited recipes
     *
     * @param {object} req
     * @param {object} res
     */
  static listFavorites(req, res) {
    Favorite.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: Recipes
        }
      ]
    })
      .then(favorites => {
        return res.status(200).send({ success: true, favorites });
      })
      .catch(error =>
        res.status(400).send({ success: false, error: error.message })
      );
  }
}
