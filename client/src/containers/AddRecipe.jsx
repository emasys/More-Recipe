import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import Fade from 'react-reveal/Fade';
import Textarea from "react-textarea-autosize";

//actions
import * as actions from '../actions';

//component
import Navbar from '../components/Navbar';
import categoryList from '../components/categoryList';
import config from '../config';
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
    console.log(this.props.new_recipe);
    if (this.props.new_recipe.new_recipe) {
      if (this.props.new_recipe.new_recipe.recipe) {
        const { id } = this.props.new_recipe.new_recipe.recipe;
        this.props.history.push(`/recipe/${id}`);
      }
      if (this.props.new_recipe.new_recipe.data.error) {
        this.setState({
          isLoading: false
        });
        document.querySelector('#recipe_error').innerHTML =
          'You have already posted this recipe';
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
      document.querySelector('#ing_error').innerHTML =
      'This field is required';
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
    const recipeCategory = categoryList;
    return (
      <section className="container ">
        <div className="fixed-top">
          {this.state.isLoading ? <Pace color="#e7b52c" height={2} /> : null}
        </div>
        <Navbar />
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
              <form onSubmit={this.handleForm}>
                <ul className="form row p-3">
                  <li className="col-12">
                    <label>Recipe Name</label>
                    <input
                      type="text"
                      name="recipe"
                      required
                      className="col-12"
                      id="inputRecipe"
                      placeholder="Name of recipe"
                    />
                    <div className="text-danger" id="recipe_error" />
                  </li>
                  <li className="col-12">
                    <label htmlFor="ingredients" className="col-form-label">
                      Ingredients
                    </label>
                    <Textarea
                      placeholder="Add your ingredients and separate with a comma ','"
                      className="col-12"
                      id="ingredients"
                      minRows={1}
                      maxRows={10}
                      required
                      name="ingredients"
                    />
                    <div className="text-danger" id="ing_error" />
                  </li>
                  <li className="col-12">
                    <label htmlFor="direction">Direction</label>
                    <Textarea
                      className="col-12"
                      placeholder="how to make it happen"
                      id="direction"
                      minRows={3}
                      maxRows={20}
                      required
                      name="direction"
                    />
                    <div className="text-danger" id="direction_error" />
                  </li>
                  <li className="col-12">
                    <label htmlFor="description">Description</label>
                    <Textarea
                      className="col-12"
                      placeholder="a short description of your recipe"
                      id="description"
                      minRows={3}
                      maxRows={20}
                      required
                      name="description"
                    />
                    <div className="text-danger" id="description_error" />
                  </li>
                  <li className="special col-12">
                    <label>Category</label>
                    <select
                      name="category"
                      className="col-12 "
                      style={{ height: '50px' }}
                    >
                      {recipeCategory.map(item => (
                        <option
                          value={item}
                          key={item}
                          className="text-capitalize"
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className=" col-12 ">
                    <input
                      type="submit"
                      value="Submit"
                      id="submit"
                      className="bg-dark btn hovered"
                    />
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

const mapStateToProps = state =>
  // console.log(state);
  ({
    new_recipe: state.recipes
  });
export default connect(mapStateToProps, actions)(AddRecipe);
