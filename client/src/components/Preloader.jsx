import React from 'react';
import { connect } from 'react-redux';
import Pace from 'react-pace-progress';
import PropTypes from 'prop-types';

/**
 * Render preloader bar when needed
 *
 * @param {any} { isLoading }
 *
 * @returns {JSX.Element} React element
 */
export const Preloader = ({ isLoading }) => (
  <div className="fixed-top">
    {isLoading ? <Pace color="#f5b339" height={4} /> : null}
  </div>
);

Preloader.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
export const mapStateToProps = state => ({
  isLoading: state.isLoading
});

export default connect(mapStateToProps, null)(Preloader);
