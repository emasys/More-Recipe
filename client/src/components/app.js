import React, { Component } from 'react';
// import Script from 'react-load-script';
// import Header from './header';
import Catalog from '../containers/catalog';
import { Link } from 'react-router-dom';
import { getRecipes, searchRecipes } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//component
import CatalogList from '../components/catalog';
import Navbar from './navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      All_recipes: '',
      page_limit: 12
    };

    // this.generateList = this.generateList.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const query = '?sort=upvotes&order=desc';
    this.props.getRecipes(this.state.page_limit, query).then(() => {
      this.setState({
        All_recipes: this.props.recipes.allRecipes
      });
    });
  }

  search(e) {
    e.preventDefault();
    const data = { query: this.state.search };
    this.props.searchRecipes(data).then(() => {
      this.setState({
        All_recipes: this.props.recipes.search
      });
    });
  }
  searchBar(e) {
    this.setState({
      search: e.target.value
    });
    this.componentDidMount();
  }
  
  render() {
    const { search } = this.state;
    const headerImg = {
      background: `linear-gradient(90deg, rgba(241, 193, 89, 0.45), rgba(241, 193, 89, 0.5), rgba(241, 193, 89, 0.6), rgba(241, 193, 89, 0.7), rgba(241, 193, 89, 0.8), rgba(241, 193, 89, 0.9), rgba(241, 193, 89, 1)), 
      url('../img/Food.jpg') no-repeat center center`,
      backgroundSize: 'cover'
    };
    return (
      <div>
        <section className="container-fluid ">
          <div className="header" style={headerImg}>
            <Navbar />
            <div className="row header-items justify-content-center">
              <div className="col-lg-6 col-sm-10 text-center">
                <img src="../img/logo.png" alt="logo" />
                <p className=" text-shadowed bolden mt-2">
                  More-Recipes provides a platform for you to share the awesome
                  and exciting recipe ideas you have invented or learnt. feel
                  free to Browse through amazing recipes from around the world,
                  or &nbsp;<Link
                    to="/signup"
                    className="btn btn-dark hvr-icon-buzz-out"
                    role="button"
                  >
                    Sign Up&nbsp;
                  </Link>&nbsp;to post yours.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container catalog-wrapper" id="catalog">
          <div className="col-12">
            <div className="clearfix">
              <h4 className="float-left fresh-title">Top Recipes Today</h4>
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
          <CatalogList catalog={this.state.All_recipes} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.recipes);
  return { recipes: state.recipes };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getRecipes,
      searchRecipes
    },
    dispatch
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
