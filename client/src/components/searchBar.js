import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <section className="container-fluid fixed">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark bg-navbar">
          <div className="container">
            <a className="navbar-brand mr-3" href="index.html">
              More Recipes
            </a>
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
            <form className=" col-lg-9 col-md-12 col-sm-12 text-center p-0 m-0">
              <input
                type="search"
                name="search"
                placeholder="search for nice recipes"
              />
            </form>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown active">
                  <a
                    className="nav-link dropdown-toggl"
                    href="#"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Catalog
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="catalog.html#like">
                      Most Liked
                    </a>
                    <a className="dropdown-item" href="catalog.html#fav">
                      Most Favorited
                    </a>
                    <a className="dropdown-item" href="catalog.html#new">
                      Latest
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="fav.html">
                    Favorites
                  </a>
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
                    <i className="fa fa-user-circle fa-2x" aria-hidden="true" />
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="profile.html">
                      Profile
                    </a>
                    <a className="dropdown-item" href="signin.html">
                      Sign in
                    </a>
                    <a className="dropdown-item" href="signup.html">
                      Sign up
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    );
  }
}

export default SearchBar;
