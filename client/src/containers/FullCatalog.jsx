import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import * as actions from '../actions';
import categoryList from '../components/categoryList';

//component
import CatalogList from '../components/CatalogList';
import Auth from '../components/auth';

const fadeAnimation = {
  transitionName: 'fade',
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
  getProfile: PropTypes.func
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
      avatar: null,
      showMore: false
    };

    this.searchBar = this.searchBar.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.navLinks = this.navLinks.bind(this);
    this.logout = this.logout.bind(this);
    this.recentlyAdded = this.recentlyAdded.bind(this);
    this.mostUpvoted = this.mostUpvoted.bind(this);
    this.mostFavorited = this.mostFavorited.bind(this);
    this.mostViewed = this.mostViewed.bind(this);

    this.recipeCategory = categoryList;
  }
  /**
   *
   *
   * @memberof FullCatalog
   * @returns {any} react lifecycle method
   */
  componentDidMount() {
    console.log(categoryList);
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID()).then(() => {
        this.setState({
          avatar: this.props.user.data.avatar
        });
      });
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
  componentWillReceiveProps = nextProps => {
    console.log(nextProps);
    if (nextProps.recipes.allRecipes) {
      if (nextProps.recipes.allRecipes.recipes.length > 11) {
        this.setState({ showMore: true });
      }
    }
    if (nextProps.recipes.search) {
      return this.setState({
        All_recipes: nextProps.recipes.search
      });
    } else {
      return this.setState({
        All_recipes: nextProps.recipes.allRecipes
      });
    }
  };
  /**
   *
   *
   * @memberof FullCatalog
   * @returns {any} react lifecycle method
   */
  componentWillUnmount() {
    const data = { query: '' };
    this.props.searchRecipes(data);
  }
  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  recentlyAdded() {
    this.props.getRecipes(this.state.page_limit);
  }

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostUpvoted() {
    const query = '?sort=upvotes&order=desc';
    this.props.getRecipes(this.state.page_limit, query);
  }

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostFavorited() {
    const query = '?sort=favorite&order=desc';
    this.props.getRecipes(this.state.page_limit, query);
  }

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostViewed() {
    const query = '?sort=views&order=desc';
    this.props.getRecipes(this.state.page_limit, query);
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
      search: event.target.value
    });
    if (event.target.value.length < 1) {
      this.setState({
        All_recipes: this.props.recipes.allRecipes
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
      page_limit: prevState.page_limit + 12
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
      page_limit: 12
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
        <div>
          <h6 className="dropdown-header text-center">
            {this.props.user ?
              `Signed in as ${this.props.user.data.moniker}` :
              `loading`}
          </h6>
          <div className="dropdown-divider" />
          <Link className="dropdown-item bold" to={`/profile/${Auth.userID()}`}>
            Your profile
          </Link>
          <Link className="dropdown-item bold" to="/favorites">
            Your favorites
          </Link>
          <div className="dropdown-divider" />
          <a className="dropdown-item bold" onClick={this.logout} href="/">
            {` `}
            Logout
          </a>
        </div>
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
    const { search, avatar, showMore } = this.state;
    return (
      <div>
        <section className="container-fluid fixed">
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark bg-navbar">
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
                        <span
                          className="d-lg-none"
                          style={{ verticalAlign: 'top' }}
                        >
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
                      <span
                        className="d-lg-none"
                        style={{ verticalAlign: 'top' }}
                      >
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
                      <span
                        className="d-lg-none"
                        style={{ verticalAlign: 'top' }}
                      >
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
                          src={
                            avatar ||
                            'http://res.cloudinary.com/emasys/image/upload/v1512284211/wgeiqliwzgzpcmyl0ypd.png'
                          }
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
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      {this.navLinks()}
                    </div>
                  </li>
                </ul>
                <ReactTooltip place="bottom" type="dark" effect="float" />
              </div>
            </div>
          </nav>
        </section>
        <div
          className="category-bar fixed-top custom-fixed custom-bg-color"
          style={{ zIndex: 900 }}
        >
          <ul className="nav justify-content-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fa fa-th" aria-hidden="true" /> categories
              </a>
              <div className="dropdown-menu custom-dropdown-menu">
                {this.recipeCategory.map(category => (
                  <Link
                    key={category}
                    className="dropdown-item"
                    to={`/category/${category}`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
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
                <i className="fa fa-sort-amount-asc" aria-hidden="true" /> sort
                by
              </a>
              <div className="dropdown-menu custom-dropdown-menu">
                <a className="dropdown-item" onClick={this.recentlyAdded}>
                  Recently Added
                </a>
                <a className="dropdown-item" onClick={this.mostUpvoted}>
                  Most Upvoted
                </a>
                <a className="dropdown-item" onClick={this.mostFavorited}>
                  Most Favorited
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" onClick={this.mostViewed}>
                  Most Viewed
                </a>
              </div>
            </li>
          </ul>
        </div>

        <section className="container mt-0" id="catalog">
          <div className="catalog-wrapper">
            <CSSTransitionGroup {...fadeAnimation}>
              <CatalogList catalog={this.state.All_recipes} />
            </CSSTransitionGroup>
            <div className="text-center">
              {showMore && (
                <button
                  className="btn btn-outline-dark hvr-grow-shadow"
                  onClick={this.nextPage}
                >
                  View More
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.user.userProfile
});

FullCatalog.PropTypes = propTypes;
export default connect(mapStateToProps, actions)(FullCatalog);
