import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { filter } from 'lodash';

// Actions
import { getFavorite, clearFavoriteList } from '../../actions/favoriteAction';

//components
import Navbar from '../../components/Navbar';
import FavoriteList from './FavoriteList';
import FavoriteCategoryList from './FavoriteCategoryList';
/**
 *
 *
 * @class Favorites
 *
 * @extends {Component}
 *
 */
export class Favorites extends Component {
  static propTypes = {
    favorites: PropTypes.object.isRequired,
    getFavorite: PropTypes.func.isRequired,
    clearFavoriteList: PropTypes.func.isRequired
  };
  /**
   * Creates an instance of Favorites.
   * @param {any} props
   *
   * @memberOf Favorites
   */
  constructor(props) {
    super(props);
    this.state = {
      showMore: true,
      offset: 0,
      filterBy: 'Recipe'
    };
  }

  /**
   *
   *
   * @memberof Favorites
   * @returns {void}
   */
  componentDidMount = () => {
    this.loadMoreRecipes();
  };

  /**
   * @param {object} nextProps
   *
   * @memberOf Favorites
   *
   * @returns {void}
   */
  componentWillReceiveProps = nextProps => {
    if (this.state.offset > nextProps.favorites.favoriteCount) {
      this.setState({ showMore: false });
    }
    if (nextProps.favorites.favoriteCount <= 12) {
      this.setState({ showMore: false });
    }
  };

  /**
   *
   *
   *
   * @memberOf Favorites
   *
   * @returns {void}
   */
  componentWillUnmount = () => {
    this.props.clearFavoriteList();
  };

  /**
   *
   *
   *
   * @memberOf Favorites
   *
   * @returns {void}
   */
  loadMoreRecipes = () => {
    this.props.getFavorite(12, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 4
    }));
  };

  /**
   *
   * @param {object} event
   * @param {object} category
   *
   * @returns {void}
   *
   * @memberOf Favorites
   */
  filterFavorites = (event, category) => {
    event.preventDefault();
    const setParams = {
      Recipe: { category }
    };
    this.setState({
      filterBy: setParams
    });
  };
  /**
   *
   *
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof Favorites
   */
  render() {
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <div className="mt-80 mb-3">
          <div className=" catalog-wrapper-full-grid" id="catalog">
            <div className="row">
              <div className="clearfix">
                <h2 className=" float-left clearfix">
                  Favorite Recipes{` `}
                  <span
                    data-tip="Total number of recipes added"
                    className="badge badge-dark"
                  >
                    {this.props.favorites.favoriteCount}
                  </span>
                </h2>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-lg-2 col-md-3 col-sm-4 col-12">
                <FavoriteCategoryList
                  list={this.props.favorites.userFavorites}
                  filterList={this.filterFavorites}
                />
              </div>
              <div className="col-lg-10 col-md-9 col-sm-8 col-12">
                <InfiniteScroll
                  next={this.loadMoreRecipes}
                  hasMore={this.state.showMore}
                  scrollThreshold={0.5}
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
                    </p>
                  }
                >
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="row justify-content-center"
                  >
                    <FavoriteList
                      favorites={filter(
                        this.props.favorites.userFavorites,
                        this.state.filterBy
                      )}
                    />
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorite
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getFavorite, clearFavoriteList }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
