import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRecipe } from '../actions';

class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.handleForm = this.handleForm.bind(this);
  }
  handleForm(e) {
    e.preventDefault();
    const file = document.querySelector('input[type=file]').files[0];

    const data = {
      name: e.target.elements.recipe.value,
      ingredients: e.target.elements.ingredients.value,
      direction: e.target.elements.direction.value,
      description: e.target.elements.description.value,
      category: e.target.elements.category.value,
      foodImg: file
    };
    this.props.addRecipe(data);
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    if (this.props.new_recipe.new_recipe) {
      if (this.props.new_recipe.new_recipe.recipe) {
        const id = this.props.new_recipe.new_recipe.recipe.id;
        this.props.history.push(`/recipe/${id}`);
      }
    }
  }
  render() {
    return (
      <section className="container ">
        <div className="row justify-content-center">
          <div className="catalog-wrapper p-15">
            {/* <form onSubmit={this.handleForm}>
              <div className="form-row">
                <div className="form-group col-12">
                  <label htmlFor="inputRecipe" className="col-form-label">
                    Recipe Name
                  </label>
                  <input
                    type="text"
                    name="recipe"
                    className="form-control"
                    id="inputRecipe"
                    placeholder="Name of recipe"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="ingredients" className="col-form-label">
                    Ingredients
                  </label>
                  <textarea
                    placeholder="Add your ingredients and separate with a comma ','"
                    className="form-control"
                    id="ingredients"
                    rows="4"
                    name="ingredients"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="direction">Direction</label>
                  <textarea
                    className="form-control"
                    placeholder="how to make it happen"
                    id="direction"
                    rows="4"
                    name="direction"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Tell us about the food"
                    id="description"
                    rows="4"
                    name="description"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="category" className="col-form-label">
                    Category
                  </label>
                  <select
                    className="form-control custom-select"
                    id="editable-select"
                    name="category"
                  >
                    <option value="vegetarian">Vegetarian</option>
                    <option value="others">Add yours</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="file" className="col-form-label">
                    Upload Image
                  </label>
                  <label className="custom-file">
                    <input
                      type="file"
                      id="file"
                      className="custom-file-input"
                    />
                    <span className="custom-file-control" />
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-dark btn-block">
                Add New Recipe
              </button>
            </form> */}
            <form onSubmit={this.handleForm}>
              <ul className="form row">
                <li className="col-lg-6 col-sm-12">
                  <label>Recipe Name</label>
                  <input
                    type="text"
                    name="recipe"
                    className="col-lg-11 col-sm-12"
                    id="inputRecipe"
                    placeholder="Name of recipe"
                  />
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
                    name="direction"
                  />
                </li>
                <li className="col-lg-6 col-sm-12">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="col-lg-11 col-sm-12"
                    placeholder="how to make it happen"
                    id="description"
                    rows="4"
                    name="description"
                  />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Category</label>
                  <select name="category" className="col-lg-11 col-sm-12 ">
                    <option value="vegetarian">Vegetarian</option>
                    <option value="others">Add yours</option>
                  </select>
                </li>

                <li className=" col-lg-6 col-sm-12">
                  <label>Upload Image</label>
                  <input
                    type="file"
                    name="foodImg"
                    id="foodImg"
                    className="btn btn-dark"
                  />
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
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    new_recipe: state.new_recipe
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addRecipe }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
