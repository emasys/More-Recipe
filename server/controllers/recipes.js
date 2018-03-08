import Validator from 'validatorjs';
import { capitalize } from 'lodash';
import { Recipes, Reviews, Favorite } from '../models';
import {
  validateAddRecipes,
  setStatus,
  notFoundDispatcher,
  serverErrorDispatcher
} from '../middleware/helper';
import * as services from '../services/recipe';

/**
 * parent class
 * @class MoreRecipe
 * @type {static}
 */
class RecipeController {
  /**
   * Add a new recipe to the catalog
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} New recipe
   *
   * @memberof RecipeController
   */
  static addRecipe(req, res) {
    const request = req.body;
    const { ingredients } = req.body;
    // to convert ingredient's strings into and array with no trailing space
    const validator = new Validator(request, validateAddRecipes());
    if (validator.passes()) {
      return services.addNewRecipe(res, req, request, ingredients);
    }
    return setStatus(
      res,
      { success: false, error: validator.errors.all() },
      422
    );
  }

  /**
   * Fetch all recipes in the database
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} list of all recipes
   *
   * @memberof RecipeController
   */
  static listRecipes(req, res) {
    // Get sorted recipe list
    const sortBy = req.query.sort || 'createdAt';
    const orderBy = req.query.order || 'desc';
    const searchBy = req.query.search;
    const byCategory = req.query.category;
    if (sortBy && orderBy && !searchBy && !byCategory) {
      return services.sortRecipe(req, res, sortBy, orderBy);
    }
    if (searchBy) {
      const query = searchBy.trim();
      return services.searchRecipes(req, res, query);
    }
    if (byCategory) {
      const category = capitalize(byCategory.trim());
      return services.fetchCategory(res, req, category);
    }
  }
  /**
   * list recipes of a particular user
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} list of recipes of a particular user
   *
   * @memberof MoreRecipes
   */
  static listPrivateRecipes(req, res) {
    return Recipes.findAndCountAll({
      limit: req.query.limit || 1,
      offset: req.query.offset || 0,
      order: [['createdAt', 'DESC']],
      where: {
        userId: req.params.userId
      }
    })
      .then((recipes) => {
        if (!recipes) {
          return notFoundDispatcher(res);
        }
        return setStatus(
          res,
          { success: true, recipes: recipes.rows, count: recipes.count },
          200
        );
      })
      .catch(error => serverErrorDispatcher(res, error));
  }
  /**
   * Fetch a single recipe
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} a single recipe
   *
   * @memberof RecipeController
   */
  static getRecipe(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [{ model: Favorite, as: 'favorites' }]
    })
      .then((recipe) => {
        if (!recipe) {
          return notFoundDispatcher(res);
        }
        return services.fetchOneRecipe(res, req, recipe);
      })
      .catch(error => serverErrorDispatcher(res, error));
  }

  /**
   * Fetch single recipe without view count
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object}
   * get reaction counts eg favorite, likes
   * @memberof RecipeController
   */
  static getReactionCount(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [{ model: Favorite, as: 'favorites' }]
    })
      .then((recipe) => {
        if (!recipe) {
          return notFoundDispatcher(res);
        }
        return setStatus(res, { success: true, recipe }, 200);
      })
      .catch(error => serverErrorDispatcher(res, error));
  }

  /**
   * Update Recipe
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} updated recipe
   *
   * @memberof RecipeController
   */
  static updateRecipe(req, res) {
    const { ingredients } = req.body;
    return Recipes.findById(req.params.recipeId, {
      include: [
        { model: Reviews, as: 'reviews' },
        { model: Favorite, as: 'favorites' }
      ]
    })
      .then((recipe) => {
        if (!recipe) {
          return notFoundDispatcher(res);
        }
        return services.findAndUpdateRecipe(res, req, recipe, ingredients);
      })
      .catch(error => serverErrorDispatcher(res, error));
  }
  /**
   * Upvote a recipe
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} recipe object
   *
   * @memberof RecipeController
   */
  static upvote(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [{ model: Favorite, as: 'favorites' }]
    })
      .then((recipe) => {
        if (!recipe) {
          return notFoundDispatcher(res);
        }
        // check if a user is logged in
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionUp.indexOf(req.decoded.id) !== -1) {
            return services.cancelVote(
              res,
              req,
              reactionUp,
              recipe,
              'upvote',
              'reactionUp'
            );
          } else if (
            reactionUp.indexOf(req.decoded.id) === -1 &&
            reactionDown.indexOf(req.decoded.id) !== -1
          ) {
            // check if a user has already downvoted,
            // then cancel it and upvote instead
            // eslint-disable-next-line
            return services.transferVote(
              res,
              req,
              reactionDown,
              recipe,
              'reactionUp',
              'upvote',
              'downvote',
              'reactionDown'
            );
          }
          // upvote if a user has not previously done so
          recipe.reactionUp.push(req.decoded.id);
          return recipe
            .update({
              upvote: recipe.upvote + 1,
              reactionUp: recipe.reactionUp
            })
            .then(() => setStatus(res, { success: true, recipe }, 200));
        }
      })
      .catch(error => serverErrorDispatcher(res, error));
  }

  /**
   * Downvote
   *
   * @static
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} a new value for downvote and recipe object
   *
   * @memberof RecipeController
   */
  static downvote(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [{ model: Favorite, as: 'favorites' }]
    })
      .then((recipe) => {
        if (!recipe) {
          return notFoundDispatcher(res);
        }
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionDown.indexOf(req.decoded.id) !== -1) {
            // if user has downvoted before, cancel it
            return services.cancelVote(
              res,
              req,
              reactionDown,
              recipe,
              'downvote',
              'reactionDown'
            );
          } else if (
            reactionDown.indexOf(req.decoded.id) === -1 &&
            reactionUp.indexOf(req.decoded.id) !== -1
          ) {
            // if user has not downvoted but have upvoted,
            // then cancel upvote and set downvote
            return services.transferVote(
              res,
              req,
              reactionUp,
              recipe,
              'reactionDown',
              'downvote',
              'upvote',
              'reactionUp'
            );
          }
          // if a user has not downvoted or upvoted then
          // increment downvote count and add userId into the reactionDown array
          recipe.reactionDown.push(req.decoded.id);
          return (
            recipe
              .update({
                downvote: recipe.downvote + 1,
                reactionDown: recipe.reactionDown
              })
              // Send back the updated recipe.
              .then(() => setStatus(res, { success: true, recipe }, 200))
          );
        }
      })
      .catch(error => serverErrorDispatcher(res, error));
  }

  /**
   * Delete a Recipe from the database
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} status message
   *
   * @memberof RecipeController
   */
  static deleteRecipe(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return notFoundDispatcher(res);
        }
        // Check if the user is the creator of the recipe
        if (recipe.userId === req.decoded.id) {
          return recipe
            .destroy()
            .then(() =>
              setStatus(res, { success: true, status: 'Recipe deleted' }, 200));
        }
        return setStatus(
          res,
          { success: false, status: 'cannot delete this recipe' },
          401
        );
      })
      .catch(error => serverErrorDispatcher(res, error));
  }
}

export default RecipeController;
