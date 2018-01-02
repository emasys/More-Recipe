import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Dropzone from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import Textarea from "react-textarea-autosize";
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

// import actions
import * as actions from '../actions';

// components
import Auth from '../components/auth';
import RecipeIngredients from '../components/Ingredients';
import Reviews from '../components/Reviews';
import Navbar from '../components/Navbar';
/**
 *
 *
 * @class RecipeItem
 * @extends {Component}
 */
class RecipeItem extends Component {
  /**
   * Creates an instance of RecipeItem.
   * @param {any} props
   * @memberof RecipeItem
   */
  constructor(props) {
    super(props);
    this.foodImg = null;
    this.state = {
      edit: false,
      favoriteStatus: false,
      upvoteStatus: false,
      downvoteStatus: false,
      deleteRecipe: false,
      name: '',
      editRecipe: false,
      preview: '',
      files: null,
      status: 'fade',
      save: 'd-none',
      ingredients: '',
      direction: '',
      description: '',
      recipeItem: undefined
    };
    this.generateItems = this.generateItems.bind(this);
    this.edited = this.edited.bind(this);
    this.favIt = this.favIt.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delRecipe = this.delRecipe.bind(this);
    this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
    this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);
    this.hoverIn = this.hoverIn.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} cdm
   */
  componentDidMount() {
    this.props.getRecipeItem(this.props.match.params.id).then(() => {
      const {
        ingredients, name, description, direction, foodImg, userId
      } = this.props.recipes.recipeItem.recipe;
      if (Auth.userID() === userId) {
        this.setState({
          edit: true,
          name,
          ingredients: ingredients.join(','),
          description,
          direction,
          foodImg
        });
      }
      this.props.getUserInfo(userId);
    });
  }
  /**
   *
   *
   * @param {any} nextProps
   * @memberof RecipeItem
   * @returns {any} cwrp
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      favoriteStatus: false,
      recipeItem: nextProps.recipes.recipeItem,
    });
    const {
      reactionUp, reactionDown, favorites
    } = nextProps.recipes.recipeItem.recipe;
    favorites.map((user) => {
      if (user.userId === Auth.userID()) {
        return this.setState({ favoriteStatus: true });
      }
      return null;
    });
    if (reactionUp.indexOf(Auth.userID()) === -1) {
      this.setState({ upvoteStatus: false });
    } else this.setState({ upvoteStatus: true });
    if (reactionDown.indexOf(Auth.userID()) === -1) {
      this.setState({ downvoteStatus: false });
    } else this.setState({ downvoteStatus: true });
  }
  /**
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} redirects a user back to catalog page after deletion
   */
  delRecipe() {
    this.props.delRecipe(this.props.match.params.id).then(() => {
      if (this.props.recipes.del_recipe.success) {
        this.props.history.push('/catalog');
      }
    });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to true
   */
  onOpenDeleteModal() {
    this.setState({ deleteRecipe: true });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to false
   */
  onCloseDeleteModal() {
    this.setState({ deleteRecipe: false });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} add a recipe to user's favorite list
   */
  favIt() {
    this.props.setFavorite(this.props.match.params.id).then(() => {
      this.props.getRecipeReactions(this.props.match.params.id);
    });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} upvote a recipe
   */
  upvote() {
    this.props.upvote(this.props.match.params.id).then(() => {
      this.props.getRecipeReactions(this.props.match.params.id);
    });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} downvote a recipe
   */
  downvote() {
    this.props.downvote(this.props.match.params.id).then(() => {
      this.props.getRecipeReactions(this.props.match.params.id);
    });
  }
  /**
 * @returns {any}
 * edit recipe helper function
 * @param {any} data
 * @memberof RecipeItem
 */
  edited(data) {
    this.props.editRecipe(data, this.props.match.params.id).then(() => {
      if (this.props.recipes.updateRecipes.success) {
        this.update();
        this.setState({
          editRecipe: false,
          status: 'fade'
        });
      } else {
        document.querySelector('#recipe_error').innerHTML =
        'A recipe with this name already exist';
      }
      this.props.getRecipeReactions(this.props.match.params.id);
    });
  }
  /**
   *
   *
   * @param {event} event
   * @param {string} foodImg
   * @memberof RecipeItem
   * @returns {any} an updated recipe
   */
  handleSubmit(event) {
    const { foodImg } = this.state;
    event.preventDefault();
    const prevName = this.props.recipes.recipeItem.recipe.name;
    const newName = event.target.elements.recipe.value.trim();
    let data = {
      name: prevName === newName ?
        null : event.target.elements.recipe.value.trim(),
      ingredients: event.target.elements.ingredients.value,
      direction: event.target.elements.direction.value,
      description: event.target.elements.description.value,
      foodImg: this.foodImg || foodImg
    };
    this.edited(data);
  }
  /**
   *
   *
   * @returns {any} current data in the db to be edited
   * @memberof RecipeItem
   */
  getEditForm() {
    const {
      name, description, direction, ingredients
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="form row justify-content-center">
          <li className="col-lg-8 col-sm-12">
            <label>Recipe Title</label>
            <input
              type="text"
              required
              placeholder="Recipe Name"
              className="col-lg-11 col-sm-12"
              name="recipe"
              defaultValue={name}
              onChange={this.nameChanged}
            />
            <div className="text-danger" id="recipe_error" />
          </li>
          <li className="col-lg-8 col-sm-12">
            <label>Ingredients <em className="text-warning">
            (separate with comma ",")</em></label>
            <Textarea
              className="col-lg-11 col-sm-12"
              id="FormControlTextarea"
              name="ingredients"
              minRows={1}
              maxRows={50}
              defaultValue={ingredients}
              onChange={this.ingChanged}
            />
          </li>
          <li className="col-lg-8 col-sm-12">
            <label>Direction</label>
            <Textarea
              className="col-lg-11 col-sm-12"
              name="direction"
              minRows={3}
              maxRows={50}
              defaultValue={direction}
              onChange={this.directionChanged}
            />
          </li>

          <li className="col-lg-8 col-sm-12">
            <label>Description</label>
            <Textarea
              className="col-lg-11 col-sm-12"
              id="FormControlTextarea"
              defaultValue={description}
              onChange={this.descriptionChanged}
              name="description"
              minRows={3}
              maxRows={50}
            />
          </li>
          <li className=" col-12 ">
            <input
              type="submit"
              value="save"
              id="submit"
              className="btn bg-dark hovered"
            />
          </li>
        </ul>
      </form>
    );
  }
  /**
   *
   * @returns {any} a new state
   * @memberof RecipeItem
   */
  hoverIn() {
    this.setState({ status: 'show' });
  }
  /**
   *
   * @returns {any} a new state
   * @memberof RecipeItem
   */
  hoverOut() {
    this.setState({ status: 'fade' });
  }
  /**
   *
   *
   * @param {any} files
   * @memberof RecipeItem
   * @returns {object} a preview of image
   */
  handleDrop(files) {
    const [{ preview }] = files;
    this.setState({ preview, files, save: 'show' });
  }
  /**
   *
   *
   * @returns {object}
   * upload status
   * @memberof RecipeItem
   */
  notify() {
    this.toastId = toast('Uploading...', { autoClose: false });
    return this.toastId;
  }
  // toast message
  update = () =>
    toast.update(this.toastId, {
      render: 'Upload complete!',
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      className: css({
        transform: 'rotateY(360deg)',
        transition: 'transform 0.6s'
      })
    });

  failedUpdate = () =>
    toast.update(this.toastId, {
      render: 'error, try again',
      type: toast.TYPE.ERROR,
      autoClose: 3000,
      className: css({
        transform: 'rotateY(360deg)',
        transition: 'transform 0.6s'
      })
    });
  /**
   *
   *
   * @param {any} files
   * @memberof RecipeItem
   * @returns {object}
   * upload image
   */
  handleImg() {
    this.notify();
    const { files, ingredients } = this.state;
    const file = files[0];
    this.props.uploadImg(file).then(() => {
      this.foodImg = this.props.recipes.uploadedImg;
      // for poor/no internet connection
      if (typeof this.foodImg === 'object') return this.failedUpdate();
      const data = {
        ingredients,
        foodImg: this.foodImg
      };
      this.edited(data);
      this.setState({
        save: 'd-none'
      });
    });
  }
  /**
   *
   *
   * @param {object} reactions
   * @returns {any} jsx elements
   * @memberof RecipeItem
   */
  generateItems(reactions) {
    if (reactions) {
      const {
        name,
        downvote,
        favorite,
        category,
        upvote,
        foodImg
      } = reactions.recipe;

      const {
        status, preview, save, edit, favoriteStatus,
        upvoteStatus, downvoteStatus
      } = this.state;
      return (
        <div className="">
          <div>
            <button className={`btn btn-success mb-5 ${save}`}
              onClick={this.handleImg}>
          save changes
            </button>
          </div>
          <figure
            className="img-wrapper"
            onMouseEnter={this.hoverIn}
            onMouseLeave={this.hoverOut}
          >
            {edit && <div
              className={` changeDp hovered  ${status}`}
            >
              <Dropzone
                onDrop={this.handleDrop}
                accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                multiple={false}
                className=" p-10 text-center text-light dropzone-dp"
              >
                click to upload / change picture
              </Dropzone>
            </div>}

            <img src={preview || foodImg} alt="foodie"
              className="img-fluid rounded recipeImage" />
            <figcaption className="text-center bolder">{name}</figcaption>
            <div className="d-inline mt-3">
              <span className="text-center card-link" onClick={this.favIt}>
                <i
                  className={`fa  ${
                    favoriteStatus ?
                      'fa-heart red animated bounceIn flash' :
                      'fa-heart gray'
                  } fa-2x`}
                  aria-hidden="true"
                  id="favorite"
                />
                <em className="bg-dark">{favorite}</em>
              </span>
              <span className="text-center card-link m-1" onClick={this.upvote}>
                <i
                  className={`fa ${
                    upvoteStatus ?
                      'fa-thumbs-up animated bounceIn flash blue' :
                      'fa-thumbs-up gray'
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
                    downvoteStatus ?
                      'fa-thumbs-down animated bounceIn flash red' :
                      'fa-thumbs-down gray'
                  } fa-2x`}
                  aria-hidden="true"
                  id="dislike"
                />
                <em className="bg-danger">{downvote}</em>
              </span>

              <span className="m-1 float-right d-inline">
                <i className="fa fa-tag " aria-hidden="true" />
                <Link to={`/category/${category}`}>
                  {` `}
                  {category}
                </Link>
              </span>
            </div>
          </figure>
        </div>
      );
    }
  }
  /**
   * @returns {any}
   * set a new edit state
   * @memberof RecipeItem
   */
  showEditForm() {
    this.setState({
      editRecipe: true,
      status: 'show'
    });
  }
  /**
   *
   *
   * @returns {jsx} render elements
   * @memberof RecipeItem
   */
  render() {
    const {
      deleteRecipe, recipeItem, editRecipe, edit
    } = this.state;
    return (
      <div>
        <Navbar />
        <ToastContainer />
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
        <Fade duration={1000} >
          <section className="container mt-80">
            <div className=
              "row justify-content-center catalog-wrapper mb-20" id="catalog">
              <div className="col-lg-6 col-md-6 col-sm-8  mb-5 recipe-image">
                {this.generateItems(recipeItem)}
              </div>
              {editRecipe && this.getEditForm()}
              {!editRecipe && <RecipeIngredients
                ingredients={this.props.recipes.recipeItem}
                data={this.props.userInfo}
              />}
            </div>
            <Reviews id={this.props.match.params.id} />
            {edit && <i
              onClick={this.onOpenDeleteModal}
              data-tip="Delete recipe"
              className=
                "fa fa-trash fa-2x text-danger hvr-buzz-out rounded-circle"
              id="floating-delete"
              aria-hidden="true">
              <ReactTooltip place="bottom" type="dark" effect="float" />
            </i>
            }
            {edit && <i
              data-tip="Edit recipe"
              id="floating-edit"
              className="text-info fa fa-pencil fa-2x rounded-circle"
              aria-hidden="true"
              onClick={this.showEditForm}
            />
            }
          </section>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  favorite: state.favorite,
  votes: state.votes,
  userInfo: state.user.userInfo,
});

RecipeItem.propTypes = {
  userInfo: PropTypes.object,
  uploadImg: PropTypes.func,
  downvote: PropTypes.func,
  upvote: PropTypes.func,
  setFavorite: PropTypes.func,
  getRecipeReactions: PropTypes.func,
  editRecipe: PropTypes.func,
  delRecipe: PropTypes.func,
  history: PropTypes.object,
  getRecipe: PropTypes.func,
  getUserInfo: PropTypes.func,
  recipes: PropTypes.object,
  getRecipeItem: PropTypes.func,
  match: PropTypes.object
};
export default connect(mapStateToProps, actions)(RecipeItem);
