import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import * as actions from '../actions';

//components
import Navbar from './Navbar';
/**
 *
 *
 * @class Favorites
 * @extends {Component}
 */
export class Favorites extends Component {
  /**
   * Creates an instance of Favorites.
   * @param {any} props
   * @memberof Favorites
   */
  constructor(props) {
    super(props);
    this.generateList = this.generateList.bind(this);
  }
  /**
   *
   *
   * @memberof Favorites
   * @returns {any} favorite list
   */
  componentDidMount() {
    this.props.getFavs();
  }
  /**
   *
   *
   * @param {any} fav
   * @returns {any} list of favorite recipes
   * @memberof Favorites
   */
  generateList(fav) {
    if (fav.userFav) {
      if (fav.userFav.favorites.length < 1) {
        return (
          <div className="text-center error-message">
            <div>
              <img src="../img/logo.png" alt="logo" />
              <h4 className="p-3 m-2">
                You don't have any favorite recipe yet
              </h4>
              <p className="p-3 m-2">
                <Link to="/catalog" className="btn btn-outline-dark">
                  check out amazing recipes
                </Link>
              </p>
            </div>
          </div>
        );
      }
      return fav.userFav.favorites.map((item, index) => (
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
                    <span className="tag bg-danger">
                      {item.Recipe.category}
                    </span>
                    <h4 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                      {item.Recipe.name.length > 25 ? item.Recipe.name.slice(0, 15).concat("...") : item.Recipe.name }
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
  }
  /**
   *
   *
   * @returns {any} jsx
   * @memberof Favorites
   */
  render() {
    return (
      <div>
        <Navbar />
        <div className="mt-80 mb-3">
          <div className="container catalog-wrapper" id="catalog">
            <div className="row justify-content-center">
              {this.generateList(this.props.favorites)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorite
});

export default connect(mapStateToProps, actions)(Favorites);
