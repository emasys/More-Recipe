import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
 *
 *
 * @class Category
 * @extends {Component}
 */
export class Category extends Component {
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

  /**
   *
   *
   * @memberof Category
   * @returns {any} page
   */
  componentDidMount() {
    // const data = {
    //   category: this.props.match.params.cat
    // };
    // this.props.getCategory(data);
    this.loadMoreRecipes();
  }

  componentWillReceiveProps = nextProps => {
    console.log('count ====>', nextProps.recipes.count);
    if (this.state.offset > nextProps.recipes.count) {
      this.setState({ showMore: false });
    }
  };

  gotoFullCatalog = () => {
    this.props.history.push('/catalog');
  };

  loadMoreRecipes = () => {
    console.log('triggered');
    console.log('show more', this.state.showMore);
    const data = {
      category: this.props.match.params.cat
    };
    this.props.getCategory(data, 4, this.state.offset);
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
                  <b>Thank you for being Awesome</b>
                  <br />
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getCategory }, dispatch)
});

Category.propTypes = {
  getCategory: PropTypes.func,
  category: PropTypes.object,
  match: PropTypes.object,
  recipes: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
