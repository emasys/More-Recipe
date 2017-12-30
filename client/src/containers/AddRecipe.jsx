import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
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
      if (this.props.new_recipe.new_recipe.error) {
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
    this.setState({
      isLoading: true
    });
    this.props.addRecipe(data).then(() => {
      this.sendData();
    });
  }

  

  /**
   *
   *
   * @returns {any} jsx
   * @memberof AddRecipe
   */
  render() {
    const { status } = this.state;
    const recipeCategory = categoryList;
    return (
      <section className="container ">
        <div className="fixed-top">
          {this.state.isLoading ? <Pace color="#e7b52c" height={2} /> : null}
        </div>
        <Navbar />
        <div className="row justify-content-center mt-80">
          <div className="catalog-wrapper p-15">
            <form onSubmit={this.handleForm}>
              <ul className="form row">
                <li className="col-lg-6 col-sm-12">
                  <label>Recipe Name</label>
                  <input
                    type="text"
                    name="recipe"
                    required
                    className="col-lg-11 col-sm-12"
                    id="inputRecipe"
                    placeholder="Name of recipe"
                  />
                  <div className="text-danger" id="recipe_error" />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label htmlFor="ingredients" className="col-form-label">
                    Ingredients
                  </label>
                  <textarea
                    placeholder="Add your ingredients and separate with a comma ','"
                    className="col-lg-11 col-sm-12"
                    id="ingredients"
                    rows="4"
                    required
                    name="ingredients"
                  />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label htmlFor="direction">Direction</label>
                  <textarea
                    className="col-lg-11 col-sm-12"
                    placeholder="how to make it happen"
                    id="direction"
                    rows="4"
                    required
                    name="direction"
                  />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="col-lg-11 col-sm-12"
                    placeholder="Tell us about your recipe eg - origin, inspiration"
                    id="description"
                    rows="4"
                    required
                    name="description"
                  />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Category</label>
                  <select
                    name="category"
                    className="col-lg-11 col-sm-12 "
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
                <li className={`col-12 text-center ${status}`}>
                  <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                  <span className="sr-only">Loading...</span>
                </li>
              </ul>
            </form>
          </div>
        </div>
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
