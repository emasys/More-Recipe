import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Dropzone from 'react-dropzone';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

// import actions
import * as actions from '../actions';

// components
import Auth from '../components/auth';
import RecipeIngredients from '../components/Ingredients';
import Reviews from '../components/Reviews';
import Navbar from '../components/Navbar';
import config from '../config';
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
      vote: false,
      edit: false,
      open: false,
      deleteRecipe: false,
      name: '',
      isLoading: false,
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
    this.favIt = this.favIt.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.descriptionChanged = this.descriptionChanged.bind(this);
    this.directionChanged = this.directionChanged.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.ingChanged = this.ingChanged.bind(this);
    this.delRecipe = this.delRecipe.bind(this);
    this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
    this.onCloseDeleteModal = this.onCloseDeleteModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.hoverIn = this.hoverIn.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleImg = this.handleImg.bind(this);
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} cdm
   */
  componentDidMount() {
    console.log(this.props);
    this.props.getUpvStatus(this.props.match.params.id);
    this.props.getFavStatus(this.props.match.params.id);
    this.props.getRecipeItem(this.props.match.params.id).then(() => {
      const id = this.props.recipes.recipeItem.recipe.userId;
      this.props.getUserInfo(id);
      const {
        ingredients,
        name,
        description,
        direction,
        foodImg,
        userId
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
    console.log({ nextProps });
    if (nextProps.recipes) {
      if (nextProps.recipes.recipeItem) {
        this.setState({
          recipeItem: nextProps.recipes.recipeItem
        });
      }
    }
  }


  componentWillUpdate(nextProps, nextState) {
    console.log({ update: nextProps });
  }

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
  onOpenModal() {
    this.setState({ open: true });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to false
   */
  onCloseModal() {
    this.setState({ open: false });
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
      this.props.getFavStatus(this.props.match.params.id);
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
      this.props.getUpvStatus(this.props.match.params.id);
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
      this.props.getUpvStatus(this.props.match.params.id);
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
    const {
      description, direction, ingredients, name, foodImg
    } = this.state;
    event.preventDefault();
    let data = {
      name: name || event.target.elements.recipe.value,
      ingredients: ingredients || event.target.elements.ingredients.value,
      direction: direction || event.target.elements.direction.value,
      description: description || event.target.elements.description.value,
      foodImg: this.foodImg || foodImg
    };
    this.props.editRecipe(data, this.props.match.params.id).then(() => {
      this.props.getRecipeItem(this.props.match.params.id);
      this.onCloseModal();
    });
  }
  /**
   *
   *
   * @param {any} e
   * @memberof RecipeItem
   * @returns {any} new state
   */
  nameChanged(e) {
    this.setState({
      name: e.target.value
    });
  }
  /**
   *
   *
   * @param {any} e
   * @memberof RecipeItem
   * @returns {any} new state
   */
  ingChanged(e) {
    this.setState({
      ingredients: e.target.value
    });
  }

  /**
   *
   *
   * @param {any} e
   * @memberof RecipeItem
   * @returns {any} new state
   */
  directionChanged(e) {
    this.setState({
      direction: e.target.value
    });
  }

  /**
   *
   *
   * @param {any} e
   * @memberof RecipeItem
   * @returns {any} new state
   */
  descriptionChanged(e) {
    this.setState({
      description: e.target.value
    });
  }

  /**
   *
   *
   * @returns {any} current data in the db to be edited
   * @memberof RecipeItem
   */
  getEditForm() {
    if (this.props.recipes) {
      if (this.props.recipes.recipeItem) {
        const {
          id,
          name,
          ingredients,
          direction,
          description
        } = this.props.recipes.recipeItem.recipe;
      }
    }
    const {
      name, description, direction, ingredients
    } = this.state;
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
              name="ingredients"
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
              name="direction"
              defaultValue={direction}
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
              name="description"
              rows="4"
            />
          </li>
          <li className=" col-12 ">
            <input
              type="submit"
              value="submit"
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
    const { files } = this.state;
    console.log(files);

    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `morerecipe`);
      formData.append('upload_preset', config.UPLOAD_PRESET);
      formData.append('api_key', config.API_KEY);
      formData.append('timestamp', (Date.now() / 1000) | 0);

      return axios
        .post('https://api.cloudinary.com/v1_1/emasys/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(response => {
          const resdata = response.data;
          this.foodImg = resdata.secure_url;
        });
    });

    axios.all(uploaders).then(() => {
      // perform after upload is successful operation
      this.update();
      this.handleSubmit.apply(this, arguments);
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
        status, preview, save, edit
      } = this.state;

      return (
        <div className="">
          <div>
            <button className={`btn btn-success mb-5 ${save}`} onClick={this.handleImg}>save changes</button>
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

            <img src={preview || foodImg} alt="foodie" className="img-fluid rounded recipeImage" />

            <figcaption className="text-center bolder">{name}</figcaption>
            <div className="d-inline mt-3">
              <span className="text-center card-link" onClick={this.favIt}>
                <i
                  className={`fa  ${
                    this.props.favorite.favStatus.success ?
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
                    this.props.votes.votes.upvote.success ?
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
                    this.props.votes.votes.downvote.success ?
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
   *
   *
   * @returns {jsx} render elements
   * @memberof RecipeItem
   */
  render() {
    const { open, deleteRecipe, recipeItem } = this.state;
    return (
      <div>
        <Navbar />
        <ToastContainer />
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
            <div className="col-lg-6 col-md-6 col-sm-8  mb-5 recipe-image">
              {this.generateItems(recipeItem)}
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
            data-tip="Delete recipe"
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
            data-tip="Edit recipe"
            className={`btn btn-info rounded-circle ${
              this.state.edit ? 'd-block' : 'd-none'
            }`}
            id="floating-edit"
          >
            <i className="fa fa-pencil fa-2x" aria-hidden="true" />
          </button>
          <ReactTooltip place="bottom" type="dark" effect="float" />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  favorite: state.favorite,
  votes: state.votes,
  userInfo: state.user.userInfo
});
export default connect(mapStateToProps, actions)(RecipeItem);
