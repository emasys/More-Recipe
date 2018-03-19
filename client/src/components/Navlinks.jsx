import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Extra links in the navbar
 *
 * @param {object} { user }
 * @returns {JSX.Element}
 * render react element into the DOM
 */
const NavLinks = ({ user, logOut }) => {
  if (user.authInfo) {
    const { authInfo: { userId, username }, isLoggedIn } = user;
    if (isLoggedIn) {
      return (
        <div>
          <h6 className="dropdown-header text-center">
            {user ? `Signed in as ${username}` : `loading`}
          </h6>
          <div className="dropdown-divider" />
          <Link className="dropdown-item bold" to={`/profile/${userId}`}>
            Your profile
          </Link>
          <Link className="dropdown-item bold" to="/favorites">
            Your favorites
          </Link>
          <Link className="dropdown-item bold" to="/new">
            Add new recipe
          </Link>
          <div className="dropdown-divider" />
          <Link className="dropdown-item bold" id="logout" onClick={logOut} to="/">
            Logout
          </Link>
        </div>
      );
    } else {
      return (
        <h6>
          <Link id="signIn" className="dropdown-item bold" to="/signin">
            Sign in
          </Link>
          <Link id="signUp" className="dropdown-item bold" to="/signup">
            Sign up
          </Link>
        </h6>
      );
    }
  }
  return 'loading...';
};

NavLinks.propTypes = {
  user: PropTypes.object.isRequired
};
export default NavLinks;
