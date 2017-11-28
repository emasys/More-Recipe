import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import {
  getRecipeItem,
  setFavorite,
  getFavStatus,
  upvote,
  downvote,
  editRecipe,
  delRecipe,
  getUpvStatus,
  getUserInfo
} from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Modal from 'react-responsive-modal';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

// components
import Auth from '../components/auth';
import RecipeItems from '../components/recipe_item_image';
import RecipeIngredients from '../components/recipe_ingredients';
import Reviews from '../components/reviews';
import Navbar from '../components/navbar';

// console.log(decoded);
class Recipe_item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vote: false,
      edit: false,
      open: false,
      deleteRecipe: false,
      name: '',
      ingredients: '',
      direction: '',
      description: ''
    };
    this.generateItems = this.generateItems.bind(this);
    this.favIt = this.favIt.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    // this.getEditForm = this.getEditForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.directionChanged = this.directionChanged.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.ingChanged = this.ingChanged.bind(this);
    this.delRecipe = this.delRecipe.bind(this);
  }

  componentDidMount() {
    this.props.getUpvStatus(this.props.match.params.id);
    this.props.getFavStatus(this.props.match.params.id);
    this.props.getRecipeItem(this.props.match.params.id).then(() => {
      const id = this.props.recipes.recipeItem.recipe.userId;
      const {
        ingredients,
        name,
        description,
        direction
      } = this.props.recipes.recipeItem.recipe;
      this.props.getUserInfo(id);
      if (Auth.userID() === id) {
        this.setState({
          edit: true,
          name,
          ingredients: ingredients.join(','),
          description,
          direction
        });
      }
    });
  }

  delRecipe() {
    console.log('reached');
    this.props.delRecipe(this.props.match.params.id).then(() => {
      this.props.history.push('/catalog');
    });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onOpenDeleteModal = () => {
    this.setState({ deleteRecipe: true });
  };

  onCloseDeleteModal = () => {
    this.setState({ deleteRecipe: false });
  };
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
  handleSubmit(e) {
    // e.preventDefault();
    this.props.editRecipe(this.state, this.props.match.params.id);
  }
  nameChanged(e) {
    this.setState({
      name: e.target.value
    });
  }
  ingChanged(e) {
    this.setState({
      ingredients: e.target.value
    });
  }
  directionChanged(e) {
    this.setState({
      direction: e.target.value
    });
  }
  descriptionChanged(e) {
    this.setState({
      description: e.target.value
    });
  }
  getEditForm() {
    if (this.props.recipes) {
      if (this.props.recipes.recipeItem.message) {
        this.props.history.push('/signin');
      }
      if (this.props.recipes.recipeItem) {
        if (this.props.recipes.recipeItem.message) {
          return this.props.history.push('/signin');
        }
        const {
          id,
          name,
          ingredients,
          direction,
          description
        } = this.props.recipes.recipeItem.recipe;
      }
    }
    const { name, description, direction, ingredients } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="form row">
          <li className="col-lg-6 col-sm-6">
            <label>Recipe Name</label>
            <input
              type="text"
              required
              placeholder="Recipe Name"
              className="col-lg-11 col-sm-12"
              name="recipe"
              value={name}
              onChange={this.nameChanged}
            />
          </li>
          <li className="col-lg-6 col-sm-12">
            <label>Ingredients</label>
            <textarea
              className="col-lg-11 col-sm-12"
              id="FormControlTextarea"
              value={ingredients}
              onChange={this.ingChanged}
              rows="4"
            />
          </li>
          <li className="col-lg-6 col-sm-12">
            <label>Direction</label>
            <textarea
              className="col-lg-11 col-sm-12"
              id="FormControlTextarea"
              value={direction}
              onChange={this.directionChanged}
              rows="4"
            />
          </li>

          <li className="col-lg-6 col-sm-12">
            <label>Description</label>
            <textarea
              className="col-lg-11 col-sm-12"
              id="FormControlTextarea"
              value={description}
              onChange={this.descriptionChanged}
              name="bio"
              rows="4"
            />
          </li>
          <li className=" col-12 ">
            <input
              type="submit"
              value="submit"
              id="submit"
              className="btn bg-dark"
            />
          </li>
        </ul>
      </form>
    );
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
        upvote,
        foodImg
      } = reactions.recipe;
      console.log(foodImg);

      return (
        <div className="">
          <figure>
            <img
              src={`../../../img/uploads/${foodImg}`}
              alt="foodie"
              className="img-fluid rounded"
            />
            <figcaption>{name}</figcaption>
            <div className="d-inline mt-3">
              <span className="text-center card-link" onClick={this.favIt}>
                <i
                  className={`fa  ${
                    this.props.favStatus.favStatus.success
                      ? 'fa-heart red animated bounceIn flash'
                      : 'fa-heart gray'
                  } fa-2x`}
                  aria-hidden="true"
                  id="favorite"
                />
                <em className="bg-dark">{favorite}</em>
              </span>
              <span className="text-center card-link m-1" onClick={this.upvote}>
                {/* {console.log(this.props.votes.votes)} */}
                <i
                  className={`fa ${
                    this.props.votes.votes.upvote.success
                      ? 'fa-thumbs-up animated bounceIn flash blue'
                      : 'fa-thumbs-up gray'
                  } fa-2x`}
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
                  className={`fa ${
                    this.props.votes.votes.downvote.success
                      ? 'fa-thumbs-down animated bounceIn flash red'
                      : 'fa-thumbs-down gray'
                  } fa-2x`}
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
    // const { openFirstModal, openSecondModal } = this.state;
    const { open, deleteRecipe } = this.state;

    return (
      <div>
        <Navbar />

        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Edit Recipe</h2>
          {this.getEditForm()}
        </Modal>
        <Modal open={deleteRecipe} onClose={this.onCloseDeleteModal} little>
          <div className="text-center mt-10">
            <h4>Delete Recipe?</h4>
            <h2 className="mt-5">
              Are you sure you want to delete this recipe?
            </h2>
            <h4>This action cannot be revoked</h4>
            <button
              className="btn btn-block btn-success"
              onClick={this.delRecipe}
            >
              Yes
            </button>
            <button
              className="btn btn-block btn-danger"
              onClick={this.onCloseDeleteModal}
            >
              No
            </button>
          </div>
        </Modal>
        <section className="container">
          <div className="row justify-content-center catalog-wrapper">
            <div className="col-lg-6 col-sm-12  mb-5 recipe-image">
              {this.generateItems(this.props.recipes.recipeItem)}
            </div>
            <RecipeIngredients
              ingredients={this.props.recipes.recipeItem}
              data={this.props.userInfo}
            />
          </div>
          <Reviews id={this.props.match.params.id} />
          <button
            onClick={this.onOpenDeleteModal}
            href="#"
            className={`btn btn-danger rounded-circle ${
              this.state.edit ? 'd-block' : 'd-none'
            }`}
            id="floating-delete"
          >
            <i className="fa fa-trash fa-2x" aria-hidden="true" />
          </button>
          <button
            onClick={this.onOpenModal}
            href="#!"
            className={`btn btn-info rounded-circle ${
              this.state.edit ? 'd-block' : 'd-none'
            }`}
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
  console.log(state);
  return {
    recipes: state.recipes,
    favorite: state.favorite,
    favStatus: state.favStatus,
    votes: state.votes,
    userInfo: state.signin.userInfo
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
      downvote,
      editRecipe,
      delRecipe,
      getUserInfo
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipe_item);
