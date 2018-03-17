import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAuthenticated, flashMessage } from '../../actions';

export const mapStateToProps = state => ({
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
      auth: PropTypes.object.isRequired,
      flashMessage: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };
    componentWillMount = () => {
      if (!this.props.auth.isLoggedIn) {
        this.props.flashMessage(this.props.location.pathname);
        this.props.history.push('/signin');
      }
    };

    componentWillUpdate = nextProps => {
      if (!nextProps.auth.isLoggedIn) {
        this.props.flashMessage(this.props.location.pathname);
        this.props.history.push('/signin');
      }
    };

    /**
     *
     *
     * @returns {JSX.Element}
     * render react element
     * @memberOf Authenticate
     */
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  //eslint-disable-next-line
  return connect(mapStateToProps, { isAuthenticated, flashMessage })(
    Authenticate);
};

export default Composer;
