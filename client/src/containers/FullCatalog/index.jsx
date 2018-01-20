import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

// Actions
import * as actions from '../../actions';

// Components
import CategoryList from '../../components/CategoryList';
import CatalogList from '../../components/CatalogList';
import Auth from '../../components/auth';
import NavCat from './NavbarCategory';
import Navbar from './NavbarSearch';

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
      showMore: false,
      dropdown: false
    };
  }
  /**
   *
   *
   * @memberof FullCatalog
   * @returns {any} react lifecycle method
   */
  componentDidMount = () => {
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID());
    }
    this.props.getRecipes(this.state.page_limit);
  };

  /**
   *
   *
   * @memberof FullCatalog
   * @param {any} nextProps
   * @returns {any} updated props
   *
   */
  componentWillReceiveProps = nextProps => {
    const searchBar = document.getElementById('search').value;
    if (searchBar.length < 1) {
      this.setState({
        All_recipes: nextProps.recipes.allRecipes
      });
    }
    if (nextProps.user) {
      this.setState({
        avatar: nextProps.user.data.avatar
      });
    }
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
   * @param {object} nextProps
   * @param {object} nextState
   * @memberof FullCatalog
   * @returns {any}
   * invoked immediately before rendering
   * when new props or state are being received.
   */
  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.page_limit > this.state.page_limit) {
      this.props.getRecipes(nextState.page_limit);
    }
  };

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  recentlyAdded = () => {
    this.props.getRecipes(this.state.page_limit);
  };

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostUpvoted = () => {
    const query = '?sort=upvotes&order=desc';
    this.props.getRecipes(this.state.page_limit, query);
  };

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostFavorited = () => {
    const query = '?sort=favorite&order=desc';
    this.props.getRecipes(this.state.page_limit, query);
  };

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostViewed = () => {
    const query = '?sort=views&order=desc';
    this.props.getRecipes(this.state.page_limit, query);
  };
  /**
   *
   *
   * @param {any} event
   * @memberof FullCatalog
   * @returns {any} search for recipes
   */
  onSearch = event => {
    event.preventDefault();
    const data = { query: this.state.search.toLowerCase() };
    this.props.searchRecipes(data);
  };

  /**
   *
   *
   * @param {any} event
   * @memberof FullCatalog
   * @returns {any} onChange event for the search bar
   */
  searchBar = event => {
    this.setState({
      search: event.target.value
    });
    if (event.target.value.length < 1) {
      this.setState({
        All_recipes: this.props.recipes.allRecipes
      });
    }
  };

  /**
   *
   *
   * @memberof FullCatalog
   * @returns {any} pagination
   */
  nextPage = () => {
    this.setState(prevState => ({
      page_limit: prevState.page_limit + 8
    }));
  };
  /**
   *
   *
   * @memberof FullCatalog
   * @returns {any} dropdown
   */
  dropdownCtrl = () => {
    const { dropdown } = this.state;
    if (dropdown) {
      this.setState({
        dropdown: false
      });
    } else {
      this.setState({
        dropdown: true
      });
    }
  };
  /**
   *
   *
   * @returns {any} renders jsx elements
   * @memberof FullCatalog
   */
  render() {
    const {
      search, avatar, showMore, dropdown
    } = this.state;
    return (
      <div>
        <section className="container-fluid fixed">
          <Navbar
            onSearch={this.onSearch}
            search={search}
            searchBar={this.searchBar}
            avatar={avatar}
            user={this.props.user}
          />
        </section>
        <div
          className="category-bar fixed-top custom-fixed custom-bg-color"
          style={{ zIndex: 900 }}
        >
          <NavCat
            dropdownCtrl={this.dropdownCtrl}
            recentlyAdded={this.recentlyAdded}
            mostFavorited={this.mostFavorited}
            mostUpvoted={this.mostUpvoted}
            mostViewed={this.mostViewed}
          />
        </div>

        {dropdown && (
          <Fade top>
            <CategoryList />
          </Fade>
        )}
        <section className="container mt-100" id="catalog">
          <div className="catalog-wrapper">
            <CatalogList catalog={this.state.All_recipes} />
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

FullCatalog.propTypes = {
  recipes: PropTypes.object,
  user: PropTypes.object,
  getRecipes: PropTypes.func,
  searchRecipes: PropTypes.func,
  getProfile: PropTypes.func,
  data: PropTypes.object,
  moniker: PropTypes.string
};
export default connect(mapStateToProps, actions)(FullCatalog);
