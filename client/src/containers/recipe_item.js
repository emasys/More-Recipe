import React, { Component } from 'react';
import { getRecipeItem, setFavorite } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// components
import RecipeItems from '../components/recipe_item_image';
import RecipeIngredients from '../components/recipe_ingredients';
import Reviews from '../components/reviews';
// import Test from '../components/test';

class Recipe_item extends Component {
  componentDidMount() {
    this.props.getRecipeItem(this.props.match.params.id);
  }

  setFav() {
    this.props.setFavorite(this.props.match.params.id);
  }

  render() {
    return (
      <section className="container">
        <div className="row justify-content-center recipe-item-section">
          <RecipeItems reactions={this.props.recipes.recipeItem} />
          <RecipeIngredients ingredients={this.props.recipes.recipeItem} />
        </div>
        <Reviews id={this.props.match.params.id} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.recipes
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getRecipeItem, setFavorite }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipe_item);
