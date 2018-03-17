import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DynamicHeader from 'react-sticky-dynamic-header';
import PropTypes from 'prop-types';

// Action
import { getHotRecipes } from '../actions/recipeActions';

//component
import CatalogList from '../components/CatalogList';
import Navbar from './Navbar';
import BigNavbar from './BigNavbar';

/**
 * Component for Home page
 *
 * @class
 * @extends {Component}
 */
export class Home extends Component {
  static propTypes = {
    recipes: PropTypes.object.isRequired,
    getHotRecipes: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  /**
   * Creates an instance of Home.
   * @param {object} props
   * @memberof Home
   */
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };
  }
  /**
   *  Invoked immediately after component is mounted
   *
   *@returns {object} response after instantiating
   * network request
   *
   */
  componentDidMount() {
    const query = '?sort=views&order=desc';
    this.props.getHotRecipes(12, 0, query);
  }

  /**
   *
   *
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof Home
   */
  render() {
    return (
      <div>
        <section className="container-fluid">
          <div className="header">
            <DynamicHeader hasEffect effectDuration={600} useHeadersDifference>
              <BigNavbar />
              <Navbar className="bg-dark fixed-top m-0 p-0" />
            </DynamicHeader>
            <div className="row header-items justify-content-center">
              <div className="col-lg-10 col-sm-10 text-left banner">
                <div
                  className="home-title mt-100"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <span className="firstWord">More </span>
                  Recipes
                </div>
                <div
                  className=" text-white bg-mirror pb-30"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  id="welcome-note"
                >
                  <p>
                    This is a platform for you to share the awesome and exciting
                    recipe ideas you have invented or learnt.
                  </p>
                  <p>
                    Recipes are by nature derivative and meant to be shared that
                    is how they improve, are changed, how new ideas are formed.
                  </p>
                  <p>Have fun as you share and explore exciting recipes</p>
                  {!this.props.auth.isLoggedIn && (
                    <div className="mt-0">
                      <Link
                        to="/signup"
                        className="btn btn-lg bg-orange bold my-5 text-white p-10 signUp-btn"
                      >
                        Signup to Get Started
                      </Link>
                    </div>
                  )}
                  {this.props.auth.isLoggedIn && (
                    <div className="">
                      <Link
                        to="/new"
                        className="btn btn-lg bg-orange bold my-5 text-white p-10 signUp-btn"
                      >
                        Add new recipe
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container " id="catalog">
          <div className="catalog-wrapper">
            <div className="col-12 ">
              <div className="clearfix" style={{ zIndex: 700 }}>
                <h4 className="float-left header-title">Top Recipes</h4>
                <h5 className="float-right">
                  <Link
                    to="/catalog"
                    id="view-all-recipes"
                    className="btn btn-dark hvr-icon-wobble-horizontal"
                  >
                    see all recipes{` `}
                  </Link>
                </h5>
              </div>
            </div>
            <CatalogList
              {...this.props}
              showDeleteBtn={false}
              catalog={this.props.recipes.hotRecipes}
            />
            <div className="col-12 ">
              <div className="clearfix">
                <h5 className="text-center">
                  <Link
                    to="/catalog"
                    className="btn btn-dark hvr-icon-wobble-horizontal"
                  >
                    View Latest Recipes{` `}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  recipes: state.recipes,
  auth: state.user
});
export default connect(mapStateToProps, { getHotRecipes })(Home);
