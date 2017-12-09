import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addRecipe } from '../actions';
import Dropzone from 'react-dropzone';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import axios from 'axios';
import config from '../config';

//component
import Navbar from '../components/Navbar';

class AddRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = { preview: null, files: null, fileURL: null, status: 'fade' };
    this.handleForm = this.handleForm.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDropRejected = this.handleDropRejected.bind(this);
    // this.uploadWidget = this.uploadWidget.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  sendData(e) {}
  handleForm(e) {
    e.preventDefault();
    let data = {
      name: e.target.elements.recipe.value.trim(),
      ingredients: e.target.elements.ingredients.value.trim(),
      direction: e.target.elements.direction.value.trim(),
      description: e.target.elements.description.value.trim(),
      category: e.target.elements.category.value,
    };
    this.setState({
      status: 'show',
    });
    const { files } = this.state;
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `morerecipe`);
      formData.append('upload_preset', config.UPLOAD_PRESET);
      formData.append('api_key', config.API_KEY);
      formData.append('timestamp', (Date.now() / 1000) | 0);

      return axios
        .post('https://api.cloudinary.com/v1_1/emasys/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const resdata = response.data;
          data.foodImg = resdata.secure_url;
        });
    });

    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation

      // console.log('upload complete');
      this.props.addRecipe(data).then(() => {
        this.componentDidUpdate();
      })
    });
  }
  componentDidUpdate() {
    if (this.props.new_recipe.new_recipe) {
      if (this.props.new_recipe.new_recipe.recipe) {
        const id = this.props.new_recipe.new_recipe.recipe.id;
        this.props.history.push(`/recipe/${id}`);
      }
    }
  }
  handleDrop(files) {
    const [{ preview }] = files;
    // console.log(files);
    this.setState({ preview, files });
  }
  handleDropRejected(...args) {
    return console.log('reject', args);
  }

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
      'Salads',
      'Sides',
      'Sauces',
      'Baking',
      'Desserts',
      'Drinks',
    ];
    // console.log(recipeCategory);

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
                      onDropRejected={this.handleDropRejected}
                      className=" p-10 text-center dropzone bg-light"
                    >
                      Drag a file here or click to upload an image of your food
                    </Dropzone>
                  </div>
                </li>
                <li className="special col-lg-6 col-sm-12">
                  {preview && (
                    <img src={preview} className="col-lg-11 col-sm-12" alt="image preview" />
                  )}
                </li>
                <li className="special col-lg-6 col-sm-12">
                  <label>Category</label>
                  <select name="category" className="col-lg-11 col-sm-12 ">
                    {recipeCategory.map((item, ) => {
                      return (
                        <option value={item} key={item} className="text-capitalize">
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </li>
                <li className=" col-12 ">
                  <input type="submit" value="Submit" id="submit" className="bg-dark btn hovered" />
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

const mapStateToProps = state => {
  // console.log(state);
  return {
    new_recipe: state.new_recipe,
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ addRecipe }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);
