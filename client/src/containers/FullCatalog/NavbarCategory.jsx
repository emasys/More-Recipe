import React from 'react';
import PropTypes from 'prop-types';

/**
 * Navbar with category dropdown menu
 *
 * @param {any} props
 *
 * @returns {void}
 */
const NavbarCategory = props => (
  <div>
    <ul className="nav justify-content-center">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={props.dropdownCtrl}
        >
          <i className="fa fa-th" aria-hidden="true" /> categories
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fa fa-sort-amount-asc" aria-hidden="true" /> sort by
        </a>
        <div className="dropdown-menu custom-dropdown-menu">
          <a href="#" className="dropdown-item" onClick={props.recentlyAdded}>
            Recently Added
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item" onClick={props.mostUpvoted}>
            Most Upvoted
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item" onClick={props.mostFavorited}>
            Most Favorited
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item" onClick={props.mostViewed}>
            Most Viewed
          </a>
        </div>
      </li>
    </ul>
  </div>
);

NavbarCategory.propTypes = {
  mostViewed: PropTypes.func.isRequired,
  mostFavorited: PropTypes.func.isRequired,
  mostUpvoted: PropTypes.func.isRequired,
  recentlyAdded: PropTypes.func.isRequired,
  dropdownCtrl: PropTypes.func.isRequired
};

export default NavbarCategory;
