import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Actions
import { getFavorite } from '../../actions/favoriteAction';

//components
import Navbar from '../../components/Navbar';
import FavoriteList from './FavoriteList';
import Preloader from '../../components/Preloader';
/**
 *
 *
 * @class Favorites
 * @extends {Component}
 */
export class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.object.isRequired,
    getFavorite: PropTypes.func.isRequired
  };
  /**
   *
   *
   * @memberof Favorites
   * @returns {any} favorite list
   */
  componentDidMount() {
    this.props.getFavorite();
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
        <Preloader />
        <div className="mt-80 mb-3">
          <div className="row catalog-wrapper" id="catalog">
            <div
              data-aos="fade-up"
              data-duration="1000"
              className="row justify-content-center"
            >
              <FavoriteList favorites={this.props.favorites} />
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getFavorite }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
