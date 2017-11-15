import React from 'react';
import { Link } from 'react-router-dom';

const generateList = ({ catalog }) => {
  console.log(catalog.recipes);
  if (catalog) {
    // console.log(catalog.recipes);
    if (catalog.recipes.length < 1) {
      return (
        <div style={{ height: '600px' }} className="text-center">
          <h1>Your query returned no result</h1>
          <i class="fa fa-exclamation-triangle fa-5x" aria-hidden="true" />
          <p>Perhaps you should cross-check your spellings</p>
        </div>
      );
    }
    return catalog.recipes.map((item, index) => {
      return (
        <div
          key={index}
          className="col-lg-3 col-sm-10 mb-3  col-md-4 animate-catalog"
          data-animate="bounceIn"
          data-duration="1.0s"
          data-delay="0.1s"
          data-offset="100"
        >
          <Link to={`/recipe/${item.id}`}>
            <div className="card animate">
              <div className="description">
                <h6>Description</h6>
                {item.description}
              </div>
              <img
                className="card-img-top"
                src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
                alt="Card image cap"
              />
              <div className="card-body p-0 text-center social-icons">
                <a href="#">
                  <span className="tag bg-danger">{item.category}</span>
                </a>
                <h6 className="card-title custom-bg bg-secondary p-2 m-0 text-truncate ">
                  {item.name}
                </h6>
                <span>
                  <i className="fa fa-heart-o" aria-hidden="true" />
                  {item.favorite}
                </span>
                <span>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                  {item.upvote}
                </span>
                <span>
                  <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                  {item.downvote}
                </span>
                <span>
                  <i className="fa fa-eye" aria-hidden="true" />
                  {item.views}
                </span>
                <span>
                  <i className="fa fa-comment-o" aria-hidden="true" />
                  {item.comments}
                </span>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }
};
const Catalog = props => {
  return (
    <div className="row justify-content-center">{generateList(props)}</div>
  );
};

export default Catalog;