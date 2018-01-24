import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import * as actions from '../actions';

// Components
import Navbar from './Navbar';
import CatalogList from './CatalogList';
/**
 *
 *
 * @class Category
 * @extends {Component}
 */
class Category extends Component {
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
        <div className="mt-80 mb-3">
          <div className="container" id="catalog">
            <div className="row justify-content-center catalog-wrapper">
              <CatalogList catalog={this.props.recipes.category} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

Category.propTypes = {
  getCategory: PropTypes.func,
  category: PropTypes.object,
  match: PropTypes.object
};
export default connect(mapStateToProps, actions)(Category);
