import React, { Component } from 'react';
import {
  getRecipeItem,
  setFavorite,
  getFavStatus,
  upvote,
  downvote,
  getUpvStatus
} from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import RecipeItems from '../components/recipe_item_image';
import RecipeIngredients from '../components/recipe_ingredients';
import Reviews from '../components/reviews';

class Recipe_item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: false
    };
    this.generateItems = this.generateItems.bind(this);
    this.favIt = this.favIt.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount() {
    // this.setState({
    //   vote: this.props.votes.upvotes.success
    // });
    this.props.getUpvStatus(this.props.match.params.id);
    this.props.getFavStatus(this.props.match.params.id);
    this.props.getRecipeItem(this.props.match.params.id);
  }

  reRender() {
    this.props.getUpvStatus(this.props.match.params.id);
    this.props.getFavStatus(this.props.match.params.id);
  }
  favIt() {
    this.props.setFavorite(this.props.match.params.id).then(() => {
      this.props.getFavStatus(this.props.match.params.id);
      this.componentDidMount();
    });
  }

  upvote() {
    this.props.upvote(this.props.match.params.id).then(() => {
      this.componentDidMount();
      // this.reRender();
    });
  }

  downvote() {
    this.props.downvote(this.props.match.params.id).then(() => {
      this.componentDidMount();
    });
  }

  generateItems(reactions) {
    if (reactions) {
      const {
        id,
        name,
        views,
        comments,
        downvote,
        favorite,
        category,
        upvote
      } = reactions.recipe;

      return (
        <div className="">
          <figure>
            <img
              src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
              alt="foodie"
              className="img-fluid rounded"
            />
            <figcaption>{name}</figcaption>
            <div className="d-inline">
              <span className="text-center card-link" onClick={this.favIt}>
                <i
                  className={`fa  ${this.props.favStatus.favStatus.success
                    ? 'fa-heart red animated bounceIn flash'
                    : 'fa-heart-o'} fa-2x`}
                  aria-hidden="true"
                  id="favorite"
                />
                <em className="bg-dark">{favorite}</em>
              </span>
              {/* <span className="text-center card-link m-1">
                <i className="fa fa-eye  fa-2x" aria-hidden="true" />
                <em className="bg-primary">{views}</em>
              </span> */}

              <span className="text-center card-link m-1" onClick={this.upvote}>
                {/* {console.log(this.props.votes.votes)} */}
                <i
                  className={`fa ${this.props.votes.votes.upvote.success
                    ? 'fa-thumbs-up animated bounceIn flash blue'
                    : 'fa-thumbs-o-up'} fa-2x`}
                  aria-hidden="true"
                  id="like"
                />
                <em className="bg-success">{upvote}</em>
              </span>
              <span
                className="text-center card-link m-1"
                onClick={this.downvote}
              >
                <i
                  className={`fa ${this.props.votes.votes.downvote.success
                    ? 'fa-thumbs-down animated bounceIn flash red'
                    : 'fa-thumbs-o-down'} fa-2x`}
                  aria-hidden="true"
                  id="dislike"
                />
                <em className="bg-danger">{downvote}</em>
              </span>

              {/* <span className="text-center card-link m-1">
                <i className="fa fa-comment-o  fa-2x" aria-hidden="true" />
                <em className="bg-dark">{comments}</em>
              </span> */}

              <span className="m-1 float-right">
                <a href="#" className="btn btn-danger btn-lg" role="button">
                  CATEGORY{' '}
                  <i className="fa fa-chevron-right" aria-hidden="true" />{' '}
                  {category}
                </a>
              </span>
            </div>
          </figure>
        </div>
      );
    }
  }
  render() {
    return (
      <section className="container">
        <div className="row justify-content-center recipe-item-section">
          <div className="col-lg-6 col-sm-12  mb-5 recipe-image">
            {this.generateItems(this.props.recipes.recipeItem)}
          </div>
          <RecipeIngredients ingredients={this.props.recipes.recipeItem} />
        </div>
        <Reviews id={this.props.match.params.id} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    recipes: state.recipes,
    favorite: state.favorite,
    favStatus: state.favStatus,
    votes: state.votes
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getRecipeItem,
      setFavorite,
      getFavStatus,
      upvote,
      getUpvStatus,
      downvote
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipe_item);
