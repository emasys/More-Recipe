import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { connect } from 'react-redux';
import config from '../config';
import * as actions from '../actions';

//component
import Navbar from '../components/Navbar';
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
      status: 'fade'
    };
    this.handleForm = this.handleForm.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  /**
   *
   *
   * @memberof AddRecipe
   * @returns {any} new recipe
   */
  sendData() {
    if (this.props.new_recipe.new_recipe) {
      if (this.props.new_recipe.new_recipe.recipe) {
        const { id } = this.props.new_recipe.new_recipe.recipe;
        this.props.history.push(`/recipe/${id}`);
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
      ingredients: e.target.elements.ingredients.value.trim(),
      direction: e.target.elements.direction.value.trim(),
      description: e.target.elements.description.value.trim(),
      category: e.target.elements.category.value
    };

    const { files } = this.state;
    if (!files) {
      let errorMessage = document.querySelector('#no_image');
      errorMessage.innerHTML = 'An Image of the finished meal is required';
      return errorMessage;
    }

    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      document.querySelector('#no_image').innerHTML = '';
      this.setState({
        status: 'show'
      });
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `morerecipe`);
      formData.append('upload_preset', config.UPLOAD_PRESET);
      formData.append('api_key', config.API_KEY);
      formData.append('timestamp', (Date.now() / 1000) | 0);

      return axios
        .post('https://api.cloudinary.com/v1_1/emasys/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(response => {
          const resdata = response.data;
          data.foodImg = resdata.secure_url;
        });
    });

    axios.all(uploaders).then(() => {
      // perform after upload is successful operation
      // console.log('upload complete');
      this.props.addRecipe(data).then(() => {
        this.sendData();
      });
    });
  }

  /**
   *
   *
   * @param {any} files
   * @memberof AddRecipe
   * @returns {object} a preview of image
   */
  handleDrop(files) {
    const [{ preview }] = files;
    this.setState({ preview, files });
  }

  /**
   *
   *
   * @returns {any} jsx
   * @memberof AddRecipe
   */
  render() {
    const { preview, status } = this.state;
    const recipeCategory = [
      'Breakfast',
      'Brunch',
      'Lunch',
      'Snacks',
      'Appetisers',
      'Dinner',
      'Soups',
      'Noodles',
      'Rice',
      'Pasta',
      'Meat',
      'Poultry',
      'Seafood',
      'Vegetarian',
      'Sides',
      'Sauces',
      'Baking',
      'Desserts',
      'Drinks',
      'Salads'
    ];
    return (
      <section className="container ">
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

                <li className=" col-lg-6 col-sm-12">
                  <div className="col-lg-11 col-sm-12">
                    <Dropzone
                      onDrop={this.handleDrop}
                      accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                      multiple={false}
                      className=" p-10 text-center dropzone bg-light"
                    >
                      Drag a file here or click to upload an image of your food
                    </Dropzone>
                  </div>
                  <div className="text-danger" id="no_image" />
                </li>
                <li className="special col-lg-6 col-sm-12">
                  {preview && (
                    <img
                      src={preview}
                      className="col-lg-11 col-sm-12"
                      alt="image preview"
                    />
                  )}
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
