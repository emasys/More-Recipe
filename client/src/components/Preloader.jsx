import React from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';

// /* eslint-disable react/prefer-stateless-function*/
/**
 *
 *
 * @class Preloader
 * @extends {Component}
 */
const Preloader = ({ isLoading }) => (
  <div className="fixed-top">
    {isLoading ? <Pace color="#e7b52c" height={2} /> : null}
  </div>
);

Preloader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, null)(Preloader);
