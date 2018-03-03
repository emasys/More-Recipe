import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { uniqWith, isEqual } from 'lodash';

import config from '../../config';

const GenerateReviews = ({ review, deleteReview, auth }) => {
  if (review.fetch_reviews) {
    //handle bug of duplicate objects due to redirection from sign in page
    const reviews = uniqWith(review.fetch_reviews, isEqual);
    return reviews.map((comment, index) => (
      <div
        data-aos="fade-left"
        data-aos-offset="20"
        className="comment-wrapper"
        key={comment.id}
      >
        <div className="direction rounded mt-50 p-15 my-2">
          <div className="commentTitle ">
            <div className="float-left  mr-5">
              <img
                src={comment.User.avatar || config.DEFAULT_DISPLAY_PICTURE}
                alt="dp"
                className="img-icon-review rounded-circle"
              />
            </div>
            <div className="clearfix mb-10">
              <Link
                className="text-dark bolder moniker"
                to={`/user/${comment.userId}`}
              >
                {comment.User.moniker}
              </Link>
              <p className="text-dark date">
                {moment(comment.updatedAt).fromNow()}
              </p>
              {auth.authInfo.userId === comment.userId && (
                // eslint-disable-next-line
                <i
                  onClick={() => deleteReview(comment.id, comment.recipeId)}
                  className="fa fa-times-circle delete-review-btn hvr-buzz-out fa-2x"
                  data-tip="Delete this review"
                />
              )}
              <ReactTooltip place="bottom" type="dark" effect="float" />
            </div>
            <hr />
          </div>
          <div className="comments ml-10">
            <p className="mb-0 text-dark">{comment.content}</p>
          </div>
        </div>
      </div>
    ));
  }
  return 'Loading comments...';
};

export default GenerateReviews;
