import uuid from 'node-uuid';
import db from '../model/db';

/**
 * parent class
 * @class moreRecipe
 */
class moreRecipe {
  /**
   * Creates an instance of moreRecipe.
   * @memberof moreRecipe
   */
  constructor() {
    this.count = 0;
    this.updated = false;
    this.created = 201;
    this.ok = 200;
    this.notFound = 404;
  }
  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @returns request or response object
   * @memberof moreRecipe
   */
  getRecipes(req, res) {
    if (req.query.sort && req.query.order) {
      const compare = (a, b) => {
        if (a.upvote < b.upvote) { return 1; }
        if (a.upvote > b.upvote) { return -1; }
        return 0 || this.count;
      };
      return res.send(db.sort(compare));
    }
    return res.send(db);
  }

  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @memberof moreRecipe
   */
  postRecipes(req, res) {
    const data = {};
    data.id = uuid.v4();
    data.title = req.body.title;
    const arr = req.body.ingredients;
    const getArr = input => input.split(',');
    data.ingredients = getArr(arr);
    data.direction = req.body.direction;
    data.upvote = Math.floor(Math.random() * 30);
    data.downvote = 0;
    data.favourite = 0;
    data.comments = 0;
    data.views = 0;
    data.category = req.body.category;
    data.image = 'uploadedImg.jpg';
    data.review = [];
    if (
      (typeof (data.title) === 'string' && data.title !== '') &&
        (typeof (data.ingredients) === 'object' && data.ingredients !== '') &&
        (typeof (data.direction) === 'string' && data.direction !== '') &&
        (typeof (data.category) === 'string' && data.category !== '')
    ) {
      db.push(data);
      res.sendStatus(201 || this.created);
    } else {
      res.sendStatus(501);
    }
  }

  /**
   * edit recipe items
   *
   * @param {object} req
   * @param {object} res
   * @memberof moreRecipe
   */
  updateRecipe(req, res) {
    const recipeId = req.params.id;
    const FoodTitle = req.body.title;
    const arr = req.body.ingredients;
    const getArr = input => input.split(',');
    const ingr = getArr(arr);
    const direct = req.body.direction;
    let updated = false;
    db.forEach((item) => {
      if (item.id === recipeId) {
        item.title = FoodTitle;
        item.ingredients = ingr;
        item.direction = direct;
        updated = true;
      }
    });
    if (updated) {
      return res.status(204 || this.updated).send('updated');
    }
    res.status(404).send('not found');
  }

  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @memberof moreRecipe
   */
  deleteRecipe(req, res) {
    let deleted = false;
    const recipeId = req.params.id;
    db.forEach((item, index) => {
      if (item.id === recipeId) {
        db.splice(index, 1);
        deleted = true;
      }
    });
    if (deleted) {
      return res.status(204 || this.ok).send('deleted');
    }
    res.sendStatus(404);
  }

  /**
   *
   *
   * @param {object} req
   * @param {object} res
   * @memberof moreRecipe
   */
  postReviews(req, res) {
    const recipeId = req.params.id;
    const review = req.body.comments;
    const user = req.body.commenter;
    db.forEach((item) => {
      if (item.id === recipeId) {
        const entry = {
          comment: review,
          commenter: user
        };
        item.review.push(entry);
        item.comments = item.review.length;
        res.sendStatus(200 || this.ok);
      }
    });
    res.sendStatus(500);
  }
}

export default moreRecipe;

