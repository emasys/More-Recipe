import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import approx from 'approximate-number';
import { uniq } from 'lodash';

/**
 *
 *
 * @param {object} { favorites }
 * @returns {JSX.Element} react element
 */
const FavoriteList = ({ favorites }) => {
  if (favorites) {
    if (favorites.length < 1) {
      return (
        <div className="text-center error-message">
          <div>
            <img src="../img/logo.png" alt="logo" />
            <h4 className="p-3 m-2">You do not have any favorite recipe yet</h4>
            <p className="p-3 m-2">
              <Link to="/catalog" className="btn btn-outline-dark">
                check out amazing recipes
              </Link>
            </p>
          </div>
        </div>
      );
    }
    const uniqueFavorites = uniq(favorites);
    return uniqueFavorites.map(item => (
      <div key={item.recipeId} className="row">
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="col-lg-12 col-sm-12 mb-20 mt-50 col-md-12"
        >
          <Link to={`/recipe/${item.recipeId}`} className="hvr-push">
            <div className="card animate">
              <img
                className="card-img-top img-box"
                src={item.Recipe.foodImg}
                alt="itemImage"
              />
              <div className="card-body p-0 text-center social-icons">
                <span className="tag bg-danger">{item.Recipe.category}</span>
                <h4 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                  {item.Recipe.name.length > 25 ?
                    item.Recipe.name.slice(0, 25).concat('...') :
                    item.Recipe.name}
                </h4>
                <div className="card-body p-5 text-left bg-wheat text-dark">
                  <p className="crop-text">{item.Recipe.description}</p>
                </div>
                <span>
                  <i className="fa fa-heart-o" aria-hidden="true" />
                  {approx(item.Recipe.favorite)}
                </span>
                <span>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                  {approx(item.Recipe.upvote)}
                </span>
                <span>
                  <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                  {approx(item.Recipe.downvote)}
                </span>
                <span>
                  <i className="fa fa-eye" aria-hidden="true" />
                  {approx(item.Recipe.views)}
                </span>
                <span>
                  <i className="fa fa-comment-o" aria-hidden="true" />
                  {approx(item.Recipe.comments)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    ));
  }
  return null;
};

FavoriteList.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default FavoriteList;
