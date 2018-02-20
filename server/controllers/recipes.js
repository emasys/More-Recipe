import Validator from 'validatorjs';

import { Users, Recipes, Reviews, Favorite } from '../models';
import { validateAddRecipes, setStatus } from '../middleware/helper';
import {
  addNewRecipe,
  sortRecipe,
  fetchOneRecipe,
  findAndUpdateRecipe,
  cancelVote,
  transferVote
} from '../services/recipe';

// const sequelize = new Sequelize;

/**
 * parent class
 * @class MoreRecipe
 * @type {static}
 */
class RecipeController {
  /**
   * Add a new recipe to the catalog
   * @returns {object} new recipe
   * @param {object} req
   * @param {object} res
   */
  static addRecipe(req, res) {
    const request = req.body;
    const { ingredients } = req.body;
    // to convert ingredient's strings into and array with no trailing space
    const validator = new Validator(request, validateAddRecipes());
    if (validator.passes()) {
      return addNewRecipe(res, req, request, ingredients);
    }
    return setStatus(
      res,
      { success: false, error: validator.errors.all() },
      422
    );
  }

  // counter(){
  //   Recipes.findAll({})
  // }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} list of all recipes
   * @memberof MoreRecipes
   */
  static listRecipes(req, res) {
    // Get sorted recipe list
    if (req.query.sort === 'upvotes' && req.query.order) {
      return sortRecipe(req, res, 'upvote', 'DESC');
    }
    if (req.query.sort === 'favorite' && req.query.order) {
      return sortRecipe(req, res, 'favorite', 'DESC');
    }
    if (req.query.sort === 'views' && req.query.order) {
      return sortRecipe(req, res, 'views', 'DESC');
    }
    return sortRecipe(req, res, 'createdAt', 'DESC');
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} {object} recipes of a particular category
   * @memberof MoreRecipes
   */
  static listRecipeCategory(req, res) {
    return Recipes.findAndCountAll({
      limit: req.params.limit,
      offset: req.params.offset,
      where: {
        category: req.body.category
      },
      order: [['createdAt', 'DESC']]
    })
      .then(recipes =>
        setStatus(
          res,
          { success: true, recipes: recipes.rows, count: recipes.count },
          200
        ))
      .catch(() =>
        setStatus(res, { success: false, error: 'something went wrong' }, 500));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} list of recipes of a particular user
   * @memberof MoreRecipes
   */
  static listPrivateRecipes(req, res) {
    return Recipes.findAll({
      limit: req.params.limit,
      offset: req.params.offset,
      order: [['createdAt', 'DESC']],
      where: {
        userId: req.params.id
      }
    })
      .then(recipes => setStatus(res, { success: true, recipes }, 200))
      .catch(() =>
        setStatus(res, { success: false, error: 'something went wrong' }, 500));
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object}  result of search query
   * @memberof MoreRecipes
   */
  static SearchRecipe(req, res) {
    if (!req.body.query) {
      return setStatus(
        res,
        { success: false, error: 'query cannot be empty' },
        200
      );
    }
    const query = req.body.query.trim();
    return Recipes.findAndCountAll({
      limit: req.params.limit,
      offset: req.params.offset,
      where: {
        $or: [
          { name: { ilike: `%${query}%` } },
          { searchIng: { ilike: `%${query}%` } }
        ]
      }
    })
      .then(recipes =>
        setStatus(
          res,
          { success: true, recipes: recipes.rows, count: recipes.count },
          200
        ))
      .catch(() =>
        setStatus(res, { success: false, error: 'Something went wrong' }, 500));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} a single recipe and increment views count
   * @memberof MoreRecipes
   */
  static getRecipe(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [
        {
          model: Reviews,
          as: 'reviews'
        },
        {
          model: Favorite,
          as: 'favorites'
        }
      ]
    })
      .then((recipe) => {
        // if other users view the recipe, the view count increases
        // the creator of the recipe gets only one count
        fetchOneRecipe(res, req, recipe);
      })
      .catch(() =>
        setStatus(res, { success: false, status: 'Recipes not found' }, 404));
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object}
   * get reaction counts eg favorite, likes
   * @memberof MoreRecipes
   */
  static getReactionCount(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [
        { model: Reviews, as: 'reviews' },
        { model: Favorite, as: 'favorites' }
      ],
      order: [[{ model: Reviews, as: 'reviews' }, 'createdAt', 'DESC']]
    })
      .then((recipe) => {
        if (req.decoded.id) {
          return recipe
            .update({
              favorite: recipe.favorites.length
            })
            .then(() => setStatus(res, { success: true, recipe }, 200));
        }
      })
      .catch(() =>
        setStatus(res, { success: false, status: 'Recipes not found' }, 404));
  }

  /**
   * Update Recipe
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated recipe
   */
  static updateRecipe(req, res) {
    // const IngredientArray = req.body.ingredients;
    const { ingredients } = req.body;
    // const getArr = input => input.trim().split(/\s*,\s*/);
    return Recipes.findById(req.params.recipeId, {
      include: [
        { model: Reviews, as: 'reviews' },
        { model: Favorite, as: 'favorites' }
      ]
    })
      .then(recipe => findAndUpdateRecipe(res, req, recipe, ingredients))
      .catch(() =>
        setStatus(res, { success: false, error: 'something went wrong' }, 500));
  }
  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} a new value for upvote
   * @memberof MoreRecipes
   */
  static upvote(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [
        { model: Reviews, as: 'reviews' },
        { model: Favorite, as: 'favorites' }
      ]
    })
      .then((recipe) => {
        // check if a user is logged in
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionUp.indexOf(req.decoded.id) !== -1) {
            // eslint-disable-next-line
            return cancelVote(
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
            return transferVote(
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
      .catch(error =>
        setStatus(res, { success: false, error: error.message }, 500));
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} a new value for downvote
   * @memberof MoreRecipes
   */
  static downvote(req, res) {
    return Recipes.findById(req.params.recipeId, {
      include: [
        { model: Reviews, as: 'reviews' },
        { model: Favorite, as: 'favorites' }
      ]
    })
      .then((recipe) => {
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionDown.indexOf(Number(req.decoded.id)) !== -1) {
            // if user has downvoted before, cancel it
            return cancelVote(
              res,
              req,
              reactionDown,
              recipe,
              'downvote',
              'reactionDown'
            );
          } else if (
            reactionDown.indexOf(Number(req.decoded.id)) === -1 &&
            reactionUp.indexOf(Number(req.decoded.id)) !== -1
          ) {
            // if user has not downvoted but have upvoted,
            // then cancel upvote and set downvote
            return transferVote(
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
      .catch(error =>
        setStatus(res, { success: false, error: error.message }, 500));
  }

  /**
   * Delete a Recipe from the catalog
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} success message
   */
  static deleteRecipe(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then((recipe) => {
        // Check if the deletor is the creator of the recipe
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
      .catch(() =>
        setStatus(res, { success: false, error: 'recipe not found' }, 404));
  }
}

export default RecipeController;
