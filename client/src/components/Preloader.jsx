import React from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';

/**
 *
 *
 * @class Preloader
 * @extends {Component}
 */
const Preloader = ({ isLoading }) => (
  <div className="fixed-top">
    {isLoading ? <Pace color="#f5b339" height={4} /> : null}
  </div>
);

Preloader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, null)(Preloader);
