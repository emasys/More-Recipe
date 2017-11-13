import React from 'react';

const generateItems = ({ reactions }) => {
  if (reactions) {
    const {
      id,
      name,
      views,
      comments,
      downvote,
      favorite,
      category,
      upvote
    } = reactions.recipe;
    console.log(views);

    return (
      <div className="">
        <figure>
          <img
            src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
            alt="foodie"
            className="img-fluid rounded"
          />
          <figcaption>{name}</figcaption>
        </figure>
        <div className="d-inline">
          <span className="text-center card-link">
            <i
              className="fa fa-heart-o fa-2x"
              aria-hidden="true"
              id="favorite"
            />
            <em className="bg-dark">{favorite}</em>
          </span>
          <span className="text-center card-link m-1">
            <i className="fa fa-eye  fa-2x" aria-hidden="true" />
            <em className="bg-primary">{views}</em>
          </span>

          <span className="text-center card-link m-1">
            <i
              className="fa fa-thumbs-o-up fa-2x"
              aria-hidden="true"
              id="like"
            />
            <em className="bg-success">{upvote}</em>
          </span>
          <span className="text-center card-link m-1">
            <i
              className="fa fa-thumbs-o-down fa-2x"
              aria-hidden="true"
              id="dislike"
            />
            <em className="bg-danger">{downvote}</em>
          </span>

          <span className="text-center card-link m-1">
            <i className="fa fa-comment-o  fa-2x" aria-hidden="true" />
            <em className="bg-dark">{comments}</em>
          </span>
        </div>
        <div className="mt-3">
          <a href="#" className="btn btn-danger btn-sm" role="button">
            CATEGORY <i
              className="fa fa-chevron-right"
              aria-hidden="true"
            />{' '}
            {category}
          </a>
        </div>
      </div>
    );
  }
};
const RecipeItems = props => {
  return (
    <div className="col-lg-4 col-sm-12  mb-5 recipe-image">
      {generateItems(props)}
    </div>
  );
};

export default RecipeItems;
