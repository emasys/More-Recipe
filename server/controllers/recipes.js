import Validator from 'validatorjs';

import { Users, Recipes, Reviews, Favorite } from '../models';
import { validateAddRecipes, setStatus } from '../middleware/helper';

// const sequelize = new Sequelize;

/**
 * parent class
 * @class MoreRecipe
 * @type {static}
 * for a debug, just add error to all the catch()
 * to see ugly sequelize errors i.e catch((error) => ... )
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
    const arr = req.body.ingredients;
    // to convert ingredient's strings into and array with no trailing space
    const getArr = input => input.trim().split(/\s*,\s*/);
    const validator = new Validator(request, validateAddRecipes());
    if (validator.passes()) {
      Users.findById(req.decoded.id)
        .then((user) => {
          if (!user) {
            return setStatus(
              res,
              {
                success: false,
                error: 'User not found'
              },
              404
            );
          }
          // check if the same user is mistakenly duplicating her/her recipes
          Recipes.findOne({
            where: {
              name: request.name,
              userId: req.decoded.id
            }
          }).then((recipeExist) => {
            if (recipeExist) {
              return setStatus(
                res,
                {
                  success: false,
                  error: 'recipe already added to the database'
                },
                403
              );
            }
            return Recipes.create({
              name: request.name,
              direction: request.direction,
              userId: req.decoded.id,
              description: request.description,
              category: request.category,
              foodImg: request.foodImg,
              ingredients: getArr(arr),
              searchIng: arr
            })
              .then(recipe => setStatus(res, { success: true, recipe }, 201))
              .catch(() =>
                setStatus(res, { success: false, error: 'Not added' }, 500));
          });
        })
        .catch(() =>
          setStatus(
            res,
            {
              success: false,
              error: 'something went wrong'
            },
            500
          ));
    } else {
      return setStatus(
        res,
        { success: false, error: validator.errors.all() },
        422
      );
    }
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
    // Get sorted (by upvote) recipe list
    if (req.query.sort === 'upvotes' && req.query.order) {
      return Recipes.findAll({
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
    }
    if (req.query.sort === 'favorite' && req.query.order) {
      return Recipes.findAll({
        offset: req.params.offset,
        limit: req.params.page,
        order: [['favorite', 'DESC']]
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
    }
    if (req.query.sort === 'views' && req.query.order) {
      return Recipes.findAll({
        limit: req.params.page,
        offset: req.params.offset,
        order: [['views', 'DESC']]
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
    }
    return Recipes.findAll({
      offset: req.params.offset,
      limit: req.params.page,
      order: [['createdAt', 'DESC']]
    })
      .then(recipes =>
        Recipes.count().then(count =>
          setStatus(res, { success: true, recipes, count }, 200)))
      .catch(() =>
        setStatus(res, { success: false, error: 'something went wrong' }, 500));
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
    return Recipes.findAll({
      where: {
        category: req.body.category
      },
      order: [['createdAt', 'DESC']]
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
   * @returns {object} list of recipes of a particular user
   * @memberof MoreRecipes
   */
  static listPrivateRecipes(req, res) {
    return Recipes.findAll({
      limit: req.params.limit,
      offset: req.params.offset,
      where: {
        userId: req.params.id
      }
    })
      .then(recipes => setStatus(res, { success: true, recipes }, 200))
      .catch(() =>
        setStatus(
          res,
          { success: false, error: 'Unable to fetch your recipes' },
          500
        ));
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
    const query = req.body.query.trim();
    return Recipes.findAll({
      where: {
        $or: [
          { name: { ilike: `%${query}%` } },
          // { searchIng: { ilike: `%${breaker}%` } },
          { searchIng: { ilike: `%${query}%` } }
        ]
      }
    })
      .then(recipes => setStatus(res, { success: true, recipes }, 200))
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
        if (req.decoded.id) {
          if (req.decoded.id !== recipe.userId) {
            return recipe
              .update({
                comments: recipe.reviews.length,
                favorite: recipe.favorites.length,
                views: recipe.views + 1
              })
              .then(() => setStatus(res, { success: true, recipe }, 200));
          }
          return recipe
            .update({
              comments: recipe.reviews.length,
              favorite: recipe.favorites.length,
              views: recipe.views
            })
            .then(() => setStatus(res, { success: true, recipe }, 200));
        }
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
        {
          model: Reviews,
          as: 'reviews'
        },
        {
          model: Favorite,
          as: 'favorites'
        }
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
    const arr = req.body.ingredients;
    const getArr = input => input.trim().split(/\s*,\s*/);
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
        Recipes.findOne({
          where: {
            name: req.body.name
          }
        })
          .then((isExist) => {
            if (isExist) {
              return setStatus(
                res,
                {
                  success: false,
                  error: 'recipe already added to the database'
                },
                409
              );
            }

            // Prevent other users from editing a recipe not theirs.
            if (recipe.userId === req.decoded.id) {
              return recipe
                .update({
                  name: req.body.name || recipe.name,
                  direction: req.body.direction || recipe.direction,
                  description: req.body.description || recipe.description,
                  ingredients: getArr(arr) || recipe.ingredients,
                  searchIng: arr,
                  foodImg: req.body.foodImg || recipe.foodImg,
                  category: req.body.category || recipe.category
                })
                .then(() => setStatus(res, { success: true, recipe }, 200));
              // Send back the updated recipe.
            }
            return setStatus(
              res,
              { success: false, status: 'cannot update this recipe' },
              401
            );
          })
          .catch(() =>
            setStatus(res, { success: false, error: 'recipe not found' }, 404));
      })
      .catch(() =>
        setStatus(res, { success: false, error: 'recipe not found' }, 404));
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
        // check if a user is logged in
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionUp.indexOf(Number(req.decoded.id)) !== -1) {
            // Check if a user has already upvoted, then "unupvote"
            const removeId = reactionUp.indexOf(Number(req.decoded.id));
            if (removeId > -1) reactionUp.splice(removeId, 1);
            return recipe
              .update({
                upvote: recipe.upvote - 1,
                reactionUp: recipe.reactionUp
              })
              .then(() =>
                setStatus(
                  res,
                  { success: true, recipe, status: 'upvote cancelled' },
                  200
                ));
          } else if (
            reactionUp.indexOf(Number(req.decoded.id)) === -1 &&
            reactionDown.indexOf(Number(req.decoded.id)) !== -1
          ) {
            // check if a user has already downvoted,
            // then cancel it and upvote instead
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
                reactionDown
              })
              .then(() =>
                setStatus(
                  res,
                  { success: true, recipe, status: 'upvoted' },
                  200
                ));
          }
          // upvote if a user has not previously done so
          recipe.reactionUp.push(req.decoded.id);
          return recipe
            .update({
              upvote: recipe.upvote + 1,
              reactionUp: recipe.reactionUp
            })
            .then(() =>
              setStatus(
                res,
                {
                  success: true,
                  recipe,
                  status: 'upvoted'
                },
                200
              ));
        }
      })
      .catch(() =>
        setStatus(res, { success: false, error: 'something went wrong' }, 404));
  }

  /**
   *
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} a new value for downvote
   * @memberof MoreRecipes
   */
  static downvote(req, res) {
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
        if (req.decoded.id) {
          const { reactionDown, reactionUp } = recipe;
          if (reactionDown.indexOf(Number(req.decoded.id)) !== -1) {
            // if user has downvoted before, cancel it
            const removeId = reactionDown.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionDown.splice(removeId, 1);
            }
            return (
              recipe
                .update({
                  downvote: recipe.downvote - 1,
                  reactionDown: recipe.reactionDown
                })
                // Send back the updated recipe.
                .then(() =>
                  setStatus(
                    res,
                    { success: true, recipe, status: 'downvote cancelled' },
                    200
                  ))
            );
          } else if (
            reactionDown.indexOf(Number(req.decoded.id)) === -1 &&
            reactionUp.indexOf(Number(req.decoded.id)) !== -1
          ) {
            // if user has not downvoted but have upvoted,
            // then cancel upvote and set downvote
            const removeId = reactionUp.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionUp.splice(removeId, 1);
            }
            recipe.reactionDown.push(req.decoded.id);
            return (
              recipe
                .update({
                  upvote: recipe.upvote - 1,
                  downvote: recipe.downvote + 1,
                  reactionDown: recipe.reactionDown,
                  reactionUp
                })
                // Send back the updated recipe.
                .then(() =>
                  setStatus(
                    res,
                    { success: true, recipe, status: 'downvoted' },
                    200
                  ))
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
              .then(() =>
                setStatus(
                  res,
                  { success: true, recipe, status: 'downvoted' },
                  200
                ))
          );
        }
      })
      .catch(() =>
        setStatus(res, { success: false, error: 'recipe not found' }, 404));
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
