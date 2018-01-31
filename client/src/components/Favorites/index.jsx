import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Pace from 'react-pace-progress';

// Actions
import { getFavs } from '../../actions/favoriteAction';

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
        <div className="fixed-top">
          {this.props.netReq && <Pace color="#e7b52c" height={2} />}
        </div>
        <div className="mt-80 mb-3">
          <div className="row catalog-wrapper" id="catalog">
            <div data-aos="fade-up" data-duration="1000" className="row justify-content-center">
              <FavoriteList favorites={this.props.favorites} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorite,
  netReq: state.netReq
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getFavs }, dispatch)
});

Favorites.propTypes = {
  favorites: PropTypes.object,
  getFavs: PropTypes.func,
  netReq: PropTypes.bool
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
