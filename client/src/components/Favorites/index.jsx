import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import * as actions from '../../actions';

//components
import Navbar from '../Navbar';
import FavoriteList from './FavoriteList';
/**
 *
 *
 * @class Favorites
 * @extends {Component}
 */
export class Favorites extends Component {
  /**
   *
   *
   * @memberof Favorites
   * @returns {any} favorite list
   */
  componentDidMount() {
    this.props.getFavs();
  }
  /**
   *
   *
   * @returns {any} jsx
   * @memberof Favorites
   */
  render() {
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <div className="mt-80 mb-3">
          <div className="container catalog-wrapper" id="catalog">
            <div className="row justify-content-center">
              <FavoriteList favorites = {this.props.favorites} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorite
});

export default connect(mapStateToProps, actions)(Favorites);
