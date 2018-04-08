import React, { Component } from 'react';
import { uniqWith, isEqual } from 'lodash';
import PropTypes from 'prop-types';

import ReviewsList from './ReviewsList';

/**
 *
 *
 * @class GenerateReviews
 * @extends {Component}
 */
class GenerateReviews extends Component {
  static propTypes = {
    review: PropTypes.array.isRequired
  };
  /**
   * Creates an instance of GenerateReviews.
   * @param {any} props
   *
   * @memberOf GenerateReviews
   */
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showReply: false
    };
  }

  /**
   *
   *
   * @param {object} props
   * @returns {JSX.Element} React element
   */
  generateReviewItems = props => {
    const { review } = props;
    if (review.fetch_reviews) {
      //handle bug of duplicate objects due to redirection from sign in page
      const reviews = uniqWith(review.fetch_reviews, isEqual);
      return reviews.map((comment, index) => (
        <ReviewsList comment={comment} {...props} key={comment.id} />
      ));
    }
    return <p>Loading comments...</p>;
  };
  /**
   *
   *
   * @returns {JSX.Element} React element
   *
   * @memberOf GenerateReviews
   */
  render() {
    return <div>{this.generateReviewItems(this.props)}</div>;
  }
}

export default GenerateReviews;
