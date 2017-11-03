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
      .then((favorite) => {
        if (favorite) {
          return res.status(404).send({
            message: 'favorited Already',
            success: false
          });
        }
        return Favorite.create({
          recipeId: req.params.recipeId,
          userId: req.decoded.id
        })
          .then((favorited) => {
            return res.status(200).send({
              message: 'favorited',
              success: true,
              data: favorited
            });
          });
      })
      .catch(error => res.status(400).send({
        success: false,
        error: error.errors
      }));
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
      include: [{
        model: Recipes,
      }]
    })
      .then((favorites) => {
        return res.status(200).send({ success: true, favorites });
      })
      .catch(error => res.status(400).send({ success: false, error: error.message }));
  }
}
