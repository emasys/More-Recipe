import Validator from 'validatorjs';
import { Users, Recipes, Reviews } from '../models';

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
    const validator = new Validator(request, Recipes.createRules());
    if (validator.passes()) {
      Users.findById(req.decoded.id)
        .then((user) => {
          if (!user) {
            return res.status(404).send({ success: false, error: 'User not found' });
          }
          return Recipes.create({
            name: request.name,
            direction: request.direction,
            userId: req.decoded.id,
            ingredients: request.ingredients

          })
            .then(recipe => res.status(201).send({ success: true, recipe }))
            .catch(error => res.status(404).send({ success: false, error: error.error }));
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
    if ((req.query.sort) && (req.query.order)) {
      return Recipes
        .findAll({ limit: 10, order: [['upvote', 'DESC']] })
        .then(recipes => res.status(200).json({ success: true, recipes }))
        .catch(() => res.status(400));
    }

    return Recipes
      .findAll({
        include: [{
          model: Reviews,
          as: 'reviews',
        }],
      })
      .then(recipes => res.status(200).send({ success: true, recipes }))
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
    return Recipes
      .findById(req.params.recipeId, {
        include: [{
          model: Reviews,
          as: 'reviews',
        }]
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({ success: false, status: 'Recipes not found' });
        }
        if (req.decoded.id) {
          let x = recipe.viewed;
          x = x.split(',');
          if (x.indexOf(String(req.decoded.id)) === -1) {
            return recipe
              .update({
                views: recipe.views + 1,
                viewed: recipe.viewed + (req.decoded.id === recipe.userId ? req.decoded.id : '')
              });// increment views by 1 only once, if user created it
          }
        }
        return recipe
          .update({
            views: recipe.views,
          });// increment views by 1 everytime others view the recipe
      })
      .then((recipe) => {
        if (!recipe) {
          res.status(404).send({ success: false, status: 'Recipe not found' });
        }
        if (req.decoded && req.decoded.id && req.decoded.id === recipe.userId) recipe.views = 1;
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
    return Recipes
      .findById(req.params.recipeId, {
        include: [{
          model: Reviews,
          as: 'reviews',
        }]
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            status: 'Recipe Not Found',
          });
        }
        return recipe
          .update({
            name: req.body.name || recipe.name,
            direction: req.body.direction || recipe.direction,
            ingredients: req.body.ingredients || recipe.ingredients,
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
   * @param {object} req
   * @param {object} res
   * @returns a new value for upvote
   * @memberof moreRecipes
   */
  static upvote(req, res) {
    return Recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            status: 'Recipe Not Found',
          });
        } else if (req.decoded.id) {
          let x = recipe.reaction;
          x = x.split(',');
          if (x.indexOf(String(req.decoded.id)) !== -1) {
            const removeId = x.indexOf(String(req.decoded.id));
            if (removeId > -1) {
              x.splice(removeId, 1);
            }
            recipe.reaction = x.join(',');
            return recipe
              .update({
                upvote: recipe.upvote - 1,
                reaction: `${recipe.reaction},`,
              })
              .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          }
        }
        return recipe
          .update({
            upvote: recipe.upvote + 1,
            reaction: `${recipe.reaction + req.decoded.id},`,
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
   * @param {object} req
   * @param {object} res
   * @returns a new value for downvote
   * @memberof moreRecipes
   */
  static downvote(req, res) {
    return Recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            success: false,
            status: 'Recipe Not Found',
          });
        } else if (req.decoded.id) {
          let x = recipe.reaction;
          x = x.split(',');
          if (x.indexOf(String(req.decoded.id)) !== -1) {
            const removeId = x.indexOf(String(req.decoded.id));
            if (removeId > -1) {
              x.splice(removeId, 1);
            }
            recipe.reaction = x.join(',');
            return recipe
              .update({
                downvote: recipe.downvote - 1,
                reaction: `${recipe.reaction},`,
              })
              .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
              .catch(error => res.status(400).send({ success: false, error }));
          }
        }
        return recipe
          .update({
            downvote: recipe.downvote + 1,
            reaction: `${recipe.reaction + req.decoded.id},`,
          })
          .then(() => res.status(200).send(recipe)) // Send back the updated recipe.
          .catch(error => res.status(400).send({ success: false, error }));
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
    return Recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          res.status(404).json({ success: false, status: 'Recipe not found' });
        }
        return recipe
          .destroy()
          .then(() => res.status(200).send({ success: true, status: 'Recipe deleted' }))
          .catch(error => res.status(400).send({ error }));
      })
      .catch(error => res.status(400).send({ error }));
  }
}

export default moreRecipes;
