import Validator from 'validatorjs';
import { Users, Recipes, Reviews, Favorite } from '../models';
import { validateAddRecipes, setStatus } from '../middleware/helper';

/**
 * parent class
 * @class moreRecipe
 * for a debug, just add error to all the catch() to see ugly sequelize errors i.e catch((error) => bla bla bla)
 */
class moreRecipes {
  /**
   * Add a new recipe to the catalog
   *
   * @param {any} req
   * @param {any} res
   */
  static addRecipe(req, res) {
    const request = req.body;
    const arr = req.body.ingredients;
    const getArr = input => input.trim().split(/\s*,\s*/); // to convert ingredient's strings into and array with no trailing space
    const validator = new Validator(request, validateAddRecipes());
    if (validator.passes()) {
      Users.findById(req.decoded.id)
        .then((user) => {
          if (!user) return setStatus(res, { success: false, error: 'User not found' }, 404);
          return Recipes.create({
            name: request.name,
            direction: request.direction,
            userId: req.decoded.id,
            description: request.description,
            category: request.category,
            foodImg: request.foodImg,
            ingredients: getArr(arr),
          })
            .then(recipe => setStatus(res, { success: true, recipe }, 201))
            .catch(() => setStatus(res, { success: false, error: 'Not added' }, 401));
        })
        .catch(() => setStatus(res, { error: 'something went wrong' }));
    } else {
      return setStatus(res, { error: validator.errors.all() }, 401);
    }
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns
   * @memberof moreRecipes
   */
  static listRecipes(req, res) {
    if (req.query.sort && req.query.order) { // Get sorted (by upvote) recipe list
      return Recipes.findAll({ limit: 12, order: [['upvote', 'DESC']] })
        .then(recipes => setStatus(res, { success: true, recipes }, 200))
        .catch(() => setStatus(res, { error: 'something went wrong' }, 400));
    }

    return Recipes.findAll({
      limit: req.params.page,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Reviews,
          as: 'reviews',
        },
      ],
    })
      .then(recipes => setStatus(res, { success: true, recipes }, 200))
      .catch(() => setStatus(res, { success: false, error: 'something went wrong' }, 400));
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns recipes of a particular category
   * @memberof moreRecipes
   */
  static listRecipeCategory(req, res) {
    return Recipes.findAll({
      limit: req.params.limit,
      where: {
        category: req.body.category,
      },
      order: [['createdAt', 'DESC']],
    })
      .then(recipes => setStatus(res, { success: true, recipes }, 200))
      .catch(() => setStatus(res, { success: false, error: 'something went wrong' }, 400));
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns list of recipes of a particular user
   * @memberof moreRecipes
   */
  static listPrivateRecipes(req, res) {
    return Recipes.findAll({
      limit: req.params.limit || 5,
      where: {
        userId: req.params.id,
      },
    })
      .then(recipes => res.status(200).send({ success: true, recipes }))
      .catch(() => setStatus(res, { success: false, error: 'Unable to fetch your recipes' }, 400));
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns result of search query
   * @memberof moreRecipes
   */
  static SearchRecipe(req, res) {
    return Recipes.findAll({
      where: {
        $or: [
          { name: { ilike: `%${req.body.query}%` } },
          { ingredients: { $contains: [`${req.body.query}`] } },
        ],
      },
    })
      .then(recipes => setStatus(res, { recipes }, 200))
      .catch(() => setStatus(res, { success: false, error: 'Something went wrong' }, 500));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns a single recipe and increment views count
   * @memberof moreRecipes
   */
  static getRecipe(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [
        {
          model: Reviews,
          as: 'reviews',
        },
        {
          model: Favorite,
          as: 'favorites',
        },
      ],
    })
      .then((recipe) => {
        if (req.decoded.id) {
          if (req.decoded.id !== recipe.userId) {
            return recipe.update({
              comments: recipe.reviews.length,
              favorite: recipe.favorites.length,
              views: recipe.views + 1,
            })
              .then(() => setStatus(res, { success: true, recipe }, 200));
          }
          return recipe.update({
            comments: recipe.reviews.length,
            favorite: recipe.favorites.length,
            views: recipe.views,
          })
            .then(() => setStatus(res, { success: true, recipe }, 200));
        }
      })
      .catch(() => setStatus(res, { success: false, status: 'Recipes not found' }, 404));
  }

  /**
   * Update Recipe values
   *
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static updateRecipe(req, res) {
    const arr = req.body.ingredients;
    const getArr = input => input.trim().split(/\s*,\s*/);
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        return recipe
          .update({
            name: req.body.name || recipe.name,
            direction: req.body.direction || recipe.direction,
            description: req.body.description || recipe.description,
            ingredients: getArr(arr) || recipe.ingredients,
          })
          .then(() => setStatus(res, { recipe }, 201)); // Send back the updated recipe.
      })
      .catch(() => setStatus(res, { error: 'recipe not found' }, 404));
  }
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @returns the reaction status of a user once the page loads
   * @memberof moreRecipes
   */
  static checkReactions(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        if (recipe.reactionUp.indexOf(Number(req.decoded.id)) !== -1) {
          return setStatus(res, { upvote: { success: true }, downvote: { success: false } }, 200);
        } else if (recipe.reactionDown.indexOf(Number(req.decoded.id)) !== -1) {
          return setStatus(res, { upvote: { success: false }, downvote: { success: true } }, 200);
        }
        return setStatus(res, { upvote: { success: false }, downvote: { success: false } }, 200);
      })
      .catch(() => setStatus(res, { status: 'recipe not found' }, 404));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns a new value for upvote
   * @memberof moreRecipes
   */
  static upvote(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        if (req.decoded.id) { // check if a user is logged in
          const { reactionDown, reactionUp } = recipe;
          if (reactionUp.indexOf(Number(req.decoded.id)) !== -1) {
            // Check if a user has already upvoted, then "unupvote"
            const removeId = reactionUp.indexOf(Number(req.decoded.id));
            if (removeId > -1) reactionUp.splice(removeId, 1);
            return recipe
              .update({
                upvote: recipe.upvote - 1,
                reactionUp: recipe.reactionUp,
              })
              .then(() => setStatus(res, { success: false, recipe }, 200));
          } else if (
            reactionUp.indexOf(Number(req.decoded.id)) === -1 &&
            reactionDown.indexOf(Number(req.decoded.id)) !== -1
          ) {
            // check if a user has already downvoted, then cancel it and upvote instead
            const removeId = reactionDown.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionDown.splice(removeId, 1);
            }
            recipe.reactionUp.push(req.decoded.id);
            return recipe
              .update({
                upvote: recipe.upvote + 1,
                downvote: recipe.downvote - 1,
                reactionUp: recipe.reactionUp,
                reactionDown,
              })
              .then(() => setStatus(res, { success: true, recipe }, 200));
          }
          // upvote if a user has not previously done so
          recipe.reactionUp.push(req.decoded.id);
          return recipe
            .update({
              upvote: recipe.upvote + 1,
              reactionUp: recipe.reactionUp,
            })
            .then(() => setStatus(res, { success: true, recipe }, 200));
        }
      })
      .catch(() => setStatus(res, { success: false, error: 'something went wrong' }, 404));
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns a new value for downvote
   * @memberof moreRecipes
   */
  static downvote(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        // if (!recipe) return setStatus(res, { success: false, status: 'Recipe Not Found', }, 404);
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionDown.indexOf(Number(req.decoded.id)) !== -1) {
            // have downvoted
            const removeId = reactionDown.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionDown.splice(removeId, 1);
            }
            return recipe
              .update({
                downvote: recipe.downvote - 1,
                reactionDown: recipe.reactionDown,
              })
              .then(() => setStatus(res, { recipe }, 200)); // Send back the updated recipe.
          } else if (
            reactionDown.indexOf(Number(req.decoded.id)) === -1 &&
            reactionUp.indexOf(Number(req.decoded.id)) !== -1
          ) {
            // already upvoted but not downvoted
            const removeId = reactionUp.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionUp.splice(removeId, 1);
            }
            recipe.reactionDown.push(req.decoded.id);
            return recipe
              .update({
                upvote: recipe.upvote - 1,
                downvote: recipe.downvote + 1,
                reactionDown: recipe.reactionDown,
                reactionUp,
              })
              .then(() => setStatus(res, { recipe }, 200)); // Send back the updated recipe.
          }
          // if a user has not downvoted or upvoted then increment downvote count
          // and add userId into the reactionDown array
          recipe.reactionDown.push(req.decoded.id);
          return recipe
            .update({
              downvote: recipe.downvote + 1,
              reactionDown: recipe.reactionDown,
            })
            .then(() => setStatus(res, { recipe }, 200)); // Send back the updated recipe.
        }
      })
      .catch(() => setStatus(res, { success: false, error: 'recipe not found' }, 404));
  }

  /**
   * Delete a Recipe from the catalog
   *
   * @param {object} req
   * @param {object} res
   * @returns
   */
  static deleteRecipe(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        // if (!recipe) return setStatus(res, { success: false, status: 'Recipe not found' }, 404);
        return recipe
          .destroy()
          .then(() => setStatus(res, { success: true, status: 'Recipe deleted' }, 200))
          .catch(() => setStatus(res, { success: false, error: 'something went wrong' }, 400));
      })
      .catch(() => setStatus(res, { success: false, error: 'recipe not found' }, 404));
  }
}

export default moreRecipes;
