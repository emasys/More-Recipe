import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Stepper from 'react-reveal/Stepper';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import Roll from 'react-reveal/Roll';
import Bounce from 'react-reveal/Bounce';
import * as actions from '../actions';

//component
import CatalogList from '../components/CatalogList';
import Navbar from './Navbar';

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
      .step('recipeList', 800)
      .step('button1', 200)
      .step('button2', 500);
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
        <section className="container-fluid " >
          <div style={{ position: 'fixed', zIndex: 2000 }}>
            <Navbar/>
          </div>

          <Zoom duration={500} step={this.step.is('background')} >
            <div className="header">
              <div className="row header-items justify-content-center">
                <div className="col-lg-10 col-sm-10 text-center">
                  <Zoom duration={1000} step={this.step.is('logo')}><img src="../img/logo.png" alt="logo" /></Zoom>

                  <div className=" mt-5 text-dark bg-mirror header-title text-left">
                    <Flip x duration={1000} step={this.step.is('header')}>
                  “I hate the notion of a secret recipe. Recipes are by nature derivative and meant
                  to be shared that is how they improve, are changed, how new ideas are formed. To
                  stop a recipe in it's tracks, to label it "secret" just seems mean.” ―
                      <Fade top cascade={1000} duration={500} step={this.step.is('title')} style={{ display: 'inline-block' }} >
                      Molly
                      </Fade>
                      {' '}
                      <Fade bottom cascade={1000} duration={500} step={this.step.is('title')} style={{ display: 'inline-block' }} >
                      Wizenberg
                      </Fade>
                    </Flip>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </section>

        <section className="container " id="catalog">
          <div className="catalog-wrapper">
            <div className="col-12 ">
              <div className="clearfix">
                <Bounce left duration={1000} step={this.step.is('button1')}>
                  <h4 className="float-left fresh-title">Top Recipes</h4>
                </Bounce>
                <h5 className="float-right">
                  <Bounce right duration={1000} step={this.step.is('button2')}>
                    <Link to="/catalog" className="btn btn-dark hvr-icon-wobble-horizontal">
                    see all recipes{` `}
                    </Link>
                  </Bounce>
                </h5>
              </div>
            </div>
            <Fade cascade bottom delay={300} duration={1200} step={this.step.is('recipeList')}>
              <CatalogList catalog={this.props.recipes} />
            </Fade>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ recipes: state.recipes.allRecipes });
export default connect(mapStateToProps, actions)(Home);
