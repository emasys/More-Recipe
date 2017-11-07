import React, {Component} from 'react';

class Header extends Component {
  render() {
    return (
      <section className="container-fluid ">
        <div className="header">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
              <a className="navbar-brand" href="index.html">
                More Recipes
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent">
                <ul className="navbar-nav ">
                  <li className="nav-item">
                    <a className="nav-link" href="catalog.html">Catalog</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="fav.html">Favorites
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                      <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href="profile.html">Profile</a>
                      <a className="dropdown-item" href="signin.html">Sign in</a>
                      <a className="dropdown-item" href="signup.html">Sign up</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="row header-items justify-content-center">
            <div className="col-lg-6 col-sm-10 text-center">
              <p className=" text-shadowed">
                More Recipes provides a platform for you to share the awesome and exciting
                recipe ideas you have invented or learnt. feel free to Browse through amazing
                recipes from around the world, or
                <a href="signup.html" className="btn btn-dark btn-sm " role="button">Sign Up</a>
                to post yours.
              </p>
            </div>
            <form className="searchBar col-lg-7 col-sm-10 text-center mx-auto">
              <input type="search" name="search" placeholder="Search..."/>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;