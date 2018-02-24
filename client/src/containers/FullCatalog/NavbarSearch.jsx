import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// Components
import Auth from '../../components/auth';
import config from '../../config/index';
import Navlinks from '../../components/Navlinks';

const NavbarSearch = props => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark bg-navbar">
    <div className="container">
      <Link className="navbar-brand bolder text-orange" to="/">
        MoreRecipes
      </Link>

      <form
        onSubmit={props.onSearch}
        className=" col-lg-9 col-md-9 col-sm-9 text-center p-0 m-0"
      >
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          onChange={props.onChanged}
          placeholder="search by ingredients or recipe title"
        />
      </form>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars fa-2x text-orange" aria-hidden="true" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav">
          {Auth.loggedIn() ? (
            <li className="nav-item ">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/new"
                data-tip="Add new recipe"
              >
                <i
                  className="material-icons fa-2x d-sm-none d-lg-inline"
                  aria-hidden="true"
                >
                  add_to_photos
                </i>
                <span className="d-lg-none" style={{ verticalAlign: 'top' }}>
                  Add new recipe
                </span>
              </NavLink>
            </li>
          ) : (
            ''
          )}
          <li className="nav-item ">
            <NavLink
              className="nav-link"
              activeClassName="active"
              to="/catalog"
              data-tip="Catalog"
            >
              <i
                className="material-icons fa-2x  d-sm-none d-lg-inline"
                aria-hidden="true"
              >
                &#xE8EF;
              </i>
              <span className="d-lg-none" style={{ verticalAlign: 'top' }}>
                Catalog
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link "
              activeClassName="active"
              to="/favorites"
              data-tip="Your favorites"
            >
              <i className="material-icons fa-2x red d-sm-none d-lg-inline">
                &#xE87D;
              </i>
              <span className="d-lg-none" style={{ verticalAlign: 'top' }}>
                Favorites
              </span>{' '}
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            {Auth.loggedIn() ? (
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={props.avatar || config.DEFAULT_DISPLAY_PICTURE}
                  alt="avi"
                  className="fa-2x img-icon rounded-circle"
                />
              </a>
            ) : (
              <a
                className="nav-link "
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="material-icons fa-2x">&#xE853;</i>
              </a>
            )}
            <div
              className="dropdown-menu dropdown-menu-right custom-dropdown"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <Navlinks user={props.user} />
            </div>
          </li>
        </ul>
        <ReactTooltip place="bottom" type="dark" effect="float" />
      </div>
    </div>
  </nav>
);

NavbarSearch.propTypes = {
  user: PropTypes.object.isRequired,
  avatar: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onChanged: PropTypes.func.isRequired
};

NavbarSearch.defaultProps = {
  avatar: 'someurl'
};

export default NavbarSearch;
