import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postReview, getRecipeItem } from '../actions';
import { Link } from 'react-router-dom';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
    this.getReview = this.getReview.bind(this);
    this.txChanged = this.txChanged.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillMount() {
    // this.props.getRecipeItem(this.props.id);
  }
  componentDidUpdate() {
    // this.props.getRecipeItem(this.props.id);
  }

  resetState() {
    this.setState({
      content: ''
    });
  }

  handleForm(e) {
    e.preventDefault();
    const data = this.state;
    const id = this.props.recipes.recipeItem.recipe.id;
    this.props.postReview(data, id).then(res => {
      this.props.getRecipeItem(id);
    });
    this.resetState();
  }
  txChanged(e) {
    this.setState({
      content: e.target.value
    });
  }

  getReview(reviews) {
    if (reviews) {
      const comments = reviews.recipe.reviews;
      console.log(comments);
      return comments.map((comment, index) => {
        return (
          <div className="direction rounded my-2" key={index}>
            <blockquote className="blockquote">
              <p className="mb-0">{comment.content}</p>
              <footer className="blockquote-footer">
                {' '}
                <Link to={`/user/${comment.userId}`}> {comment.user}</Link>
              </footer>
            </blockquote>
          </div>
        );
      });
    }
  }

  render() {
    const { content } = this.state;
    return (
      <div className="row justify-content-center mt-2 catalog-wrapper">
        <div className="col-12">
          <h5 className="text-center text-muted">Reviews</h5>
          <hr />
        </div>
        <div className="col-lg-4 col-sm-12 mr-5 recipe-image">
          <form onSubmit={this.handleForm}>
            <div className="form-row">
              <div className="form-group col-md-12 col-sm-12">
                <textarea
                  className="form-control"
                  id="FormControlTextarea"
                  rows="4"
                  onChange={this.txChanged}
                  value={content}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
        <div className="col-lg-6 col-sm-12 ">
          {this.getReview(this.props.recipes.recipeItem)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ postReview, getRecipeItem }, dispatch)
});

const mapStateToProps = (state, ownProps) => {
  return {
    review: state.review,
    recipes: state.recipes
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
