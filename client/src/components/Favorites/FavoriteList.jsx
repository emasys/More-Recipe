import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

const FavoriteList = ({ favorites }) => {
  console.log(favorites);
  if (favorites.userFav) {
    if (favorites.userFav.favorites.length < 1) {
      return (
        <div className="text-center error-message">
          <div>
            <img src="../img/logo.png" alt="logo" />
            <h4 className="p-3 m-2">You don't have any favorite recipe yet</h4>
            <p className="p-3 m-2">
              <Link to="/catalog" className="btn btn-outline-dark">
                check out amazing recipes
              </Link>
            </p>
          </div>
        </div>
      );
    }
    return favorites.userFav.favorites.map((item, index) => (
      <div
        key={index}
        className="col-lg-3 col-sm-10 mb-20  col-md-4 animate-catalog"
        data-animate="bounceIn"
        data-duration="1.0s"
        data-delay="0.1s"
        data-offset="100"
      >
        <div>
          <Fade bottom>
            <Link to={`/recipe/${item.recipeId}`} className=" hvr-grow-shadow">
              <div className={`card animate`}>
                <img
                  className="card-img-top img-box"
                  src={item.Recipe.foodImg}
                  alt="Card image cap"
                />
                <div className="card-body p-0 text-center social-icons">
                  <span className="tag bg-danger">{item.Recipe.category}</span>
                  <h4 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                    {item.Recipe.name.length > 25 ?
                      item.Recipe.name.slice(0, 15).concat('...') :
                      item.Recipe.name}
                  </h4>
                  <div className="card-body p-5 text-left bg-light text-dark">
                    <p className="crop-text">{item.Recipe.description}</p>
                  </div>
                  <span>
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    {item.Recipe.favorite}
                  </span>
                  <span>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                    {item.Recipe.upvote}
                  </span>
                  <span>
                    <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                    {item.Recipe.downvote}
                  </span>
                  <span>
                    <i className="fa fa-eye" aria-hidden="true" />
                    {item.Recipe.views}
                  </span>
                  <span>
                    <i className="fa fa-comment-o" aria-hidden="true" />
                    {item.Recipe.comments}
                  </span>
                </div>
              </div>
            </Link>
          </Fade>
        </div>
      </div>
    ));
  }
  return null;
};

FavoriteList.propTypes = {
  favorites: PropTypes.object
};

export default FavoriteList;
