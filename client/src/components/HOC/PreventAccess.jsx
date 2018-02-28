import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAuthenticated } from '../../actions';

const mapStateToProps = state => ({
  auth: state.user
});

const Composer = WrappedComponent => {
  /**
   *
   *
   * @class Authenticate
   * @extends {Component}
   * @param {object} nextProps
   */
  class Authenticate extends Component {
    static propTypes = {
      isAuthenticated: PropTypes.func.isRequired,
      auth: PropTypes.bool.isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };
    componentDidMount = () => {
      this.props.isAuthenticated();
    };

    componentWillReceiveProps = nextProps => {
      if (nextProps.auth) {
        if (nextProps.auth.isLoggedIn) {
          this.props.history.push('/');
        }
      }
    };

    /**
     *
     *
     * @returns {any}
     * render react element
     * @memberOf Authenticate
     */
    render() {
      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  //eslint-disable-next-line
  return connect(mapStateToProps, { isAuthenticated })(
    Authenticate);
};

export default Composer;
