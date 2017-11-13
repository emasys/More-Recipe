import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postReview } from '../actions';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      id: 0
    };
    this.getReview = this.getReview.bind(this);
  }

  getReview({ reviews }) {
    if (reviews) {
      console.log(reviews.recipe.reviews);
    }
    return (
      <div className="direction rounded my-2">
        <blockquote className="blockquote">
          <p className="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
          <footer className="blockquote-footer">
            {' '}
            <a href="user.html"> John Wick</a>{' '}
          </footer>
        </blockquote>
      </div>
    );
  }

  txChanged(e) {
    console.log(e.target.value);
    const comment = e.target.value;
    this.setState({
      content: comment
    });
  }
  render() {
    const { content, id } = this.state;
    return (
      <div className="row justify-content-center mt-2 recipe-item-section">
        <div className="col-12">
          <h5 className="text-center text-muted">Reviews</h5>
          <hr />
        </div>
        <div className="col-lg-4 col-sm-12 mr-5 recipe-image">
          <form>
            <div className="form-row">
              <div className="form-group col-md-12 col-sm-12">
                <textarea
                  className="form-control"
                  value={content}
                  id="FormControlTextarea"
                  rows="4"
                  onChange={this.txChanged}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-6 col-sm-12 ">{this.getReview(this.props)}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ postReview }, dispatch)
});

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    review: state.reviews
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
