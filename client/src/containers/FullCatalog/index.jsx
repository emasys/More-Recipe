import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import InfiniteScroll from 'react-infinite-scroller';
import Pace from 'react-pace-progress';

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
    // this.searchField = null;
    this.increment = 0;
    // this.hasMore = true;
    this.state = {
      search: '',
      page_limit: 4,
      avatar: null,
      offset: 0,
      allRecipes: '',
      conpare: '',
      searching: false,
      hasMore: true,
      showMore: true,
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
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
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
    if (this.state.offset >= nextProps.recipes.count) {
      this.setState({ showMore: false });
    } else {
      this.nums();
    }
  };

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  recentlyAdded = () => {
    const compare = (a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    };
    this.setState({ compare });
  };
  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostUpvoted = () => {
    const compare = (a, b) => {
      if (a.upvote < b.upvote) return 1;
      if (a.upvote > b.upvote) return -1;
      return 0;
    };
    this.setState({ compare });
  };

  nums = () => {
    this.setState(prevState => ({
      offset: prevState.offset + 4
    }));
  };
  loadFunc = () => {
    console.log('triggered');
    console.log(this.state.offset);
    this.props.getRecipes(this.state.page_limit, this.state.offset);
  };
  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostFavorited = () => {
    const compare = (a, b) => {
      if (a.favorite < b.favorite) return 1;
      if (a.favorite > b.favorite) return -1;
      return 0;
    };
    this.setState({ compare });
  };

  /**
   *
   * @returns {object} list of recently added recipes
   * @memberof FullCatalog
   */
  mostViewed = () => {
    const compare = (a, b) => {
      if (a.views < b.views) return 1;
      if (a.views > b.views) return -1;
      return 0;
    };
    this.setState({ compare });
  };

  /**
   *
   *
   * @param {any} event
   * @memberof FullCatalog
   * @returns {any} onChange event for the search bar
   */
  searchBar = event => {
    this.setState({ searching: true });
    const data = { query: event.target.value.toLowerCase() };
    this.props.searchRecipes(data);
    if (event.target.value.length < 1) {
      this.setState({ searching: false });
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
    console.log('triggered!');
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
      search, avatar, dropdown, searching, compare
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
        <div className="fixed-top">
          {this.props.netReq ? <Pace color="#e7b52c" height={2} /> : null}
        </div>
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
            {!searching && (
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadFunc}
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
              >
                <CatalogList
                  catalog={this.props.recipes.allRecipes.sort(compare)}
                />
              </InfiniteScroll>
            )}
            {searching && (
              <CatalogList catalog={this.props.recipes.searchResult} />
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
  netReq: state.netReq
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
