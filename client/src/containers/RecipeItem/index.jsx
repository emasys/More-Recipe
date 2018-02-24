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
  clearRecipes
} from '../../actions/recipeActions';
import { setFavorite } from '../../actions/favoriteAction';
import { upvote, downvote } from '../../actions/voteActions';
import { uploadImg } from '../../actions';

// components
import Auth from '../../components/auth';
import RecipeIngredients from './Ingredients';
import Reviews from './Reviews';
import Navbar from '../../components/Navbar';
import EditForm from './EditForm';
import GenerateItems from './GenerateRecipeItems';
import Preloader from '../../components/Preloader';
import DeleteModal from './DeleteModal';

//Helper functions
import { update, notify, failedUpdate } from './helperFunctions';
/**
 *
 * @param {object} event
 * @class RecipeItem
 * @extends {Component}
 */
class RecipeItem extends Component {
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
    match: PropTypes.object.isRequired
  };

  static defaultProps = {
    userInfo: {
      data: {
        id: 1,
        firstName: "",
        lastName: "",
        bio: "",
        email: "",
        country: "",
        avatar: "",
        moniker: ""
      }
    }
  }
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
    window.scrollTo(0, 0);
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
      update();
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

  componentWillUnmount = () => {
    this.props.clearRecipes();
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
    document.querySelector('#dislike').classList.toggle('red');
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
   * @param {any} files
   * @memberof RecipeItem
   * @returns {object}
   * upload image
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
    return 'Loading...';
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
        <Preloader />
        <ToastContainer />
        <DeleteModal delRecipe={this.delRecipe} />
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

const mapStateToProps = state => ({
  recipes: state.recipes,
  favorite: state.favorite,
  votes: state.votes,
  userInfo: state.user.userInfo,
  review: state.review
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
      clearRecipes
    },
    dispatch
  )
});

export { RecipeItem as DummyRecipeItem };
export default connect(mapStateToProps, mapDispatchToProps)(RecipeItem);
