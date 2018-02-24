import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from './auth';

const logout = () => {
  Auth.logout();
};

const NavLinks = ({ user }) => {
  if (Auth.loggedIn()) {
    return (
      <div>
        <h6 className="dropdown-header text-center">
          {user ? `Signed in as ${user.data.moniker}` : `loading`}
        </h6>
        <div className="dropdown-divider" />
        <Link className="dropdown-item bold" to={`/profile/${Auth.userID()}`}>
          Your profile
        </Link>
        <Link className="dropdown-item bold" to="/favorites">
          Your favorites
        </Link>
        <Link className="dropdown-item bold" to="/new">
          Add new recipe
        </Link>
        <div className="dropdown-divider" />
        <a className="dropdown-item bold" onClick={logout} href="/">
          Logout
        </a>
      </div>
    );
  } else {
    return (
      <h6>
        <Link className="dropdown-item bold" to="/signin">
          Sign in
        </Link>
        <Link className="dropdown-item bold" to="/signup">
          Sign up
        </Link>
      </h6>
    );
  }
};

NavLinks.propTypes = {
  user: PropTypes.object
};
export default NavLinks;
