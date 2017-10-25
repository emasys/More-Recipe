import express from 'express';
import list from '../db';

const router = express.Router();

router.get('/api/recipes', (req, res) => {
  res.send(list);
});

router.post('/api/recipes', (req, res) => {
  const data = {};
  data.id = list.length + 1;
  data.name = req.body.name;
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
    (typeof (data.name) === 'string' && data.name !== '') &&
    (typeof (data.title) === 'string' && data.title !== '') &&
    (typeof (data.ingredients) === 'object' && data.ingredients !== '') &&
    (typeof (data.direction) === 'string' && data.direction !== '') &&
    (typeof (data.category) === 'string' && data.category !== '')
  ) {
    list.push(data);
    res.status(200).send(list);
  } else {
    res.status(500).send({ error: 'all fields are required' });
  }
});

router.put('/api/recipes/:id', (req, res) => {
  const recipeId = Number(req.params.id);
  const FoodTitle = req.body.title;
  const arr = req.body.ingredients;
  const getArr = input => input.split(',');
  const ingr = getArr(arr);
  const direct = req.body.direction;
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === recipeId) {
      item.title = FoodTitle;
      item.ingredients = ingr;
      item.direction = direct;
      break;
    }
  }
  res.send(list);
});

router.post('/api/recipes/:id/reviews', (req, res) => {
  const recipeId = Number(req.params.id);
  const review = req.body.comments;
  const user = req.body.commenter;
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (item.id === recipeId) {
      const entry = {
        comment: user,
        commenter: review
      };
      item.review.push(entry);
      item.comments = item.review.length;
      break;
    }
  }
  res.send(list);
});


router.delete('/api/recipes/:rId', (req, res) => {
  const recipeId = Number(req.params.rId);
  if (!recipeId || recipeId === '') {
    res.status(500).send('error');
  } else {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].id === recipeId) {
        list.splice(i, 1);
        break;
      }
    }
    res.send(list);
  }
});

const orderList = (obj) => {
  const compare = (a, b) => {
    if (a.upvote < b.upvote) { return 1; }
    if (a.upvote > b.upvote) { return -1; }
    return 0;
  };
  return obj.sort(compare);
};
const x = list.slice();
const sortByVotes = orderList(x);
console.log(sortByVotes);
router.get('/api/recipes?sort=upvotes&order=des', (req, res) => {
  res.send(sortByVotes);
});

export default router;
