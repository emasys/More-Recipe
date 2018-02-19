import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        <div className="mt-80 mb-3 p-15">
          <div className="catalog-wrapper" id="catalog">
            <div className="row">
              <div className="col-12 ">
                <div className="clearfix" style={{ zIndex: 700 }}>
                  <h4 className="float-left header-title">
                    {this.props.match.params.cat}
                  </h4>
                  <h5 className="float-right">
                    <Link
                      to="/catalog"
                      className="btn btn-dark hvr-icon-wobble-horizontal"
                    >
                      see all recipes{` `}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
            <CatalogList
              {...this.props}
              showDeleteBtn={false}
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
