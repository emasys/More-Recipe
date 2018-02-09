import { pick } from 'lodash';

import { Recipes, Users } from '../models';
import { setStatus, signToken } from '../middleware/helper';

export const sortRecipe = (req, res, column, order) =>
  Recipes.findAll({
    offset: req.params.offset,
    limit: req.params.page,
    order: [[column, order]]
  })
    .then(recipes =>
      Recipes.count().then(count =>
        setStatus(res, { success: true, recipes, count }, 200)))

    .catch(() =>
      setStatus(res, { success: false, error: 'something went wrong' }, 500));

export const voteController = (
  req,
  res,
  responsePromise,
  voteTypeA,
  voteTypeB,
  reactUp,
  reactDown
) => {
  if (req.decoded.id) {
    const { reactionDown, reactionUp } = responsePromise;
    reactDown = reactionDown;
    reactUp = reactionUp;
    if (reactUp.indexOf(Number(req.decoded.id)) !== -1) {
      // Check if a user has already upvoted, then cancel it
      const removeId = reactUp.indexOf(Number(req.decoded.id));
      if (removeId > -1) reactUp.splice(removeId, 1);
      console.log(reactUp);
      return responsePromise
        .update({
          [voteTypeA]: responsePromise[voteTypeA] - 1,
          [reactUp]: responsePromise[reactUp]
        })
        .then(() =>
          setStatus(
            res,
            {
              success: true,
              recipe: responsePromise,
              status: 'vote cancelled'
            },
            200
          ));
    } else if (
      reactUp.indexOf(Number(req.decoded.id)) === -1 &&
      reactDown.indexOf(Number(req.decoded.id)) !== -1
    ) {
      // check if a user has already downvoted,
      // then cancel it and upvote instead
      const removeId = reactDown.indexOf(Number(req.decoded.id));
      if (removeId > -1) {
        reactDown.splice(removeId, 1);
      }
      responsePromise.reactUp.push(req.decoded.id);
      return responsePromise
        .update({
          [voteTypeA]: responsePromise[voteTypeA] + 1,
          [voteTypeB]: responsePromise[voteTypeB] - 1,
          [reactUp]: responsePromise[reactUp]
          // reactionDown
        })
        .then(() =>
          setStatus(
            res,
            { success: true, recipe: responsePromise, status: 'voted' },
            200
          ));
    }
    // upvote if a user has not previously done so
    responsePromise.reactUp.push(req.decoded.id);
    return responsePromise
      .update({
        [voteTypeA]: responsePromise[voteTypeA] + 1,
        [reactUp]: responsePromise[reactUp]
      })
      .then(() =>
        setStatus(
          res,
          {
            success: true,
            recipe: responsePromise,
            status: 'upvoted'
          },
          200
        ));
  }
};
