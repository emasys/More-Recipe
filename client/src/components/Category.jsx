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
 * @class Category
 * @extends {Component}
 */
class Category extends Component {
  /**
   * Creates an instance of Category.
   * @param {any} props
   * @memberof Category
   */
  constructor(props) {
    super(props);

    this.generateList = this.generateList.bind(this);
    // this.redirect = this.redirect.bind(this);
  }
  /**
   *
   *
   * @memberof Category
   * @returns {any} page
   */
  componentDidMount() {
    const data = {
      category: this.props.match.params.cat
    };
    this.props.getCategory(data, 12);
  }

  // redirect(e){
  //   e = e || window.event;
  //   e = e.target || e.srcElement;
  //   // return this.props.history.push=(`/recipe/${e.id}`)
  // }
  /**
   *
   *
   * @param {any} cat
   * @returns {object} list of recipes
   * @memberof Category
   */
  generateList(cat) {
    if (cat.category) {
      if (cat.category.recipes.length < 1) {
        return (
          <div className="text-center error-message">
            <img src="../img/logo.png" alt="logo" className="mt-80"/>
            <h4 className="p-3 m-2">There's no recipe in this category yet</h4>
          </div>
        );
      }
      return cat.category.recipes.map((item, index) => (
        <div
          key={index}
          className="col-lg-3 col-sm-10 mb-3  col-md-4 animate-catalog"
          data-animate="bounceIn"
          data-duration="1.0s"
          data-delay="0.1s"
          data-offset="100"
        >
          <div style={{ overflow: 'hidden' }}>
            <Fade bottom>
              <Link
                to={`/recipe/${item.id}`}
                className="hovered stuff hvr-bounce-out"
                name="something"
              >
                <div className={`card animate`}>
                  <img
                    className="card-img-top img-box"
                    src={item.foodImg}
                    alt="Card image cap"
                    id={item.id}
                  />
                  <div className="card-body p-0 text-center social-icons">
                    <Link to={`/category/${item.category}`}>
                      <span className="tag bg-danger">{item.category}</span>
                    </Link>
                    <h6 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                      {item.name}
                    </h6>
                    <div className="card-body p-5 text-left bg-light text-dark">
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
   * @returns {any} jsx
   * @memberof Category
   */
  render() {
    return (
      <div>
        <Navbar />
        <div className="mt-80 mb-3">
          <div className="container catalog-wrapper" id="catalog">
            <div className="row justify-content-center">
              {this.generateList(this.props.category)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.recipes
});
export default connect(mapStateToProps, actions)(Category);
