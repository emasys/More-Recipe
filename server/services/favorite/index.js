import { Favorite, Recipes } from '../../models';
import { setStatus, notFoundDispatcher } from '../../middleware/helper';

const setFavorite = (req, res, favorite) => {
  if (favorite) {
    return favorite.Recipe.decrement('favorite').then(() =>
      favorite.destroy().then(() =>
        setStatus(
          res,
          {
            success: true,
            status: 'cancelled',
            recipe: favorite.Recipe
          },
          200
        )));
  }
  return Favorite.create({
    recipeId: req.params.recipeId,
    userId: req.decoded.id
  })
    .then(() => {
      Recipes.findOne({
        where: { id: req.params.recipeId }
      }).then((response) => {
        response
          .increment('favorite')
          .then(() =>
            setStatus(
              res,
              { success: true, status: 'favorited', recipe: response },
              200
            ));
      });
    })
    .catch(() => notFoundDispatcher(res));
};

export default setFavorite;
