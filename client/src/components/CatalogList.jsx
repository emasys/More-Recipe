import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
/**
 *
 *
 * @class CatalogList
 * @extends {Component}
 */
class CatalogList extends Component {
  /**
   * Creates an instance of CatalogList.
   * @param {any} props
   * @memberof CatalogList
   */
  constructor(props) {
    super(props);

    this.state = {
      hover: ''
    };
    this.generateList = this.generateList.bind(this);
  }

  /**
   *
   *
   * @param {object} props
   * @returns {object} list of recipes
   * @memberof CatalogList
   */
  generateList({ catalog }) {
    if (catalog) {
      if (catalog.recipes.length < 1) {
        return (
          <div className="text-center error-message">
            <div className="catalog">
              <img src="../img/logo.png" alt="logo" />
              <h4 className="p-3 m-2">...Oops</h4>
              <p className="p-3 m-2">No recipe found</p>
              <p className="p-3 m-2">
                <Link to="/" className="btn btn-outline-dark hvr-icon-back">
                  ...go back home
                </Link>
              </p>
            </div>
          </div>
        );
      }
      return catalog.recipes.map((item, index) => (
        <div
          key={index}
          className="col-lg-3 col-sm-7 mb-20 col-md-4 animate-catalog"
          data-animate="bounceIn"
          data-duration="1.0s"
          data-delay="0.1s"
          data-offset="100"
        >
          <div>
            <Fade bottom delay={100} duration={1200}>
              <Link to={`/recipe/${item.id}`} className=" hvr-grow-shadow">
                <div className={`card animate`}>
                  <img
                    className="card-img-top img-box"
                    src={item.foodImg}
                    alt="recipe image"
                  />

                  <div className="card-body p-0 text-center social-icons">
                    <span className="tag bg-danger">{item.category}</span>
                    <h6 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                      {item.name}
                    </h6>
                    <div className="card-body p-5 text-left bg-light">
                      <p className="crop-text">{item.description}</p>
                    </div>
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
  }
  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof CatalogList
   */
  render() {
    return (
      <div className="row justify-content-center">
        {this.generateList(this.props)}
      </div>
    );
  }
}

export default CatalogList;
