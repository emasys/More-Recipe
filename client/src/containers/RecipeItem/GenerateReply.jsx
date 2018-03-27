import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 *
 *
 * @param {object} { review, deleteReview, auth }
 * @returns {JSX.Element} React element
 */
const GenerateReply = ({ reply }) => {
  if (reply) {
    return reply.reviews.map(replies => (
      <div key={replies.id}>
        <div className="comment-wrapper row justify-content-end">
          <div className="bg-light rounded mt-1 col-11 p-15 my-2">
            <div className="commentTitle ">
              {/* <div className="float-left  mr-5">
              option for avatar can be activated here
                <Avatar
                  name={replies.moniker}
                  round
                  size={40}
                  textSizeRatio={3}
                />
              </div> */}
              <div className="clearfix mb-10">
                <Link
                  className="text-dark bolder moniker"
                  to={`/user/${replies.userId}`}
                >
                  {replies.moniker}
                </Link>
                <p className="text-dark date">
                  {moment(replies.updatedAt).fromNow()}
                </p>
              </div>
              <hr />
            </div>
            <div className="comments ml-10">
              <p className="mb-0 text-dark">{replies.content}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  return <p>Loading comments...</p>;
};

GenerateReply.propTypes = {
  reply: PropTypes.array.isRequired
};

export default GenerateReply;
