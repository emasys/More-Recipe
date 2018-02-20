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
import Auth from '../../components/auth';
import CategoryNavbar from './NavbarCategory';
import Navbar from './NavbarSearch';
import Preloader from '../../components/Preloader';

/**
 *@param {object} event
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
    data: PropTypes.object.isRequired,
    moniker: PropTypes.string.isRequired,
    resetSearch: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
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
   *
   *
   * @memberof FullCatalog
   * @returns {any} react lifecycle method
   */
  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (Auth.userID()) {
      this.props.getProfile(Auth.userID());
    }
    this.props.getRecipes(this.state.page_limit, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 12
    }));
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

  componentWillUnmount = () => {
    this.props.clearRecipes();
  };

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

  loadMoreRecipes = () => {
    this.props.getRecipes(this.state.page_limit, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 12
    }));
  };

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
   *
   *
   * @param {any} event
   * @memberof FullCatalog
   * @returns {any} onChange event for the search bar
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
  onSearch = event => {
    event.preventDefault();
    this.setState({ searching: true });
    this.searchInput = {
      query: event.target.elements.search.value.toLowerCase()
    };
    this.props.searchRecipes(this.searchInput, 4, this.state.searchOffset);
  };
  addMore = () => {
    this.props.history.push('/new');
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

  showMoreSearchResult = () => {
    this.setState(prevState => ({
      searchOffset: prevState.searchOffset + 4
    }));
    this.props.searchRecipes(this.searchInput, 4, this.state.searchOffset + 4);
  };
  /**
   *
   *
   * @returns {any} renders jsx elements
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
            user={this.props.user}
          />
        </section>
        <Preloader />
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
          <div className="row catalog-wrapper mx-2 justify-content-center">
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
  user: state.user.userProfile
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
