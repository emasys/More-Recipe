import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

//actions
import { addRecipe } from '../../actions/recipeActions';

//component
import Navbar from '../../components/Navbar';
import AddRecipeForm from './AddRecipeForm';
import config from '../../config';
import Preloader from '../../components/Preloader';

/**
 *
 *@param {object} event
 * @class AddRecipe
 * @extends {Component}
 */
class AddRecipe extends Component {
  static propTypes = {
    new_recipe: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addRecipe: PropTypes.func.isRequired
  };

  /**
   * Creates an instance of AddRecipe.
   * @param {any} props
   * @memberof AddRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      preview: null,
      files: null,
      fileURL: null,
      status: 'fade',
      isLoading: false
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  /**
   *
   *
   * @memberof AddRecipe
   * @returns {any}
   * redirects to the recipe page if success
   */
  sendData = () => {
    if (this.props.new_recipe.new_recipe) {
      if (this.props.new_recipe.new_recipe.recipe) {
        const { userId } = this.props.new_recipe.new_recipe.recipe;
        this.props.history.push(`/profile/${userId}`);
      }
      if (this.props.new_recipe.new_recipe.data) {
        if (this.props.new_recipe.new_recipe.data.error) {
          this.setState({
            isLoading: false
          });
          document.querySelector('#recipe_error').innerHTML =
            'You have already posted this recipe';
        }
      }
    }
  };

  handleForm = event => {
    event.preventDefault();
    let data = {
      name: event.target.elements.recipe.value.trim(),
      ingredients: event.target.elements.ingredients.value.trim().toLowerCase(),
      direction: event.target.elements.direction.value.trim(),
      description: event.target.elements.description.value.trim(),
      category: event.target.elements.category.value,
      foodImg: config.DEFAULT_FOOD_IMG
    };
    if (!data.name) {
      document.querySelector('#recipe_error').innerHTML =
        'This field is required';
    }
    if (!data.ingredients) {
      document.querySelector('#ing_error').innerHTML = 'This field is required';
    }
    if (!data.direction) {
      document.querySelector('#direction_error').innerHTML =
        'This field is required';
    }
    if (!data.description) {
      document.querySelector('#description_error').innerHTML =
        'This field is required';
    }
    if (data.name && data.description && data.direction && data.ingredients) {
      this.setState({
        isLoading: true
      });
      this.props.addRecipe(data).then(() => {
        this.sendData();
      });
    }
  };

  /**
   *
   *
   * @returns {any} jsx
   * @memberof AddRecipe
   */
  render() {
    return (
      <section className="container ">
        <Preloader />
        <Navbar className="bg-dark fixed-top" />
        <div
          data-aos="fade-up"
          data-duration="1000"
          className="row p-0 justify-content-center mt-80"
        >
          <div className=" catalog-wrapper col-lg-6 col-md-9 p-0">
            <div className="col-12 text-center AuthInfo">
              <img
                src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
                alt="logo"
                width="200"
                height="200"
                className="mt-30"
                data-aos="flip-right"
                data-aos-delay="1000"
                data-dos-duration="1000"
              />
              <h3 className="text-white">
                Hey {this.props.auth.authInfo.username}
              </h3>
              <h4 className="mt-10 text-white p-10 ">
                “Cooking is not a science but an art, mistakes are okay, messes
                are fine—the pleasure is in the creating and the sharing of the
                result.” ― Lori Pollan
              </h4>
            </div>
            <AddRecipeForm handleForm={this.handleForm} />
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  new_recipe: state.recipes,
  auth: state.user
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addRecipe }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
