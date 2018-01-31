import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Action
import { postReview } from '../../actions/reviewActions';

// Component
import GenerateReviews from './GenerateReviews';

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
    if (data.content) {
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
  txChanged = event => {
    this.setState({
      content: event.target.value
    });
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
          <h5 className="text-center text-muted">Reviews</h5>
          <hr />
        </div>
        <div className="col-lg-7 col-sm-12 recipe-image">
          <form onSubmit={this.handleForm} className="text-center">
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
            <button
              type="submit"
              className="btn btn-dark  btn-lg col-lg-4 col-md-6 col-sm-12"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-8 col-sm-12 ">
          <GenerateReviews review={this.props.review} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  review: state.review,
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ postReview }, dispatch)
});

Reviews.propTypes = {
  postReview: PropTypes.func,
  recipes: PropTypes.object,
  review: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
