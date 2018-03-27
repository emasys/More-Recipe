import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';

// Action
import {
  postReview,
  deleteReview,
  getReviews,
  clearReview,
  postReply
} from '../../actions/reviewActions';

// Component
import GenerateReviews from './GenerateReviews';

/**
 *
 *
 * @class Reviews
 *
 * @extends {Component}
 */
export class Reviews extends Component {
  static propTypes = {
    postReview: PropTypes.func.isRequired,
    recipes: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired,
    review: PropTypes.object,
    auth: PropTypes.object.isRequired,
    getReviews: PropTypes.func.isRequired,
    postReply: PropTypes.func.isRequired,
    clearReview: PropTypes.func.isRequired
  };

  static defaultProps = {
    review: { status: 'no comment' }
  };
  /**
   * Creates an instance of Reviews.
   * @param {any} props
   * @memberof Reviews
   */
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      offset: 1,
      showMore: false,
      reply: '',
      replyArea: false
    };
  }

  /**
   *
   * @param {object} nextProps
   *
   * @returns {void}
   *
   * @memberOf Reviews
   */
  componentWillReceiveProps = nextProps => {
    if (this.state.offset >= nextProps.review.count_reviews) {
      this.setState({ showMore: false });
    } else if (this.state.offset < nextProps.review.count_reviews) {
      this.setState({ showMore: true });
    }
  };

  /**
   *
   * @returns {void}
   *
   * @memberOf Reviews
   */
  componentWillUnmount = () => {
    this.props.clearReview();
  };

  /**
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf Reviews
   */
  loadMoreReviews = event => {
    event.preventDefault();
    const { id } = this.props.recipes.recipeItem.recipe;
    this.props.getReviews(id, 4, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 4
    }));
  };
  /**
   * Reset input field
   *
   * @memberof Reviews
   * @returns {void}
   */
  resetState = () => {
    this.setState({
      content: '',
      reply: ''
    });
  };

  /**
   * Update page with new reviews
   *
   * @param {object} event
   *
   * @memberof Reviews
   *
   * @returns {void}
   */
  handleForm = event => {
    event.preventDefault();
    const data = this.state;
    const { id } = this.props.recipes.recipeItem.recipe;
    if (data.content.trim()) {
      this.props.postReview(data, id);
      this.setState({ offset: 1 });
    }
    this.resetState();
  };
  /**
   *
   *
   * @param {object} event
   * @memberof Reviews
   * @returns {void}
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
   *
   * @returns {void}
   * @memberOf Reviews
   */
  deleteReview = (reviewId, recipeId) => {
    this.setState({ offset: 1 });
    this.props.deleteReview(reviewId, recipeId);
  };
  /**
   *
   * @param {number} event
   * @param {number} reviewId
   *
   * @returns {void}
   * @memberOf Reviews
   */
  handleReplyForm = (event, reviewId) => {
    const { id } = this.props.recipes.recipeItem.recipe;
    event.preventDefault();
    const data = { content: this.state.reply };
    if (data.content.trim()) {
      this.setState({ offset: 1 });
      this.props.postReply(data, reviewId, id);
    }
    this.resetState();
  };

  /**
   * handle form input state
   *
   * @param {object} event
   *
   * @returns {void}
   * @memberOf Reviews
   */
  handleReplyFormChange = event => {
    this.setState({
      reply: event.target.value
    });
  };
  /**
   *
   *
   * @returns {JSX.Element} React element
   * @memberof Reviews
   */
  render() {
    const { content, showMore, reply } = this.state;
    return (
      <div className="row justify-content-center mt-2 catalog-wrapper">
        <div className="col-12">
          <h5 className="text-center text-muted">
            Reviews{' '}
            <span
              data-tip="Total number of reviews"
              className="badge badge-dark"
            >
              {this.props.review.count_reviews}
            </span>
          </h5>
          <hr />
        </div>
        <div className="col-lg-7 col-sm-12 recipe-image">
          <form onSubmit={this.handleForm} className="text-center">
            <div className="form-row">
              <div className="form-group col-md-12 col-sm-12">
                <Textarea
                  className="textarea col-12"
                  id="reviewField"
                  name="reviewBox"
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
            handleForm={this.handleReplyForm}
            handleChange={this.handleReplyFormChange}
            reply={reply}
          />
          {showMore && (
            <button
              className="btn mt-10 btn-lg btn-block bg-light"
              onClick={this.loadMoreReviews}
            >
              show more reviews
            </button>
          )}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  review: state.review,
  recipes: state.recipes,
  auth: state.user
});

export default connect(mapStateToProps, {
  postReview,
  deleteReview,
  getReviews,
  clearReview,
  postReply
})(Reviews);
