import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Pace from 'react-pace-progress';

// Actions
import { getRecipeItem, editRecipe } from '../../actions/recipeActions';
import { setFavorite } from '../../actions/favoriteAction';
import { upvote, downvote } from '../../actions/voteActions';

// components
import Auth from '../../components/auth';
import RecipeIngredients from './Ingredients';
import Reviews from './Reviews';
import Navbar from '../../components/Navbar';
import EditForm from './EditForm';
import GenerateItems from './GenerateRecipeItems';

/**
 *
 * @param {object} event
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
      error: 'd-none',
      favoriteStatus: false,
      upvoteStatus: false,
      downvoteStatus: false,
      deleteRecipe: false,
      name: '',
      editRecipeItem: false,
      preview: null,
      files: null,
      status: 'fade',
      save: 'd-none',
      ingredients: '',
      direction: '',
      description: '',
      recipeItem: undefined
    };
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} cdm
   */
  componentDidMount() {
    this.props.getRecipeItem(this.props.match.params.id);
  }
  /**
   *
   *
   * @param {any} nextProps
   * @memberof RecipeItem
   * @returns {any} cwrp
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes.updated) {
      this.update();
      this.setState({
        editRecipeItem: false,
        status: 'fade',
        error: 'd-none'
      });
    }
    if (nextProps.recipes.recipeItem.data) {
      if (nextProps.recipes.recipeItem.data.status === 'Recipes not found') {
        nextProps.history.push('/NotFound');
      }
      this.setState({
        error: 'd-block'
      });
    }
    if (nextProps.recipes.recipeItem.recipe) {
      this.setState({
        favoriteStatus: false,
        recipeItem: nextProps.recipes.recipeItem
      });
      const {
        favorites,
        ingredients,
        name,
        description,
        direction,
        foodImg,
        category,
        userId
      } = nextProps.recipes.recipeItem.recipe;
      if (userId === Auth.userID()) {
        this.setState({
          name,
          description,
          direction,
          foodImg,
          category,
          ingredients: ingredients.join(','),
          edit: true
        });
      }
      favorites.map(user => {
        if (user.userId === Auth.userID()) {
          return this.setState({
            favoriteStatus: true
          });
        }
        return null;
      });
    }
  }
  deleteRecipeInit = event => {
    event.preventDefault();
  };
  /**
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} redirects a user back to catalog page after deletion
   */
  delRecipe = () => {
    this.props.delRecipe(this.props.match.params.id, Auth.userID()).then(() => {
      if (this.props.recipes.del_recipe.success) {
        this.props.history.push('/catalog');
      }
    });
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to true
   */
  onOpenDeleteModal = () => {
    this.setState({ deleteRecipe: true });
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to false
   */
  onCloseDeleteModal = () => {
    this.setState({ deleteRecipe: false });
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} add a recipe to user's favorite list
   */
  favIt = () => {
    this.props.setFavorite(this.props.match.params.id);
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} upvote a recipe
   */
  upvote = () => {
    this.props.upvote(this.props.match.params.id);
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {any} downvote a recipe
   */
  downvote = () => {
    this.props.downvote(this.props.match.params.id);
  };
  /**
   * @returns {any}
   * edit recipe helper function
   * @param {any} data
   * @memberof RecipeItem
   */
  edited = data => {
    this.props.editRecipe(data, this.props.match.params.id);
  };
  /**
   *
   *
   * @param {event} event
   * @param {string} foodImg
   * @memberof RecipeItem
   * @returns {any} an updated recipe
   */
  handleSubmit = event => {
    const { foodImg, recipeItem: { recipe: { name } } } = this.state;
    event.preventDefault();
    const prevName = name;
    const newName = event.target.elements.recipe.value.trim();
    let data = {
      name:
        prevName === newName ? null : event.target.elements.recipe.value.trim(),
      ingredients: event.target.elements.ingredients.value,
      direction: event.target.elements.direction.value,
      description: event.target.elements.description.value,
      category: event.target.elements.category.value,
      foodImg: this.foodImg || foodImg
    };
    this.edited(data);
  };

  /**
   *
   * @returns {any} a new state
   * @memberof RecipeItem
   */
  hoverIn = () => {
    this.setState({ status: 'show' });
  };
  /**
   *
   * @returns {any} a new state
   * @memberof RecipeItem
   */
  hoverOut = () => {
    this.setState({ status: 'fade' });
  };
  /**
   *
   *
   * @param {any} files
   * @memberof RecipeItem
   * @returns {object} a preview of image
   */
  handleDrop = files => {
    const [{ preview }] = files;
    this.setState({ preview, files, save: 'show' });
  };
  /**
   *
   *
   * @returns {object}
   * upload status
   * @memberof RecipeItem
   */
  notify = () => {
    this.toastId = toast('Uploading...', { autoClose: false });
    return this.toastId;
  };
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
  handleImg = () => {
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
  };
  /**
   *
   *
   * @param {object} reactions
   * @returns {any} jsx elements
   * @memberof RecipeItem
   */
  generateItems = reactions => {
    if (reactions) {
      return (
        <GenerateItems
          state={this.state}
          foodImg={this.state.recipeItem.recipe.foodImg}
          upvote={this.upvote}
          reactionUp={this.state.recipeItem.recipe.reactionUp}
          reactionDown={this.state.recipeItem.recipe.reactionDown}
          downvote={this.downvote}
          favIt={this.favIt}
          hoverIn={this.hoverIn}
          hoverOut={this.hoverOut}
          handleImg={this.handleImg}
          handleDrop={this.handleDrop}
        />
      );
    }
  };
  /**
   * @returns {any}
   * set a new edit state
   * @memberof RecipeItem
   */
  showEditForm = () => {
    this.setState({
      editRecipeItem: true,
      status: 'show'
    });
  };
  /**
   *
   *
   * @returns {jsx} render elements
   * @memberof RecipeItem
   */
  render() {
    const { recipeItem, edit, editRecipeItem } = this.state;
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <div className="fixed-top">
          {this.props.netReq && <Pace color="#e7b52c" height={2} />}
        </div>
        <ToastContainer />
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteModalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Delete Recipe
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this recipe?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  data-dismiss="modal"
                >
                  No
                </button>
                <button
                  onClick={this.delRecipe}
                  type="button"
                  data-dismiss="modal"
                  className="btn btn-danger btn-lg"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        <section
          data-aos="fade-up"
          data-duration="800"
          className="container mt-80"
        >
          <div
            className="row justify-content-center catalog-wrapper mb-20"
            id="catalog"
          >
            <div className="col-lg-6 col-md-6 col-sm-8  mb-5 recipe-image">
              {this.generateItems(recipeItem)}
            </div>
            {editRecipeItem && (
              <EditForm handleSubmit={this.handleSubmit} state={this.state} />
            )}
            {!editRecipeItem && (
              <RecipeIngredients
                ingredients={this.props.recipes.recipeItem}
                data={this.props.userInfo}
              />
            )}
          </div>
          <Reviews />
          {edit && (
            <i
              data-tip="Delete recipe"
              onClick={this.deleteRecipeInit}
              data-toggle="modal"
              data-target="#deleteModal"
              className="fa fa-trash fa-2x text-danger hvr-buzz-out rounded-circle"
              id="floating-delete"
              aria-hidden="true"
            />
          )}
          {edit && (
            <i
              data-tip="Edit recipe"
              id="floating-edit"
              className="text-info fa fa-pencil fa-2x rounded-circle"
              aria-hidden="true"
              onClick={this.showEditForm}
            />
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  favorite: state.favorite,
  votes: state.votes,
  userInfo: state.user.userInfo,
  review: state.review,
  netReq: state.netReq
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getRecipeItem,
      editRecipe,
      setFavorite,
      upvote,
      downvote
    },
    dispatch
  )
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
  netReq: PropTypes.bool,
  getRecipeItem: PropTypes.func,
  match: PropTypes.object
};

export { RecipeItem as DummyRecipeItem };
export default connect(mapStateToProps, mapDispatchToProps)(RecipeItem);
