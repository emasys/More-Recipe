import { Recipes, Favorite } from '../../models';
import { setStatus } from '../../middleware/helper';

export const setFavorite = (req, res, favorite) => {
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
      include: [
        { model: Recipes, include: [{ model: Favorite, as: 'favorites' }] }
      ]
    }).then(response =>
      setStatus(
        res,
        { success: true, status: 'favorited', recipe: response.Recipe },
        200
      )));
};

export const fetchFavorite = () => {};
