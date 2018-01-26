import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import config from '../../config';

const GenerateReviews = ({ review }) => {
  if (review.fetch_reviews) {
    return review.fetch_reviews.reviews.map((comment, index) => (
      <div
        data-aos="fade-left"
        data-aos-offset="20"
        className="comment-wrapper"
        key={index}
      >
        <div className="direction mt-50 p-15 bg-light my-2">
          <div className="commentTitle ">
            <div className="float-left clearfix">
              <img
                src={comment.User.avatar || config.DEFAULT_DISPLAY_PICTURE}
                alt="dp"
                className="img-icon-review rounded-circle m-0 "
              />
            </div>

            <div className="pt-10 mb-20">
              <Link
                className="text-dark bolder ml-2"
                to={`/user/${comment.User.id}`}
              >
                {comment.User.moniker}
              </Link>
              <p className="text-dark date">
                {moment(comment.updatedAt).fromNow()}
              </p>
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
  return 'Loading...';
};

export default GenerateReviews;
