import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

// Action
import { getCategory } from '../../actions/recipeActions';

// Components
import Navbar from '../Navbar';
import CatalogList from '../CatalogList';
import Preloader from '../../components/Preloader';

/**
 *@param {object} nextProps
 *
 * @class Category
 * @extends {Component}
 */
export class Category extends Component {
  static propTypes = {
    getCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  /**
   * Creates an instance of Category.
   * @param {any} props
   *
   * @memberOf Category
   */
  constructor(props) {
    super(props);
    this.state = {
      showMore: true,
      offset: 0
    };
  }

  componentDidMount = () => {
    this.loadMoreRecipes();
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.offset > nextProps.recipes.count) {
      this.setState({ showMore: false });
    }
  };

  gotoFullCatalog = () => {
    this.props.history.push('/catalog');
  };

  loadMoreRecipes = () => {
    const category = this.props.match.params.cat;
    this.props.getCategory(category, 4, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 4
    }));
  };
  /**
   *
   *
   * @returns {any}
   * render react element into the DOM
   * @memberof Category
   */
  render() {
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <Preloader />
        <div className="mt-80 mb-3 p-15">
          <div className="catalog-wrapper" id="catalog">
            <div className="row">
              <div className="col-12 ">
                <div className="clearfix" style={{ zIndex: 700 }}>
                  <h4 className="float-left header-title">
                    {this.props.match.params.cat}
                  </h4>
                  <h5 className="float-right">
                    <Link
                      to="/catalog"
                      className="btn btn-dark hvr-icon-wobble-horizontal"
                    >
                      see all recipes{` `}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
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
                  <button
                    onClick={this.gotoFullCatalog}
                    className="btn hovered btn-lg bg-orange bold my-5 text-white p-10 signUp-btn"
                  >
                    View full catalog
                  </button>
                </p>
              }
            >
              <CatalogList
                {...this.props}
                showDeleteBtn={false}
                catalog={this.props.recipes.category}
              />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(mapStateToProps, { getCategory })(Category);
