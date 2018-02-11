import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

// actions
import { getProfile } from '../actions/userActions';

// components
import Auth from './auth';
import Navlinks from './Navlinks';
import config from '../config';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
export class Navbar extends Component {
  /**
   * Creates an instance of Navbar.
   * @param {any} props
   * @memberof Navbar
   */
  constructor(props) {
    super(props);

    this.state = {
      avatar: null
    };
  }
  /**
   *
   *
   * @memberof Navbar
   * @returns {any}
   * invoked immediately after a component is mounted
   */
  componentDidMount() {
    console.log(this.props.user);
    if (Auth.userID() && !this.props.user) {
      this.props.getProfile(Auth.userID());
    }
  }
  /**
   *
   * @returns {any}
   * invoked before a mounted component receives new props.
   * @param {any} nextProps
   * @memberof Navbar
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: nextProps.user.data.avatar
    });
  }

  get avatar(){
    if(this.props.user){
      return this.props.user.data.avatar
    }
  }
  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof Navbar
   */
  render() {
    console.log("avatar =====>",this.Avatar);
    const { avatar } = this.state;
    return (
      <section className="container-fluid m-0 p-0">
        <nav
          data-aos="flip-up"
          className={`navbar navbar-expand-lg navbar-dark ${
            this.props.className
          }`}
          style={{ zIndex: 1000 }}
        >
          <div className="container">
            <Link className="navbar-brand bolder ml-3 text-orange" to="/">
              <span className="nb">More Recipes</span>
            </Link>
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
                <li>
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Search for recipes"
                  >
                    <i className="material-icons fa-2x d-none d-lg-inline">
                      &#xE8B6;
                    </i>
                    <span className="d-lg-none pl-3">Search</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    activeClassName="active"
                    to="/catalog"
                    data-tip="Catalog"
                  >
                    <i
                      className="material-icons fa-2x  d-none d-lg-inline"
                      aria-hidden="true"
                    >
                      &#xE8EF;
                    </i>
                    <span className="d-lg-none pl-3">Catalog</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link "
                    activeClassName="active"
                    to="/favorites"
                    data-tip="Your favorites"
                  >
                    <i className="material-icons fa-2x red d-none d-lg-inline">
                      &#xE87D;
                    </i>
                    <span className="d-lg-none pl-3">Favorites</span>
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
                        src={this.avatar || config.DEFAULT_DISPLAY_PICTURE}
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
                    <Navlinks user={this.props.user} />
                  </div>
                </li>
              </ul>
              <ReactTooltip place="bottom" type="dark" effect="float" />
            </div>
          </div>
        </nav>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.userProfile
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getProfile }, dispatch)
});
Navbar.propTypes = {
  user: PropTypes.object,
  getProfile: PropTypes.func,
  className: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
