import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function*/
/**
 *
 *
 * @class Preloader
 * @extends {Component}
 */
class Preloader extends Component {
  /**
   *
   * @returns {bool} loading state
   * @static
   * @memberof Preloader
   */
  static propTypes = {
    isLoading: PropTypes.bool.isRequired
  };
  /**
   *
   *
   * @returns {JSX} renders a react element into DOM
   * @memberof Preloader
   */
  render() {
    console.log(this.props.isLoading);
    return (
      <div className="fixed-top">
        {this.props.isLoading ? <Pace color="#e7b52c" height={2} /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, null)(Preloader);
