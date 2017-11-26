import Validator from 'validatorjs';
import { Users, Recipes, Reviews, Favorite } from '../models';

/**
 * parent class
 * @class moreRecipe
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
    if (req.file) {
      request.foodImg = req.file.filename;
      console.log(req.file);
    }
    const arr = req.body.ingredients;
    const getArr = input => input.split(',');
    const validator = new Validator(request, Recipes.createRules());
    if (validator.passes()) {
      Users.findById(req.decoded.id)
        .then(user => {
          if (!user) {
            return res
              .status(404)
              .send({ success: false, error: 'User not found' });
          }
          return Recipes.create({
            name: request.name,
            direction: request.direction,
            userId: req.decoded.id,
            description: request.description,
            category: request.category,
            foodImg: request.foodImg,
            ingredients: getArr(arr)
          })
            .then(recipe => res.status(201).send({ success: true, recipe }))
            .catch(error =>
              res.status(401).send({ success: false, error: 'Not added' })
            );
        })
        .catch(error => res.status(404).send(error));
    } else {
      return res.status(401).send({ validatorMessage: validator.errors.all() });
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
    if (req.query.sort && req.query.order) {
      return Recipes.findAll({ limit: 12, order: [['upvote', 'DESC']] })
        .then(recipes => res.status(200).json({ success: true, recipes }))
        .catch(() => res.status(400));
    }

    return Recipes.findAll({
      limit: req.params.page,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Reviews,
          as: 'reviews'
        }
      ]
    })
      .then(recipes => res.status(200).send({ success: true, recipes }))
      .catch(error => res.status(400).send({ success: false, error }));
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
        userId: req.decoded.id
      }
    })
      .then(recipes => res.status(200).send({ success: true, recipes }))
      .catch(error => res.status(400).send({ success: false, error }));
  }

  // static NextListRecipes(req, res) {
  //   return Recipes.findAll({
  //     limit: 10,
  //     offset: req.body.offset,
  //     include: [
  //       {
  //         model: Reviews,
  //         as: 'reviews'
  //       }
  //     ]
  //   })
  //     .then(recipes => res.status(200).send({ success: true, recipes }))
  //     .catch(error => res.status(400).send({ success: false, error }));
  // }
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
          { direction: { ilike: `%${req.body.query}%` } },
          { description: { ilike: `%${req.body.query}%` } },
          { ingredients: { $contains: [`${req.body.query}`] } }
        ]
      }
    })
      .then(recipes => {
        return res.status(200).send({ recipes });
      })
      .catch(error => res.status(400).send({ success: false, error }));
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
          as: 'reviews'
        },
        {
          model: Favorite,
          as: 'favorites'
        }
      ]
    })
      .then(recipe => {
        if (!recipe) {
          res.status(404).send({ success: false, status: 'Recipes not found' });
        }
        if (req.decoded.id) {
          if (req.decoded.id !== recipe.userId) {
            return recipe.update({
              comments: recipe.reviews.length,
              favorite: recipe.favorites.length,
              views: recipe.views + 1
            });
          }
          return recipe.update({
            comments: recipe.reviews.length,
            favorite: recipe.favorites.length,
            views: recipe.views
          });
        }
      })
      .then(recipe => {
        res.status(200).send({ success: true, recipe });
      })
      .catch(error => res.status(400).send({ success: false, error }));
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
    const getArr = input => input.split(',');
    return Recipes.findById(req.params.recipeId, {})
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            status: 'Recipe Not Found'
          });
        }
        return recipe
          .update({
            name: req.body.name || recipe.name,
            direction: req.body.direction || recipe.direction,
            description: req.body.description || recipe.description,
            ingredients: getArr(arr) || recipe.ingredients
          })
          .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
          .catch(error => res.status(400).send({ success: false, error }));
      })
      .catch(error => res.status(400).send(error));
  }
  /**
 * 
 * 
 * @static
 * @param {any} req 
 * @param {any} res 
 * @returns the reaction status of a user
 * @memberof moreRecipes
 */
  static checkReactions(req, res) {
    return Recipes.findById(req.params.recipeId)
      .then(recipe => {
        if (recipe.reactionUp.indexOf(Number(req.decoded.id)) !== -1) {
          res.status(200).send({
            upvote: {
              success: true
            },
            downvote: {
              success: false
            }
          });
        } else if (recipe.reactionDown.indexOf(Number(req.decoded.id)) !== -1) {
          res.status(200).send({
            upvote: {
              success: false
            },
            downvote: {
              success: true
            }
          });
        } else {
          res.status(200).send({
            upvote: {
              success: false
            },
            downvote: {
              success: false
            }
          });
        }
      })
      .catch(error => res.status(400).send({ status: 'recipe not found' }));
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
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            status: 'Recipe Not Found'
          });
        }
        if (req.decoded.id) {
          let reactionUp = recipe.reactionUp;
          let reactionDown = recipe.reactionDown;
          if (reactionUp.indexOf(Number(req.decoded.id)) !== -1) {
            //already reacted
            let removeId = reactionUp.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionUp.splice(removeId, 1);
            }
            return recipe
              .update({
                upvote: recipe.upvote - 1,
                reactionUp: recipe.reactionUp
              })
              .then(() => res.status(200).send({ success: false, recipe })) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          } else if (
            reactionUp.indexOf(Number(req.decoded.id)) === -1 &&
            reactionDown.indexOf(Number(req.decoded.id)) !== -1
          ) {
            //already reacted
            let removeId = reactionDown.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionDown.splice(removeId, 1);
            }
            recipe.reactionUp.push(req.decoded.id);
            return recipe
              .update({
                upvote: recipe.upvote + 1,
                downvote: recipe.downvote - 1,
                reactionUp: recipe.reactionUp,
                reactionDown: reactionDown
              })
              .then(() => res.status(200).send({ success: true, recipe })) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          } else {
            recipe.reactionUp.push(req.decoded.id);
            return recipe
              .update({
                upvote: recipe.upvote + 1,
                reactionUp: recipe.reactionUp
              })
              .then(() => res.status(200).send({ success: true, recipe })) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          }
        }
      })
      .catch(error => res.status(400).send(error));
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
      .then(recipe => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            status: 'Recipe Not Found'
          });
        }
        if (req.decoded.id) {
          let reactionUp = recipe.reactionUp;
          let reactionDown = recipe.reactionDown;
          if (reactionDown.indexOf(Number(req.decoded.id)) !== -1) {
            //already reacted
            let removeId = reactionDown.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionDown.splice(removeId, 1);
            }
            return recipe
              .update({
                downvote: recipe.downvote - 1,
                reactionDown: recipe.reactionDown
              })
              .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          } else if (
            reactionDown.indexOf(Number(req.decoded.id)) === -1 &&
            reactionUp.indexOf(Number(req.decoded.id)) !== -1
          ) {
            //already reacted
            let removeId = reactionUp.indexOf(Number(req.decoded.id));
            if (removeId > -1) {
              reactionUp.splice(removeId, 1);
            }
            recipe.reactionDown.push(req.decoded.id);
            return recipe
              .update({
                upvote: recipe.upvote - 1,
                downvote: recipe.downvote + 1,
                reactionDown: recipe.reactionDown,
                reactionUp: reactionUp
              })
              .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          } else {
            recipe.reactionDown.push(req.decoded.id);
            return recipe
              .update({
                downvote: recipe.upvote + 1,
                reactionDown: recipe.reactionDown
              })
              .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          }
        }
      })
      .catch(error => res.status(400).send(error));
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
      .then(recipe => {
        if (!recipe) {
          res.status(404).json({ success: false, status: 'Recipe not found' });
        }
        return recipe
          .destroy()
          .then(() =>
            res.status(200).send({ success: true, status: 'Recipe deleted' })
          )
          .catch(error => res.status(400).send({ error }));
      })
      .catch(error => res.status(400).send({ error }));
  }
}

export default moreRecipes;
