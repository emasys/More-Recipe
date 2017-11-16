import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getRecipes, searchRecipes } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//component
import CatalogList from '../components/catalog';

class Catalog extends Component {
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
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.getRecipes(this.state.page_limit).then(() => {
      this.setState(prevState => {
        return {
          All_recipes: this.props.recipes.allRecipes,
          page_limit: prevState.page_limit + 12
        };
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
  nextPage() {
    this.componentDidMount();
  }
  render() {
    const { search } = this.state;
    return (
      <div>
        <section className="container-fluid fixed">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark bg-navbar">
            <div className="container">
              <Link className="navbar-brand text-white" to="/">
                More Recipes
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <form
                onSubmit={this.search}
                className=" col-lg-9 col-md-12 col-sm-12 text-center p-0 m-0"
              >
                <input
                  type="search"
                  name="search"
                  value={search}
                  onChange={this.searchBar}
                  placeholder="search for nice recipes"
                />
              </form>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item ">
                    <NavLink
                      className="nav-link text-light"
                      activeClassName="active"
                      to="/catalog"
                    >
                      <i class="fa fa-archive fa-2x " aria-hidden="true" />
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link "
                      activeClassName="active"
                      to="/favorites"
                    >
                      <i className="fa fa-heart fa-2x red" aria-hidden="true" />
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i
                        className="fa fa-user-circle fa-2x"
                        aria-hidden="true"
                      />
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="/signin">
                        Sign in
                      </Link>
                      <Link className="dropdown-item" to="/signup">
                        Sign up
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
        <section className="container" id="catalog">
          <CatalogList catalog={this.state.All_recipes} />
          <div className="text-center">
            <button
              className="btn btn-dark hvr-grow-shadow"
              onClick={this.nextPage}
            >
              View More
            </button>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = state => {
  // console.log(state.recipes);
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
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
