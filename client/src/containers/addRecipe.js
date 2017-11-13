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
    const data = {
      name: e.target.elements.recipe.value,
      ingredients: e.target.elements.ingredients.value,
      direction: e.target.elements.direction.value,
      description: e.target.elements.description.value,
      category: e.target.elements.category.value
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
          <div className="col-lg-4 col-sm-12 form-items p-5">
            <form onSubmit={this.handleForm}>
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
