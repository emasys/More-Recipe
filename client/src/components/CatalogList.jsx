import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import approx from 'approximate-number';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uniqBy } from 'lodash';

/**
 *
 *
 * @export
 * @class CatalogList
 * @extends {Component}
 */
export class CatalogList extends Component {
  // static propTypes = {
  //   showDeleteBtn: PropTypes.bool.isRequired,
  //   catalog: PropTypes.object.isRequired,
  //   auth: PropTypes.object.isRequired,
  //   isLoading: PropTypes.bool.isRequired
  // };

  /**
   * Creates an instance of CatalogList.
   * @param {object} props
   *
   * @memberOf CatalogList
   */
  constructor(props) {
    super(props);
    this.state = {
      cardStyle: 'cropText'
    };
  }

  /**
   * @param {number} id
   *
   * @returns {void} toggle classes on mouse enter
   *
   * @memberOf CatalogList
   */
  onHoverIn = id => {
    const cardSelector = document.querySelector(`#recipe-${id}`);
    const imgSelector = document.querySelector(`#img-${id}`);
    const tagSelector = document.querySelector(`#tag-${id}`);
    if (cardSelector && imgSelector) {
      cardSelector.classList.remove('crop-text');
      cardSelector.classList.add('full-text');
      imgSelector.classList.add('d-half');
      tagSelector.classList.add('d-none');
    }
  };

  /**
   * @param {number} id
   *
   * @returns {void} toggle classes on mouse leave
   *
   * @memberOf CatalogList
   */
  onHoverOut = id => {
    const cardSelector = document.querySelector(`#recipe-${id}`);
    const imgSelector = document.querySelector(`#img-${id}`);
    const tagSelector = document.querySelector(`#tag-${id}`);
    if (cardSelector && imgSelector) {
      cardSelector.classList.add('crop-text');
      cardSelector.classList.remove('full-text');
      imgSelector.classList.remove('d-half');
      tagSelector.classList.remove('d-none');
    }
  };

  /**
   * Generate cards of recipes
   *
   * @param {object} props
   * @returns {JSX.Element} list of recipes
   *
   * @memberOf CatalogList
   */
  generateList = props => {
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
            </div>
          </div>
        );
      }
      const catalog = uniqBy(props.catalog, 'id');
      return catalog.map(item => (
        <div className="row" key={item.id}>
          <div className="col-lg-12 col-sm-12 mb-20 mt-50 col-md-12">
            <div>
              <Link to={`/recipe/${item.id}`} className="hvr-grow-shadow">
                <div
                  className="card"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  key={item.id}
                  onMouseEnter={() => this.onHoverIn(item.id)}
                  onMouseLeave={() => this.onHoverOut(item.id)}
                >
                  {props.auth.authInfo.userId === item.userId &&
                    props.showDeleteBtn && (
                      <button
                        className="btn btn-danger btn-sm delete-btn"
                        id="delete-recipe"
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
   * @returns {JSX.Element} render react element
   *
   * @memberOf CatalogList
   */
  render() {
    return <div className="row justify-content-center">{this.generateList(this.props)}</div>;
  }
}

export const mapStateToProps = state => ({
  isLoading: state.isLoading,
  auth: state.user
});

export default connect(mapStateToProps, null)(CatalogList);
