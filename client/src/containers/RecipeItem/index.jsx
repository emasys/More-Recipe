import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Actions
import {
  getRecipeItem,
  editRecipe,
  delRecipe,
  clearRecipes,
  getRecipeReactions
} from '../../actions/recipeActions';
import { setFavorite } from '../../actions/favoriteAction';
import { upvote, downvote } from '../../actions/voteActions';
import { uploadImg } from '../../actions';

// components
import RecipeIngredients from './Ingredients';
import Reviews from './Reviews';
import Navbar from '../../components/Navbar';
import EditForm from './EditForm';
import GenerateItems from './GenerateRecipeItems';
import DeleteModal from '../Profile/DeleteModal';

//Helper functions
import { update, notify, failedUpdate } from './helperFunctions';

/**
 *
 *
 * @class RecipeItem
 * @extends {Component}
 */
export class RecipeItem extends Component {
  static propTypes = {
    userInfo: PropTypes.object,
    uploadImg: PropTypes.func.isRequired,
    downvote: PropTypes.func.isRequired,
    upvote: PropTypes.func.isRequired,
    setFavorite: PropTypes.func.isRequired,
    editRecipe: PropTypes.func.isRequired,
    delRecipe: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    getRecipeItem: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    clearRecipes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  static defaultProps = {
    userInfo: {
      data: {
        id: 1,
        firstName: '',
        lastName: '',
        bio: '',
        email: '',
        country: '',
        avatar: '',
        moniker: ''
      }
    }
  };
  /**
   * Creates an instance of RecipeItem.
   * @param {object} props
   * @memberof RecipeItem
   */
  constructor(props) {
    super(props);
    this.foodImg = null;
    this.state = {
      authInfo: {},
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
      recipeItem: this.props.recipes.recipeItem.recipe ?
        this.props.recipes.recipeItem :
        undefined,
      fetchRecipe: false
    };
    this.delRecipe = this.delRecipe.bind(this);
    this.favIt = this.favIt.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }
  /**
   * Invoked immediately after component is mounted
   *
   * @memberof RecipeItem
   * @returns {void}
   */
  componentDidMount = () => {
    if (!this.props.recipes.recipeItem.success) {
      this.props.getRecipeItem(this.props.match.params.id);
    }
    window.scrollTo(0, 0);
  };

  /**
   * Invoked before a mounted component receives new props.
   *
   * @param {object} nextProps
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  componentWillReceiveProps = nextProps => {
    if (nextProps.recipes.del_recipe && nextProps.recipes.del_recipe.success) {
      this.props.history.push('/catalog');
    }
    this.setState({
      authInfo: nextProps.auth.authInfo,
      fetchRecipe: nextProps.auth.isLoggedIn
    });
    if (nextProps.recipes.updated) {
      update();
      this.setState({
        editRecipeItem: false,
        status: 'fade',
        error: 'd-none'
      });
    }
    if (nextProps.recipes.recipeItem.message) {
      if (nextProps.recipes.recipeItem.message === 'Not found') {
        nextProps.history.push('/NotFound');
      }
      this.setState({
        error: 'd-block',
        editRecipeItem: true
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
      if (userId === this.state.authInfo.userId) {
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
        if (user.userId === this.state.authInfo.userId) {
          return this.setState({
            favoriteStatus: true
          });
        }
        return null;
      });
    }
  };

  /**
   *
   *
   *
   * @memberOf RecipeItem
   *
   * @returns {void}
   */
  componentWillUnmount = () => {
    this.props.clearRecipes();
  };

  /**
   *
   * @param {object} event
   *
   * @memberOf RecipeItem
   *
   * @returns {void}
   */
  deleteRecipeInit(event) {
    event.preventDefault();
  }

  /**
   *redirects a user back to catalog page after deletion
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  delRecipe() {
    this.props.delRecipe(
      this.props.match.params.id,
      this.state.authInfo.userId
    );
  }
  /**
   * Add a recipe to user's favorite list
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  favIt() {
    this.props.setFavorite(this.props.match.params.id);
  }
  /**
   * upvote a recipe
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  upvote() {
    this.props.upvote(this.props.match.params.id);
  }
  /**
   * Downvote a recipe
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  downvote() {
    this.props.downvote(this.props.match.params.id);
  }
  /**
   *
   * edit recipe helper function
   *
   * @param {any} data
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  edited = data => {
    this.props.editRecipe(data, this.props.match.params.id);
  };
  /**
   *
   *
   * @param {event} event
   * @param {string} foodImg
   *
   * @memberof RecipeItem
   *
   * @returns {void}
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
   *
   * @param {event} event
   * @param {string} foodImg
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  goBack = event => {
    event.preventDefault();
    this.setState({ editRecipeItem: false });
    this.props.getRecipeReactions(this.props.match.params.id);
  };
  /**
   *
   * @returns {void}
   *
   * @memberof RecipeItem
   */
  hoverIn = () => {
    this.setState({ status: 'show' });
  };
  /**
   *
   * @returns {void}
   *
   * @memberof RecipeItem
   */
  hoverOut = () => {
    this.setState({ status: 'fade' });
  };
  /**
   * Preview of image
   *
   * @param {any} files
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   */
  handleDrop = files => {
    const [{ preview }] = files;
    this.setState({ preview, files, save: 'show' });
  };

  /**
   * upload image
   *
   * @memberof RecipeItem
   *
   * @returns {void}
   *
   */
  handleImg = () => {
    notify();
    const { files, ingredients } = this.state;
    const file = files[0];
    this.props.uploadImg(file).then(() => {
      this.foodImg = this.props.recipes.uploadedImg;
      // for poor/no internet connection
      if (typeof this.foodImg === 'object') return failedUpdate();
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
   *
   * @returns {JSX.Element} Jsx element
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
          auth={this.props.auth}
        />
      );
    }
    return 'Loading...';
  };
  /**
   * Set a new edit state
   *
   * @returns {void}
   *
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
   * @returns {JSX.Element} render elements
   *
   * @memberof RecipeItem
   */
  render() {
    const { recipeItem, edit, editRecipeItem } = this.state;
    // const x = undefined;
    // if()
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <ToastContainer />
        <DeleteModal confirmDelete={this.delRecipe} />
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
              <EditForm
                handleSubmit={this.handleSubmit}
                goBack={this.goBack}
                state={this.state}
              />
            )}
            {!editRecipeItem && (
              <RecipeIngredients
                ingredients={this.props.recipes.recipeItem}
                data={this.props.userInfo}
              />
            )}
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
          </div>
          <Reviews />
        </section>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  recipes: state.recipes,
  favorite: state.favorite,
  votes: state.votes,
  userInfo: state.user.userInfo,
  review: state.review,
  auth: state.user
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getRecipeItem,
      editRecipe,
      setFavorite,
      upvote,
      uploadImg,
      downvote,
      delRecipe,
      clearRecipes,
      getRecipeReactions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeItem);
