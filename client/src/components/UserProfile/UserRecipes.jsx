import React from 'react';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';

const UserRecipes = props => {
  if (props.data) {
    return props.data.recipes.map((item, index) => (
      <div
        key={index}
        className="col-lg-5 col-md-6 col-sm-6  mb-20 animate-catalog"
        data-animate="bounceIn"
        data-duration="1.0s"
        data-delay="0.1s"
        data-offset="100"
      >
        <div>
          <Fade bottom>
            <Link to={`/recipe/${item.id}`} className="hvr-grow-shadow">
              <div className="card animate">
                <div className="description">
                  <h6>Description</h6>
                  {item.description}
                </div>
                <img
                  className="card-img-top profile-img-box"
                  src={item.foodImg}
                  alt="Card image cap"
                />
                <div className="card-body p-0 text-center social-icons">
                  <span className="tag bg-danger">{item.category}</span>
                  <h6 className="card-title custom-bg bg-secondary p-2 m-0 text-truncate ">
                    {item.name.length > 25 ?
                      item.name.slice(0, 15).concat('...') :
                      item.name}
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
          </Fade>
        </div>
      </div>
    ));
  }
  return "Loading...";
};

export default UserRecipes;
