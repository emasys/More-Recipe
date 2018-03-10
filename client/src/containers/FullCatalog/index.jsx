import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';

// Actions
import {
  getRecipes,
  clearRecipes,
  searchRecipes,
  resetSearch
} from '../../actions/recipeActions';
import { getProfile } from '../../actions/userActions';

// Components
import CategoryList from '../../components/CategoryList';
import CatalogList from '../../components/CatalogList';
import CategoryNavbar from './NavbarCategory';
import Navbar from './NavbarSearch';

/**
 * @class FullCatalog
 * @extends {Component}
 */
class FullCatalog extends Component {
  static propTypes = {
    recipes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    getRecipes: PropTypes.func.isRequired,
    searchRecipes: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    resetSearch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    clearRecipes: PropTypes.func.isRequired
  };
  /**
   * Creates an instance of FullCatalog.
   * @param {any} props
   * @memberof FullCatalog
   */
  constructor(props) {
    super(props);
    this.searchInput = null;
    this.increment = 0;
    // this.hasMore = true;
    this.state = {
      search: '',
      page_limit: 12,
      avatar: null,
      offset: 0,
      searching: false,
      showMore: true,
      dropdown: false,
      searchOffset: 0,
      showMoreSearchResult: true
    };
  }
  /**
   *  Invoked immediately after component is mounted
   *
   *@returns {void}
   */
  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.props.getRecipes(this.state.page_limit, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 12
    }));
  };
  /**
   *  Invoked before a mounted component receives new props.
   *
   * @param {object} nextProps
   *
   * @returns {void}
   *
   */
  componentWillReceiveProps = nextProps => {
    if (nextProps.user) {
      this.setState({
        avatar: nextProps.user.data.avatar
      });
    }
    if (this.state.offset > nextProps.recipes.count) {
      this.setState({ showMore: false });
    }
    if (nextProps.recipes.searchCount <= 4) {
      this.setState({ showMoreSearchResult: false });
    } else if (nextProps.recipes.searchCount > 4) {
      this.setState({ showMoreSearchResult: true });
    }
    if (this.state.searchOffset > nextProps.recipes.searchCount) {
      this.setState({ showMoreSearchResult: false });
    }
  };
  /**
   *  Invoked immediately before a component
   * is unmounted and destroyed
   *
   * @returns {void}
   *
   */
  componentWillUnmount = () => {
    this.props.clearRecipes();
  };

  /**
   * Sort payload
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf FullCatalog
   */
  recentlyAdded = event => {
    event.preventDefault();
    const compare = (a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    };
    this.setState({ compare });
    this.loadMoreRecipes();
  };
  /**
   * Sort payload
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf FullCatalog
   */
  mostUpvoted = event => {
    event.preventDefault();
    const compare = (a, b) => {
      if (a.upvote < b.upvote) return 1;
      if (a.upvote > b.upvote) return -1;
      return 0;
    };
    this.setState({ compare });
    this.loadMoreRecipes();
  };
  /**
   * Instantiate network request to fetch recipes
   *
   *
   * @returns {void}
   *
   * @memberOf FullCatalog
   */
  loadMoreRecipes = () => {
    this.props.getRecipes(this.state.page_limit, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 12
    }));
  };
  /**
   * Sort payload
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf FullCatalog
   */
  mostFavorited = event => {
    event.preventDefault();
    const compare = (a, b) => {
      if (a.favorite < b.favorite) return 1;
      if (a.favorite > b.favorite) return -1;
      return 0;
    };
    this.setState({ compare });
    this.loadMoreRecipes();
  };
  /**
   * Sort payload
   *
   * @param {object} event
   *
   * @returns {void}
   *
   * @memberOf FullCatalog
   */
  mostViewed = event => {
    event.preventDefault();
    const compare = (a, b) => {
      if (a.views < b.views) return 1;
      if (a.views > b.views) return -1;
      return 0;
    };
    this.setState({ compare });
    this.loadMoreRecipes();
  };

  /**
   * Clear search results
   *
   * @param {any} event
   *
   * @memberof FullCatalog
   *
   * @returns {void}
   */
  searchBar = event => {
    event.preventDefault();
    if (this.state.searching) {
      this.props.resetSearch();
      this.setState({ searchOffset: 0 });
    }
    this.setState({ searching: false });
    if (event.target.value.length < 1) {
      this.setState({ searching: false });
    }
  };

  /**
   * Search for recipes
   *
   * @param {any} event
   *
   * @memberof FullCatalog
   *
   * @returns {void}
   */
  onSearch = event => {
    event.preventDefault();
    this.setState({ searching: true });
    this.searchInput = event.target.elements.search.value.toLowerCase();
    this.props.searchRecipes(this.searchInput, 4, this.state.searchOffset);
  };

  /**
   * Goto "add new" recipe page
   *
   * @param {any} event
   *
   * @memberof FullCatalog
   *
   * @returns {void}
   */
  addMore = () => {
    this.props.history.push('/new');
  };
  /**
   * Display dropdown menu
   *
   *
   * @memberof FullCatalog
   *
   * @returns {void}
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
   * Paginate search result
   *
   *
   * @memberof FullCatalog
   *
   * @returns {void}
   */
  showMoreSearchResult = () => {
    this.setState(prevState => ({
      searchOffset: prevState.searchOffset + 4
    }));
    this.props.searchRecipes(this.searchInput, 4, this.state.searchOffset + 4);
  };
  /**
   *
   *
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof FullCatalog
   */
  render() {
    const {
      search,
      avatar,
      dropdown,
      searching,
      compare,
      showMoreSearchResult
    } = this.state;
    return (
      <div className="container-fluid">
        <section className="container-fluid fixed">
          <Navbar
            onSearch={this.onSearch}
            search={search}
            avatar={avatar}
            onChanged={this.searchBar}
            user={this.props.auth}
          />
        </section>
        <div
          className="category-bar fixed-top custom-fixed custom-bg-color"
          style={{ zIndex: 900 }}
        >
          <CategoryNavbar
            dropdownCtrl={this.dropdownCtrl}
            recentlyAdded={this.recentlyAdded}
            mostFavorited={this.mostFavorited}
            mostUpvoted={this.mostUpvoted}
            mostViewed={this.mostViewed}
          />
        </div>

        {dropdown && <CategoryList />}
        <section className="mt-100" id="catalog">
          <div className="row catalog-wrapper-full-grid justify-content-center">
            {!searching && (
              <InfiniteScroll
                next={this.loadMoreRecipes}
                hasMore={this.state.showMore}
                loader={
                  <div className="loader text-center" key={0}>
                    <img
                      src="https://res.cloudinary.com/emasys/image/upload/v1516647862/Facebook-0.9s-200px_sqqnu9.gif"
                      width="30"
                      height="30"
                      alt="loading..."
                    />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Thank you for being Awesome</b>
                    <br />
                    <button
                      onClick={this.addMore}
                      className="btn hovered btn-lg bg-orange bold my-5 text-white p-10 signUp-btn"
                    >
                      Add More Recipes
                    </button>
                  </p>
                }
              >
                <CatalogList
                  {...this.props}
                  showDeleteBtn={false}
                  catalog={this.props.recipes.allRecipes.sort(compare)}
                />
              </InfiniteScroll>
            )}
            {searching && (
              <div>
                <CatalogList
                  {...this.props}
                  showDeleteBtn={false}
                  catalog={this.props.recipes.searchResult.sort(compare)}
                />
                {showMoreSearchResult && (
                  <div className="row text-center">
                    <div className="col-12">
                      <button
                        className="btn btn-lg btn-outline-dark"
                        onClick={this.showMoreSearchResult}
                      >
                        View More
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.user.userProfile,
  auth: state.user
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getRecipes,
      getProfile,
      searchRecipes,
      clearRecipes,
      resetSearch
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(FullCatalog);
