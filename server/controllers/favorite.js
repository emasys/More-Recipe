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
          return favorite
            .destroy()
            .then(() =>
              res.status(200).send({ success: true, status: 'unfavorited' })
            )
            .catch(error => res.status(400).send({ error }));
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        }).then(isFavorite => {
          return res.status(200).send({ success: true, status: 'favorited' });
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
 * 
 * 
 * @static
 * @param {any} req 
 * @param {any} res 
 * @returns favorite status of recipe
 * @memberof FavoriteRecipes
 */
  static favoriteStatus(req, res) {
    return Favorite.findAll({
      where: {
        userId: req.decoded.id,
        recipeId: req.params.recipeId
      }
    })
      .then(favorites => {
        if (favorites.length > 0) {
          return res.status(200).send({ success: true, favorites });
        }
        return res.status(200).send({ success: false });
      })
      .catch(error =>
        res.status(400).send({ success: false, error: error.message })
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
      where: { userId: req.decoded.id },
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
