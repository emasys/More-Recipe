import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Stepper from 'react-reveal/Stepper';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
import Sticky from 'react-sticky-el';
import PropTypes from 'prop-types';

import * as actions from '../actions';

//component
import CatalogList from '../components/CatalogList';
import Navbar from './Navbar';
import Auth from './auth';

/**
 * Component for Home page
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * Creates an instance of Home.
   * @param {any} props
   * @memberof Home
   */
  constructor(props) {
    super(props);
    this.step = new Stepper()
      .step('background', 300)
      .step('logo', 400)
      .step('header', 1200)
      .step('title', 500)
      .step('button', 500);
    this.state = {
      show: true
    };
  }
  /**
   *
   *
   * @memberof Home
   *
   * @returns {any} react lifecycle method
   */
  componentDidMount() {
    const query = '?sort=views&order=desc';
    this.props.getHotRecipes(12, 0, query);
  }

  /**
   *
   *
   * @returns {any} renders jsx elements
   * @memberof Home
   */
  render() {
    return (
      <div>
        <section className="container-fluid">
          <div className="header">
            <Sticky
              stickyStyle={{ zIndex: 2000 }}
              stickyClassName="bg-dark animate-it m-0"
            >
              <Navbar className="bg-transparent m-0 p-0" />
            </Sticky>
            <div className="row header-items justify-content-center">
              <div className="col-lg-10 col-sm-10">
                <div className="home-title mt-100">
                  <Fade bottom duration={1000} step={this.step.is('logo')}>
                    <span className="firstWord">More </span>
                    Recipes
                  </Fade>
                </div>
                <div className=" text-white bg-mirror text-left">
                  <Flip x duration={1000} step={this.step.is('header')}>
                    <p>
                      This is a platform for you to share the awesome and
                      exciting recipe ideas you have invented or learnt.
                    </p>
                    <p>
                      Recipes are by nature derivative and meant to be shared
                      that is how they improve, are changed, how new ideas are
                      formed.
                    </p>
                    <p>Have fun as you share and explore exciting recipes</p>
                    {!Auth.loggedIn() && (
                      <Bounce
                        left
                        duration={1000}
                        step={this.step.is('button')}
                      >
                        <div className="row">
                          <Link
                            to="/signup"
                            className="btn btn-lg bg-orange bolder my-5 text-white p-10 signUp-btn"
                          >
                            Signup to Get Started
                          </Link>
                        </div>
                      </Bounce>
                    )}
                    {Auth.loggedIn() && (
                      <Bounce
                        left
                        duration={1000}
                        step={this.step.is('button')}
                      >
                        <div className="row">
                          <Link
                            to="/catalog"
                            className="btn btn-lg btn-dark bolder my-5 text-white p-10 signUp-btn"
                          >
                            Checkout Latest Recipes
                          </Link>
                        </div>
                      </Bounce>
                    )}
                  </Flip>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container " id="catalog">
          <div className="catalog-wrapper">
            <div className="col-12 ">
              <div className="clearfix" style={{ zIndex: 700 }}>
                <h4 className="float-left fresh-title">Top Recipes</h4>
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
            <CatalogList catalog={this.props.recipes.hotRecipes} />
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

Home.propTypes = {
  recipes: PropTypes.object,
  getRecipes: PropTypes.func
};
const mapStateToProps = state => ({ recipes: state.recipes });
export default connect(mapStateToProps, actions)(Home);
