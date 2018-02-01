import { Users, Recipes, Reviews, Favorite } from '../models';
import { validateAddRecipes, setStatus } from '../middleware/helper';

export const sortRecipe = (req, res, column, order) => Recipes.findAll({
  offset: req.params.offset,
  limit: req.params.page,
  order: [[column, order]]
})
  .then(recipes =>
    Recipes.count().then(count =>
      setStatus(res, { success: true, recipes, count }, 200)))

  .catch(() =>
    setStatus(res, { success: false, error: 'something went wrong' }, 500));

export const somestuff = () => Recipes.findAll({
  offset: req.params.offset,
  limit: req.params.page,
  order: [['upvote', 'DESC']]
})
  .then(recipes =>
    Recipes.count().then(count =>
      setStatus(res, { success: true, recipes, count }, 200)))

  .catch(() =>
    setStatus(
      res,
      {
        success: false,
        error: 'something went wrong'
      },
      500
    ));
