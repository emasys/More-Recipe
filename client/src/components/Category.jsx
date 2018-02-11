import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Action
import { getCategory } from '../actions/recipeActions';

// Components
import Navbar from './Navbar';
import CatalogList from './CatalogList';
import Preloader from '../components/Preloader';
/**
 *
 *
 * @class Category
 * @extends {Component}
 */
export class Category extends Component {
  /**
   *
   *
   * @memberof Category
   * @returns {any} page
   */
  componentDidMount() {
    const data = {
      category: this.props.match.params.cat
    };
    this.props.getCategory(data);
  }
  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof Category
   */
  render() {
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <Preloader />
        <div className="mt-80 mb-3">
          <div className="container catalog-wrapper" id="catalog">
            <CatalogList
              {...this.props}
              showDeleteBtn
              catalog={this.props.recipes.category}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getCategory }, dispatch)
});

Category.propTypes = {
  getCategory: PropTypes.func,
  category: PropTypes.object,
  match: PropTypes.object,
  recipes: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
