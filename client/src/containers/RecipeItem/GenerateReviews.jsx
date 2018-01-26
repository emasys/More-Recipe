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
          <div className="commentTitle">
            <img
              src={comment.User.avatar || config.DEFAULT_DISPLAY_PICTURE}
              alt="dp"
              className="img-icon-review rounded-circle"
            />
            <Link className="text-dark bolder ml-2" to={`/user/${comment.User.id}`}>
              {comment.User.moniker}
            </Link>
            <hr />
          </div>
          <div className="comments m-0">
            <p className="mb-0 text-dark">{comment.content}</p>
          </div>
          <div className="date bg-dark ">
            <p>{moment(comment.updatedAt).format('MMMM Do YYYY, h:mm a')}</p>
          </div>
        </div>
      </div>
    ));
  }
  return "Loading...";
};

export default GenerateReviews;
