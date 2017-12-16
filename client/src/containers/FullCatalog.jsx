import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import * as actions from '../actions';
import Auth from '../components/auth';

//component
import CatalogList from '../components/CatalogList';

const fadeAnimation = {
  transitionName: "fade",
  transitionAppear: true,
  transitionAppearTimeout: 500,
  transitionEnter: true,
  transitionEnterTimeout: 500,
  transitionLeave: true,
  transitionLeaveTimeout: 500
};

const propTypes = {
  recipes: PropTypes.objectOf({
    allRecipes: PropTypes.array
  }),
  user: PropTypes.array,
  getRecipes: PropTypes.func,
  searchRecipes: PropTypes.func,
  getProfile: PropTypes.func,
  // allRecipes
};
/**
 *
 * @class FullCatalog
 * @extends {Component}
 */
class FullCatalog extends Component {
  /**
   * Creates an instance of FullCatalog.
   * @param {any} props
   * @memberof FullCatalog
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      All_recipes: '',
      page_limit: 12,
    };

    this.searchBar = this.searchBar.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.navLinks = this.navLinks.bind(this);
    this.logout = this.logout.bind(this);
  }
  /**
 *
 *
 * @memberof FullCatalog
 * @returns {any} react lifecycle method
 */
  componentDidMount() {
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID());
    }
    this.props.getRecipes(this.state.page_limit);
  }
/**
 *
 *
 * @memberof FullCatalog
 * @param {any} nextProps
 * @returns {any} updated props
 *
 */
componentWillReceiveProps = (nextProps) => {
  if (nextProps.recipes.search) {
    return (this.setState({
      All_recipes: nextProps.recipes.search
    }));
  }
  return (this.setState({
    All_recipes: nextProps.recipes.allRecipes
  }));
}

  /**
 *
 *
 * @param {any} event
 * @memberof FullCatalog
 * @returns {any} search for recipes
 */
onSearch(event) {
  event.preventDefault();
  const data = { query: this.state.search };
  this.props.searchRecipes(data);
  this.setState({
    All_recipes: this.props.recipes.search
  });
}

  /**
   *
   *
   * @param {any} event
   * @memberof FullCatalog
   * @returns {any} onChange event for the search bar
   */
searchBar(event) {
  this.setState({
    search: event.target.value,
  });
  if (event.target.value.length < 1) {
    this.setState({
      All_recipes: this.props.recipes.allRecipes,
    });
  }
}

  /**
 *
 *
 * @memberof FullCatalog
 * @returns {any} pagination
 */
nextPage() {
  this.setState(prevState => ({
    page_limit: prevState.page_limit + 12,
  }));
}
  /**
 *
 *
 * @memberof FullCatalog
 * @returns {any} log's a user out
 */
logout() {
  Auth.logout();
  this.setState({
    page_limit: 12,
  });
}
  /**
 *
 *
 * @returns {any} some navbar links
 * @memberof FullCatalog
 */
navLinks() {
  if (Auth.loggedIn()) {
    return (
      <h6>
        <Link className="dropdown-item" to={`/profile/${Auth.userID()}`}>
          <i className="fa fa-user-circle" aria-hidden="true" />
          {` `}
            Profile
        </Link>
        <a className="dropdown-item" onClick={this.logout} href="/">
          <i className="fa fa-sign-out" aria-hidden="true" />
          {` `}
            Logout
        </a>
      </h6>
    );
  } else {
    return (
      <h6>
        <Link className="dropdown-item" to="/signin">
          <i className="fa fa-sign-in" aria-hidden="true" />
          {` `}
            Sign in
        </Link>
        <Link className="dropdown-item" to="/signup">
          <i className="fa fa-user-plus" aria-hidden="true" />
          {` `}
            Sign up
        </Link>
      </h6>
    );
  }
}
  /**
 *
 *
 * @returns {any} renders jsx elements
 * @memberof FullCatalog
 */
render() {
  const { search } = this.state;
  return (
    <div>
      <section className="container-fluid fixed">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark bg-navbar">
          <div className="container">
            <Link className="navbar-brand bolder text-orange" to="/">
                MoreRecipes
            </Link>

            <form
              onSubmit={this.onSearch}
              className=" col-lg-9 col-md-9 col-sm-9 text-center p-0 m-0"
            >
              <input
                type="search"
                name="search"
                value={search}
                onChange={this.searchBar}
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
              <i className="fa fa-bars text-orange" aria-hidden="true" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                {Auth.loggedIn() ? (
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light"
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
                      <span className="d-lg-none">Add new recipe</span>
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}
                <li className="nav-item ">
                  <NavLink className="nav-link text-light" activeClassName="active" to="/catalog">
                    <i className="material-icons fa-2x  d-sm-none d-lg-inline" aria-hidden="true">
                        &#xE8EF;
                    </i>
                    <span className="d-lg-none">Catalog</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link " activeClassName="active" to="/favorites">
                    <i className="material-icons fa-2x red d-sm-none d-lg-inline">&#xE87D;</i>
                    <span className="d-lg-none text-white">Favorites</span>{' '}
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  {Auth.loggedIn() ? (
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        src={
                          this.props.user ?
                            this.props.user.data.avatar :
                            'icon.svg'
                        }
                        alt="avatar"
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
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    {this.navLinks()}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
      <section className="container" id="catalog">
        <div className="catalog-wrapper">
          <CSSTransitionGroup {...fadeAnimation}>
            <CatalogList catalog={this.state.All_recipes} />
          </CSSTransitionGroup>
          <div className="text-center">
            <button className="btn btn-outline-dark hvr-grow-shadow" onClick={this.nextPage}>
                View More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
}
const mapStateToProps = state => ({ recipes: state.recipes, user: state.signin.userProfile });


FullCatalog.PropTypes = propTypes;
export default connect(mapStateToProps, actions)(FullCatalog);
