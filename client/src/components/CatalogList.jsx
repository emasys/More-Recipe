import { Link } from 'react-router-dom';
import approx from 'approximate-number';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

/**
 *
 *
 * @param {number} id
 * @returns {object} toggle classes on mouse in
 */
const onHoverIn = id => {
  document.querySelector(`#recipe-${id}`).classList.remove('crop-text');
  document.querySelector(`#recipe-${id}`).classList.add('full-text');
  document.querySelector(`#img-${id}`).classList.add('d-half');
  document.querySelector(`#tag-${id}`).classList.add('d-none');
};

/**
 *
 *
 * @param {number} id
 * @returns {object} toggle classes on mouse out
 */
const onHoverOut = id => {
  document.querySelector(`#img-${id}`).classList.remove('d-half');
  document.querySelector(`#tag-${id}`).classList.remove('d-none');
  document.querySelector(`#recipe-${id}`).classList.remove('full-text');
  document.querySelector(`#recipe-${id}`).classList.add('crop-text');
};
/**
 *
 *
 * @param {object} props
 * @returns {object} list of recipes
 */
const generateList = props => {
  if (props.catalog) {
    if (props.catalog.length < 1) {
      if (props.isLoading) {
        return (
          <div className="text-center error-message">
            <div>
              <img
                className="img-fluid"
                src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
                alt="logo"
                height="200"
                width="200"
              />
              <h4 className="p-3 m-2 text-center">...Fetching Recipes</h4>
              <img
                src="https://res.cloudinary.com/emasys/image/upload/v1516647862/Facebook-0.9s-200px_sqqnu9.gif"
                width="100"
                height="100"
                alt="loading..."
              />
            </div>
          </div>
        );
      }
      return (
        <div className="text-center error-message">
          <div>
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
              alt="logo"
              height="200"
              width="200"
            />
            <h4 className="p-3 m-2 text-center">...Oops</h4>
            <p className="p-3 m-2 text-center">No recipe here</p>
            <p className="p-3 m-2 text-center">
              <Link to="/" className="btn btn-outline-dark hvr-icon-back">
                ...go back home
              </Link>
            </p>
          </div>
        </div>
      );
    }
    return props.catalog.map(item => (
      <div className="row" key={item.id}>
        <div className="col-lg-12 col-sm-12 mb-20 mt-50 col-md-12">
          <div>
            <Link to={`/recipe/${item.id}`} className="hvr-grow-shadow">
              <div
                className="card"
                data-aos="fade-up"
                data-aos-duration="1000"
                key={item.id}
                onMouseEnter={() => onHoverIn(item.id)}
                onMouseLeave={() => onHoverOut(item.id)}
              >
                {props.auth.authInfo.userId === item.userId &&
                  props.showDeleteBtn && (
                    <button
                      className="btn btn-danger btn-sm delete-btn"
                      onClick={event => props.deleteRecipe(event, item)}
                      data-toggle="modal"
                      data-target="#deleteModal"
                    >
                      Delete Recipe
                    </button>
                  )}
                <div id={`img-${item.id}`}>
                  <img
                    className="card-img-top img-box "
                    src={item.foodImg}
                    alt="recipeImage"
                  />
                </div>

                <div className="card-body p-0 text-center social-icons">
                  <span className="tag bg-danger" id={`tag-${item.id}`}>
                    {item.category}
                  </span>
                  <h4 className="card-title custom-bg bg-dark p-2 m-0">
                    {item.name.length > 25 ?
                      item.name.slice(0, 24).concat('...') :
                      item.name}
                  </h4>
                  <div className="card-body p-5 text-left bg-wheat">
                    <p id={`recipe-${item.id}`} className="crop-text">
                      {item.description}
                    </p>
                  </div>
                  <span>
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    {approx(item.favorite)}
                  </span>
                  <span>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                    {approx(item.upvote)}
                  </span>
                  <span>
                    <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                    {approx(item.downvote)}
                  </span>
                  <span>
                    <i className="fa fa-eye" aria-hidden="true" />
                    {approx(item.views)}
                  </span>
                  <span>
                    <i className="fa fa-comment-o" aria-hidden="true" />
                    {approx(item.comments)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    ));
  }
};

/**
 *
 *
 * @param {object} props
 * @returns {object} container function
 */
const CatalogList = props => (
  <div className="row justify-content-center">{generateList(props)}</div>
);

generateList.propTypes = {
  showDeleteBtn: PropTypes.bool.isRequired,
  catalog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  auth: state.user
});
export default connect(mapStateToProps, null)(CatalogList);
