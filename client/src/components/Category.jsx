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
   * Creates an instance of Category.
   * @param {any} props
   * @memberof Category
   */
  constructor(props) {
    super(props);

    this.state = {
      category: undefined,
      showMore: false,
      page_limit: 12,
    };

    this.nextPage = this.nextPage.bind(this);
  }
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
    this.props.getCategory(data, this.state.page_limit);
  }

  /**
   *
   * @returns {any}
   * invoked before a mounted component receives new props.
   * If you need to update the state in response to prop changes
   * (for example, to reset it), you may compare this.props and
   * nextProps and perform state transitions using this.setState()
   * in this method.
   * @param {object} nextProps
   * @memberof Category
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.category.category) {
      this.setState({ category: nextProps.category.category });
      if (nextProps.category.category.recipes.length > 11) {
        this.setState({ showMore: true });
      }
    }
  }
  /**
   *
   *
   * @param {object} nextProps
   * @param {object} nextState
   * @memberof Category
   * @returns {any}
   * invoked immediately before rendering
   * when new props or state are being received.
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.page_limit > this.state.page_limit) {
      const data = {
        category: nextProps.match.params.cat
      };
      this.props.getCategory(data, nextState.page_limit);
    }
  }
/**
   *
   *
   * @memberof Category
   * @returns {any} pagination
   */
  nextPage() {
    this.setState(prevState => ({
      page_limit: prevState.page_limit + 8
    }));
  }
  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof Category
   */
  render() {
    const { showMore } = this.state;
    return (
      <div>
        <Navbar />
        <div className="mt-80 mb-3">
          <div className="container catalog-wrapper" id="catalog">
            <CatalogList catalog={this.state.category} />
            <div className="text-center">
              {showMore && (
                <button
                  className="btn btn-outline-dark hvr-grow-shadow"
                  onClick={this.nextPage}
                >
                  View More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.recipes
});

Category.propTypes = {
  getCategory: PropTypes.func,
  category: PropTypes.object,
  match: PropTypes.object
};
export default connect(mapStateToProps, actions)(Category);
