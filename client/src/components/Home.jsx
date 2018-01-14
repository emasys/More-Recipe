import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Stepper from 'react-reveal/Stepper';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
import Sticky from 'react-sticky-el';
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
    const query = '?sort=upvotes&order=desc';
    this.props.getRecipes(12, query);
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
          {/* <div style={{ position: 'fixed', zIndex: 2000 }}> */}
            {/* <Sticky stickyStyle={{ position: 'fixed', background: 'black', maxHeight: '50px', zIndex: 2000 }}>
              <Navbar />
            </Sticky> */}
          {/* </div> */}

          {/* <Zoom duration={500} step={this.step.is('background')}> */}
            <div className="header">
            <Sticky 
            stickyStyle={{ position: 'fixed', maxHeight: '60px', zIndex: 2000 }}
            stickyClassName="bg-dark animate-it"
            >
              <Navbar className="bg-transparent" />
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
                    This is a platform for you to share the awesome and exciting recipe ideas you have invented or learnt.
                      <br/>Recipes are by nature derivative and meant to be shared
                      that is how they improve, are changed, how new ideas are
                      formed. <br/> Have fun as you share and explore exciting recipes
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
          {/* </Zoom> */}
        </section>

        <section className="container " id="catalog">
          <div className="catalog-wrapper">
            <div className="col-12 ">
              <div className="clearfix" style={{zIndex: 700}}>
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
            <CatalogList catalog={this.props.recipes} />
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

const mapStateToProps = state => ({ recipes: state.recipes.allRecipes });
export default connect(mapStateToProps, actions)(Home);
