import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';

//actions
import { addRecipe } from '../../actions/recipeActions';

//component
import Navbar from '../../components/Navbar';
import AddRecipeForm from './AddRecipeForm';
import config from '../../config';
/**
 *
 *
 * @class AddRecipe
 * @extends {Component}
 */
class AddRecipe extends Component {
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
    this.handleForm = this.handleForm.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  /**
   *
   *
   * @memberof AddRecipe
   * @returns {any}
   * redirects to the recipe page if success
   */
  sendData() {
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
  }

  /**
   *
   *
   * @param {any} e
   * @returns {any} any new page after form submission
   * @memberof AddRecipe
   */
  handleForm(e) {
    e.preventDefault();
    let data = {
      name: e.target.elements.recipe.value.trim(),
      ingredients: e.target.elements.ingredients.value.trim().toLowerCase(),
      direction: e.target.elements.direction.value.trim(),
      description: e.target.elements.description.value.trim(),
      category: e.target.elements.category.value,
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
  }

  /**
   *
   *
   * @returns {any} jsx
   * @memberof AddRecipe
   */
  render() {
    return (
      <section className="container ">
        <div className="fixed-top">
          {this.state.isLoading ? <Pace color="#e7b52c" height={2} /> : null}
        </div>
        <Navbar className="bg-dark fixed-top" />
        <div className="container">
          <div
            data-aos="fade-up"
            data-duration="1000"
            className="row catalog-wrapper p-0 justify-content-center mt-80"
          >
            <div className="col-lg-6 col-sm-12 text-center AuthInfo">
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
              <h1 className="text-white">Hey there!</h1>
              <h4 className="mt-10 text-white p-10 ">
                “Cooking is not a science but an art, mistakes are okay, messes
                are fine—the pleasure is in the creating and the sharing of the
                result.” ― Lori Pollan
              </h4>
            </div>
            <div className=" col-lg-6 col-md-6 justify-content-center col-sm-12">
              <AddRecipeForm handleForm={this.handleForm} />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  new_recipe: state.recipes
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addRecipe }, dispatch)
});
AddRecipe.propTypes = {
  new_recipe: PropTypes.object,
  history: PropTypes.object,
  addRecipe: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
