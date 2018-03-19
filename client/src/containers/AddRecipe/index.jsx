import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { addRecipe } from '../../actions/recipeActions';

//component
import Navbar from '../../components/Navbar';
import AddRecipeForm from './AddRecipeForm';
import config from '../../config';

/**
 *
 * @class AddRecipe
 *
 * @extends {Component}
 */
export class AddRecipe extends Component {
  static propTypes = {
    new_recipe: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addRecipe: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
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
      required: false,
      nameConflict: false,
      buttonDisplay: true
    };
  }

  /**
   * @returns {void}
   *
   *
   * @memberOf AddRecipe
   */
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  /**
   * @param {object} nextProps
   *
   * @returns {void}
   *
   * @memberOf AddRecipe
   */
  componentWillReceiveProps = nextProps => {
    if (nextProps.isLoading) {
      this.setState({
        buttonDisplay: false
      });
    } else {
      this.setState({
        buttonDisplay: true
      });
    }
    if (nextProps.new_recipe.new_recipe) {
      if (nextProps.new_recipe.new_recipe.recipe) {
        const { userId } = nextProps.new_recipe.new_recipe.recipe;
        nextProps.history.push(`/profile/${userId}`);
        this.setState({
          nameConflict: false
        });
      }
      if (nextProps.new_recipe.new_recipe.error) {
        this.setState({
          nameConflict: true
        });
      }
    }
  };

  /**
   * clear error messages on field focus
   *
   * @returns {void}
   *
   * @memberOf AddRecipe
   */
  onFocused = () => {
    this.setState({
      nameConflict: false,
      required: false
    });
  };
  /**
   * Handle edit form
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf AddRecipe
   */
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
    if (data.name && data.description && data.direction && data.ingredients) {
      this.props.addRecipe(data);
    } else {
      this.setState({
        required: true
      });
    }
  };

  /**
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof AddRecipe
   */
  render() {
    return (
      <section className="container ">
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
            <AddRecipeForm
              handleForm={this.handleForm}
              onFocus={this.onFocused}
              state={this.state}
            />
          </div>
        </div>
      </section>
    );
  }
}

export const mapStateToProps = state => ({
  new_recipe: state.recipes,
  auth: state.user,
  isLoading: state.isLoading
});

export default connect(mapStateToProps, { addRecipe })(AddRecipe);
