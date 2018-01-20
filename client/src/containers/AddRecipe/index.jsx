import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import Fade from 'react-reveal/Fade';
import PropTypes from 'prop-types';

//actions
import * as actions from '../../actions';

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
   * @returns {any}
   * invoked immediately before a component is unmounted and destroyed.
   *
   * @memberof AddRecipe
   */
  componentWillUnmount() {
    this.setState({
      isLoading: false
    });
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
        const { id } = this.props.new_recipe.new_recipe.recipe;
        this.props.history.push(`/recipe/${id}`);
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
        <Fade duration={1000}>
          <div className="row justify-content-center mt-80">
            <div className="col-lg-6 col-sm-12 text-center ">
              <img src="../img/logo.png" alt="logo" />
              <p className=" mt-5 text-dark bg-mirror header-title">
                “Cooking is not a science but an art, mistakes are okay, messes
                are fine—the pleasure is in the creating and the sharing of the
                result.” ― Lori Pollan
              </p>
            </div>
            <div className="catalog-wrapper col-lg-6 col-md-10 col-sm-12">
              <AddRecipeForm handleForm={this.handleForm} />
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  new_recipe: state.recipes
});

AddRecipe.propTypes = {
  new_recipe: PropTypes.object,
  history: PropTypes.object,
  addRecipe: PropTypes.func
};
export default connect(mapStateToProps, actions)(AddRecipe);
