import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

// Action
import { postReview, deleteReview } from '../../actions/reviewActions';

// Component
import GenerateReviews from './GenerateReviews';

/**
 *
 *
 * @class Reviews
 * @extends {Component}
 */
class Reviews extends Component {
  static propTypes = {
    postReview: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired,
    review: PropTypes.object,
    auth: PropTypes.object.isRequired
  };

  static defaultProps = {
    review: { status: "no comment" }
  }
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
  }

  /**
   *
   *
   * @memberof Reviews
   * @returns {any} content input texts
   */
  resetState = () => {
    this.setState({
      content: ''
    });
  };

  /**
   *
   *
   * @param {any} event
   * @memberof Reviews
   * @returns {any} updated page with new reviews
   */
  handleForm = event => {
    event.preventDefault();
    const data = this.state;
    const { id } = this.props.recipes.recipeItem.recipe;
    if (data.content.trim()) {
      this.props.postReview(data, id);
    }
    this.resetState();
  };
  /**
   *
   *
   * @param {any} event
   * @memberof Reviews
   * @returns {any} textarea input
   */
  textChanged = event => {
    this.setState({
      content: event.target.value
    });
  };

  /**
   *
   * @param {number} reviewId
   * @param {number} recipeId
   * @returns {object} confrimation
   * @memberOf Reviews
   */
  deleteReview = (reviewId, recipeId) => {
    this.props.deleteReview(reviewId, recipeId);
  };
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
          <h5 className="text-center text-muted">Review</h5>
          <hr />
        </div>
        <div className="col-lg-7 col-sm-12 recipe-image">
          <form onSubmit={this.handleForm} className="text-center">
            <div className="form-row">
              <div className="form-group col-md-12 col-sm-12">
                <Textarea
                  className="textarea col-12"
                  id="FormControlTextarea"
                  // rows="4"
                  placeholder="leave a review"
                  onChange={this.textChanged}
                  value={content}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-dark  btn-lg col-lg-4 col-md-6 col-sm-12"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-8 col-sm-12 ">
          <GenerateReviews
            review={this.props.review}
            deleteReview={this.deleteReview}
            auth={this.props.auth}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: state.review,
  recipes: state.recipes,
  auth: state.user
});

export default connect(mapStateToProps, { postReview, deleteReview })(Reviews);
