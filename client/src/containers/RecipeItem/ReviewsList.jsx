import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import Textarea from 'react-textarea-autosize';
import { connect } from 'react-redux';

import Replies from './GenerateReply';
import config from '../../config';
import { getReply } from '../../actions/reviewActions';

/**
 *
 *
 * @export
 * @class ReviewsList
 * @extends {Component}
 */
export class ReviewsList extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    handleForm: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    reply: PropTypes.string.isRequired
  };

  /**
   * Creates an instance of ReviewsList.
   * @param {any} props
   *
   * @memberOf ReviewsList
   */
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showReply: false,
      increment: 0
    };
  }
  /**
   *
   * @param {number} event
   * @param {number} reviewId
   *
   * @returns {void}
   * @memberOf Reviews
   */
  showReview = (event, reviewId) => {
    event.preventDefault();
    if (this.state.showReply) {
      if (reviewId) {
        this.props.getReply(reviewId);
      }
      this.setState({ showReply: false, showForm: false });
    } else {
      if (reviewId) {
        this.props.getReply(reviewId);
      }
      this.setState({ showReply: true, showForm: false });
    }
  };

  /**
   *
   * @param {number} event
   *
   * @returns {void}
   */
  handleReplyForm = event => {
    event.preventDefault();
    if (this.state.showForm) {
      this.setState({ showForm: false, showReply: false });
    } else {
      this.setState({ showForm: true, showReply: false });
    }
  };

  incrementCounter = event => {
    this.handleReplyForm(event);
    this.setState(prevState => ({
      increment: prevState.increment + 1
    }));
  };
  /**
   *
   *
   * @returns {JSX.Element} React element
   *
   * @memberOf ReviewsList
   */
  render() {
    const {
      comment,
      deleteReview,
      auth,
      handleForm,
      handleChange,
      reply,
      reviewReply
    } = this.props;
    const { showForm, showReply, increment } = this.state;
    return (
      <div key={comment.id} className="comment-wrapper direction">
        <div data-aos="fade-left" data-aos-offset="20">
          <div className=" rounded mt-50 p-15 my-2">
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
                    className="fa fa-times-circle delete-review-btn hvr-buzz-out fa-2x "
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
            <div className="reply mt-15 text-dark hovered">
              <a onClick={this.handleReplyForm}>Reply </a> |
              {showReply &&
                comment.reviewsreply.length > 1 && (
                  <a onClick={this.showReview}>
                    &nbsp;Hide all {comment.reviewsreply.length + increment}{' '}
                    replies{' '}
                  </a>
                )}
              {showReply &&
                comment.reviewsreply.length + increment === 1 && (
                  <a onClick={this.showReview}>&nbsp;Hide reply </a>
                )}
              {!showReply &&
                comment.reviewsreply.length + increment > 1 && (
                  <a
                    onClick={event => {
                      this.showReview(event, comment.id);
                    }}
                  >
                    &nbsp;View all {comment.reviewsreply.length + increment}{' '}
                    replies{' '}
                  </a>
                )}
              {!showReply &&
                comment.reviewsreply.length + increment === 1 && (
                  <a
                    onClick={event => {
                      this.showReview(event, comment.id);
                    }}
                  >
                    &nbsp;View 1 reply{' '}
                  </a>
                )}
              {!showReply &&
                comment.reviewsreply.length + increment === 0 && (
                  <a> No reply </a>
                )}
              {!showReply && <i className="fa fa-chevron-down" />}
              {showReply && <i className="fa fa-chevron-up" />}
            </div>
          </div>
        </div>
        <div className="container reply-container">
          {showForm && (
            <form
              onSubmit={event => {
                handleForm(event, comment.id);
                this.incrementCounter(event);
              }}
              className="text-center clearfix"
            >
              <div className="form-row">
                <div className="form-group col-md-12 col-sm-12">
                  <Textarea
                    className="textarea col-12"
                    id="reviewField"
                    name="reviewBox"
                    value={reply}
                    onChange={handleChange}
                    placeholder="Reply this review"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-dark m-1 btn-lg col-lg-2 float-right col-md-2 col-sm-12"
              >
                Reply
              </button>
              <button
                onClick={this.handleReplyForm}
                className="btn m-1 btn-dark btn-lg float-right col-lg-2 col-md-2 col-sm-12"
              >
                Back
              </button>
            </form>
          )}
          {showReply && <Replies reply={reviewReply} />}
        </div>
      </div>
    );
  }
}

export default connect(null, { getReply })(ReviewsList);
