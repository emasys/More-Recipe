import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

/**
 *
 *
 * @class Reviews
 * @extends {Component}
 */
class Reviews extends Component {
  /**
   * Creates an instance of Reviews.
   * @param {any} props
   * @memberof Reviews
   */
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.getReview = this.getReview.bind(this);
    this.txChanged = this.txChanged.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  /**
   *
   *
   * @memberof Reviews
   * @returns {any} content input texts
   */
  resetState() {
    this.setState({
      content: ''
    });
  }
  /**
   *
   *
   * @param {any} e
   * @memberof Reviews
   * @returns {any} updated page with new reviews
   */
  handleForm(e) {
    e.preventDefault();
    const data = this.state;
    const { id } = this.props.recipes.recipeItem.recipe;
    this.props.postReview(data, id).then(res => {
      this.props.getRecipeReactions(id);      
    });
    this.resetState();
  }
  /**
   *
   *
   * @param {any} e
   * @memberof Reviews
   * @returns {any} textarea input
   */
  txChanged(e) {
    this.setState({
      content: e.target.value
    });
  }
  /**
   *
   *
   * @param {any} reviews
   * @returns {any} updated page with new review
   * @memberof Reviews
   */
  getReview(reviews) {
    if (reviews) {
      const comments = reviews.recipe.reviews;
      return comments.map((comment, index) => (
        <div className="comment-wrapper" key={index}>
          <div className="direction mt-50 p-15 bg-light my-2" key={index}>
            <div className="commentTitle">
              <img
                src={comment.avatar}
                alt="dp"
                className="img-icon rounded-circle"
              />
              <Link className="text-dark bolder" to={`/user/${comment.userId}`}>
                {' '}
                {comment.user}
              </Link>
              <hr />
            </div>
            <div className="comments m-0">
              <p className="mb-0 text-dark">{comment.content}</p>
            </div>
            <div className="date bg-dark">
              <p>
                {comment.updatedAt
                  .slice(0, 16)
                  .split('T')
                  .join(' ')}
              </p>
            </div>
          </div>
        </div>
      ));
    }
  }
  /**
   *
   *
   * @returns {any} jsx
   * @memberof Reviews
   */
  render() {
    const { content } = this.state;
    return (
      <div className="row justify-content-center mt-2 catalog-wrapper">
        <div className="col-12">
          <h5 className="text-center text-muted">Reviews</h5>
          <hr />
        </div>
        <div className="col-lg-7 col-sm-12 recipe-image">
          <form onSubmit={this.handleForm}>
            <div className="form-row">
              <div className="form-group col-md-12 col-sm-12">
                <textarea
                  className="special col-12"
                  id="FormControlTextarea"
                  rows="4"
                  onChange={this.txChanged}
                  value={content}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-8 col-sm-12 ">
          {this.getReview(this.props.recipes.recipeItem)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: state.review,
  recipes: state.recipes
});

export default connect(mapStateToProps, actions)(Reviews);
