import React, { Component } from 'react';
import Catalog from '../containers/catalog';
import { Link } from 'react-router-dom';
import { getRecipes, searchRecipes } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//component
import CatalogList from '../components/CatalogList';
import Navbar from './Navbar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      All_recipes: '',
      page_limit: 12,
    };

    // this.generateList = this.generateList.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const query = '?sort=upvotes&order=desc';
    this.props.getRecipes(this.state.page_limit, query).then(() => {
      this.setState({
        All_recipes: this.props.recipes.allRecipes,
      });
    });
  }

  search(e) {
    e.preventDefault();
    const data = { query: this.state.search };
    this.props.searchRecipes(data).then(() => {
      this.setState({
        All_recipes: this.props.recipes.search,
      });
    });
  }
  searchBar(e) {
    this.setState({
      search: e.target.value,
    });
    this.componentDidMount();
  }

  render() {
    const { search } = this.state;
    const headerImg = {
      background: `linear-gradient(90deg, rgba(241, 193, 89, 0.45), rgba(241, 193, 89, 0.5), rgba(241, 193, 89, 0.6), rgba(241, 193, 89, 0.7), rgba(241, 193, 89, 0.8), rgba(241, 193, 89, 0.9), rgba(241, 193, 89, 1)), 
      url('../img/Food.jpg') no-repeat center center`,
      backgroundSize: 'cover',
    };
    return (
      <div>
        <section className="container-fluid ">
          <div className="header" style={headerImg}>
            <Navbar />
            <div className="row header-items justify-content-center">
              <div className="col-lg-6 col-sm-10 text-center">
                <img src="../img/logo.png" alt="logo" />
                <p className=" mt-5 text-dark bg-mirror header-title">
                  “I hate the notion of a secret recipe. Recipes are by nature derivative and meant
                  to be shared that is how they improve, are changed, how new ideas are formed. To
                  stop a recipe in it's tracks, to label it "secret" just seems mean.” ― Molly
                  Wizenberg
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
                <Link to="/catalog" className="btn btn-dark hvr-icon-wobble-horizontal">
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
      searchRecipes,
    },
    dispatch,
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
