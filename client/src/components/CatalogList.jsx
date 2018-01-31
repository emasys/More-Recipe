import { Link } from 'react-router-dom';
import approx from 'approximate-number';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { delRecipe } from '../actions';
import Auth from './auth';

const onHoverIn = id => {
  console.log('hovered');
  document.querySelector(`#${id}`).classList.remove('d-none');
  document.querySelector(`#${id}`).classList.add('d-block');
};

const onHoverOut = id => {
  document.querySelector(`#${id}`).classList.remove('d-block');
  document.querySelector(`#${id}`).classList.add('d-none');
};

const deleteRecipeInit = event => {
  event.preventDefault();
};
/**
 *
 *
 * @param {object} props
 * @returns {object} list of recipes
 * @memberof CatalogList
 */
const generateList = ({ catalog, delRecipe, history }) => {
  const deleteRecipe = (event, id, userId) => {
    event.preventDefault();
    console.log(Auth.userID(), userId);
    delRecipe(id, Auth.userID()).then(() => {
      // history.push('');
      // history.pushState(null, '/messages');
      history.push(`/profile/${Auth.userID()}`);
    });
  };

  if (catalog) {
    console.log('catalog', catalog);
    if (catalog.length < 1) {
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
    return catalog.map((item, index) => (
      <div className="row" key={index}>
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteModalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete Recipe
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this recipe?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button
                  onClick={event => deleteRecipe(event, item.id, item.userId)}
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-danger btn-lg"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-sm-12 mb-20 mt-50 col-md-12">
          <div>
            <Link
              to={`/recipe/${item.id}`}
              className="hvr-grow-shadow"
              onMouseEnter={() => onHoverIn(`recipe-${item.id}`)}
              onMouseLeave={() => onHoverOut(`recipe-${item.id}`)}
            >
              <div className="card" data-aos="fade-up" data-aos-duration="1000">
                <div
                  id={`recipe-${item.id}`}
                  className="description text-center d-none"
                >
                  <h2> Description</h2>
                  <p className="text-justify"> {item.description}</p>
                </div>
                <img
                  className="card-img-top img-box"
                  src={item.foodImg}
                  alt="recipe image"
                />
                {Auth.userID() === item.userId && (
                  <i
                    onClick={deleteRecipeInit}
                    data-toggle="modal"
                    data-target="#deleteModal"
                    className="material-icons text-danger delete-btn hvr-buzz-out"
                  >
                    &#xE872;
                  </i>
                )}
                <div className="card-body p-0 text-center social-icons">
                  <span className="tag bg-danger">{item.category}</span>
                  <h4 className="card-title custom-bg bg-dark p-2 m-0">
                    {item.name.length > 25 ?
                      item.name.slice(0, 24).concat('...') :
                      item.name}
                  </h4>
                  <div className="card-body p-5 text-left bg-light">
                    <p className="line-clamp crop-text wrapWord wrapIt">
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
const CatalogList = props => (
  <div className="row justify-content-center">{generateList(props)}</div>
);

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ delRecipe }, dispatch)
});
// const mapDispatchToProps = dispatch => ({
//   delRecipe: recipeId => dispatch(delRecipe(recipeId, userId))
// });

export default connect(null, mapDispatchToProps)(CatalogList);
