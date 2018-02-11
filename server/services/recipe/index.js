import { pick } from 'lodash';
import { Users, TokenGen, Recipes } from '../../models';
import { setStatus, signToken, mailer } from '../../middleware/helper';

const convertToArray = (input) => {
  console.log(input);
  if (input) {
    const initialArray = input.trim().split(/\s*,\s*/);
    const finalArray = [];
    initialArray.map((item) => {
      if (item) {
        finalArray.push(item);
      }
    });
    return finalArray;
  }
  return null;
};

export const sortRecipe = (req, res, column, order) =>
  Recipes.findAll({
    offset: req.params.offset,
    limit: req.params.page,
    order: [[column, order]]
  })
    .then(recipes =>
      Recipes.count().then(count =>
        setStatus(res, { success: true, recipes, count }, 200)))

    .catch(error =>
      setStatus(res, { success: false, error: error.message }, 500));

export const addNewRecipe = (res, req, request, ingredients) => {
  Users.findById(req.decoded.id)
    .then((user) => {
      if (!user) {
        return setStatus(res, { success: false, error: 'Not found' }, 404);
      }
      // check if the same user is mistakenly duplicating her/her recipes
      Recipes.findOne({
        where: { name: request.name, userId: req.decoded.id }
      }).then((recipeExist) => {
        if (recipeExist) {
          return setStatus(res, { success: false, error: 'Added' }, 403);
        }
        return Recipes.create({
          name: request.name,
          direction: request.direction,
          userId: req.decoded.id,
          description: request.description,
          category: request.category,
          foodImg: request.foodImg,
          ingredients: convertToArray(ingredients),
          searchIng: ingredients
        }).then(recipe => setStatus(res, { success: true, recipe }, 201));
      });
    })
    .catch(error =>
      setStatus(res, { success: false, error: error.message }, 500));
};

export const fetchOneRecipe = (res, req, recipe) => {
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
        favorite: recipe.favorites.length
      })
      .then(() => setStatus(res, { success: true, recipe }, 200));
  }
};

export const findAndUpdateRecipe = (res, req, recipe, ingredients) => {
  Recipes.findOne({ where: { name: req.body.name } })
    .then((isExist) => {
      if (isExist) {
        return setStatus(
          res,
          { success: false, error: 'recipe already exist' },
          409
        );
      }
    })
    .catch(() => setStatus(res, { success: false, error: 'not found' }, 404));
  // Prevent other users from editing a recipe not theirs.
  console.log(ingredients);
  if (recipe.userId === req.decoded.id) {
    return recipe
      .update({
        name: req.body.name || recipe.name,
        direction: req.body.direction || recipe.direction,
        description: req.body.description || recipe.description,
        ingredients: convertToArray(ingredients) || recipe.ingredients,
        searchIng: ingredients,
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
};

export const cancelVote = (
  res,
  req,
  reaction,
  recipe,
  voteTypeCount,
  voteType
) => {
  const removeId = reaction.indexOf(req.decoded.id);
  if (removeId > -1) reaction.splice(removeId, 1);
  return recipe
    .update({
      [voteTypeCount]: recipe[voteTypeCount] - 1,
      [voteType]: recipe[voteType]
    })
    .then(() =>
      setStatus(res, { success: true, recipe, status: 'cancelled' }, 200));
};

export const transferVote = (
  res,
  req,
  reaction,
  recipe,
  reactionType,
  upvote,
  downvote,
  setReaction
) => {
  const removeId = reaction.indexOf(req.decoded.id);
  if (removeId !== -1) {
    reaction.splice(removeId, 1);
  }
  recipe[reactionType].push(req.decoded.id);
  return recipe
    .update({
      [upvote]: recipe[upvote] + 1,
      [downvote]: recipe[downvote] - 1,
      [reactionType]: recipe[reactionType],
      [setReaction]: reaction
    })
    .then(() =>
      setStatus(res, { success: true, recipe, status: 'voted' }, 200));
};
