import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
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
import Navbar from '../components/navbar';

const token = window.localStorage.getItem('token');
const decoded = jwt_decode(token);
// console.log(decoded);
class Recipe_item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: false,
      edit: false
    };
    this.generateItems = this.generateItems.bind(this);
    this.favIt = this.favIt.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  componentDidMount() {
    this.props.getUpvStatus(this.props.match.params.id);
    this.props.getFavStatus(this.props.match.params.id);
    this.props.getRecipeItem(this.props.match.params.id).then(() => {
      const id = this.props.recipes.recipeItem.recipe.userId;
      console.log(id, decoded.id);
      if (decoded.id === id) {
        this.setState({
          edit: true
        });
      }
    });
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
            <div className="d-inline mt-3">
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

              <span className="m-1 float-right d-inline">
                <i className="fa fa-tag " aria-hidden="true" />
                <a href="#!" className="">
                  {` `}
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
      <div>
        <Navbar />
        <section className="container">
          <div className="row justify-content-center catalog-wrapper">
            <div className="col-lg-6 col-sm-12  mb-5 recipe-image">
              {this.generateItems(this.props.recipes.recipeItem)}
            </div>
            <RecipeIngredients ingredients={this.props.recipes.recipeItem} />
          </div>
          <Reviews id={this.props.match.params.id} />
          <button
            href="#"
            className={`btn btn-danger rounded-circle ${this.state.edit
              ? 'd-block'
              : 'd-none'}`}
            id="floating-delete"
          >
            <i className="fa fa-trash fa-2x" aria-hidden="true" />
          </button>
          <button
            href="#!"
            className={`btn btn-info rounded-circle ${this.state.edit
              ? 'd-block'
              : 'd-none'}`}
            id="floating-edit"
          >
            <i className="fa fa-pencil fa-2x" aria-hidden="true" />
          </button>
        </section>
      </div>
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
