import React, { Component } from 'react';
import { getFavs } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

//components
// import Catalog from './catalog';
import Navbar from './navbar';
class Favorites extends Component {
  constructor(props) {
    super(props);

    this.generateList = this.generateList.bind(this);
  }

  componentDidMount() {
    this.props.getFavs();
  }

  generateList(fav) {
    console.log(fav);
    if (fav.userFav) {
      console.log(fav.userFav.favorites);
      if (fav.userFav.favorites.length < 1) {
        return (
          <div className="text-center error-message">
            <div className="catalog-wrapper">
              <img src="../img/logo.png" alt="logo" />
              <h4 className="p-3 m-2">
                We Know this is embarrassing, but we don't understand your query{' '}
              </h4>
              <p className="p-3 m-2">
                Perhaps you should cross-check your spellings
              </p>
            </div>
          </div>
        );
      }
      return fav.userFav.favorites.map((item, index) => {
        return (
          <div
            key={index}
            className="col-lg-3 col-sm-10 mb-3  col-md-4 animate-catalog"
            data-animate="bounceIn"
            data-duration="1.0s"
            data-delay="0.1s"
            data-offset="100"
          >
            <div style={{ overflow: 'hidden' }}>
              <Fade bottom>
                <Link
                  to={`/recipe/${item.RecipeId}`}
                  onMouseEnter={this.hoverIn}
                  onMouseLeave={this.hoverOut}
                >
                  <div className={`card animate`}>
                    <div className="description">
                      <h6>Description</h6>
                      {item.Recipe.description}
                    </div>
                    <img
                      className="card-img-top"
                      src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
                      alt="Card image cap"
                    />
                    <div className="card-body p-0 text-center social-icons">
                      <a href="#">
                        <span className="tag bg-danger">
                          {item.Recipe.category}
                        </span>
                      </a>
                      <h6 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                        {item.Recipe.name}
                      </h6>
                      <span>
                        <i className="fa fa-heart-o" aria-hidden="true" />
                        {item.Recipe.favorite}
                      </span>
                      <span>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                        {item.Recipe.upvote}
                      </span>
                      <span>
                        <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                        {item.Recipe.downvote}
                      </span>
                      <span>
                        <i className="fa fa-eye" aria-hidden="true" />
                        {item.Recipe.views}
                      </span>
                      <span>
                        <i className="fa fa-comment-o" aria-hidden="true" />
                        {item.Recipe.comments}
                      </span>
                    </div>
                  </div>
                </Link>
              </Fade>
            </div>
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="mt-80 mb-3">
          <div className="container catalog-wrapper" id="catalog">
            <div className="row justify-content-center">
              {this.generateList(this.props.favorites)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getFavs }, dispatch)
});

const mapStateToProps = state => {
  // console.log(state);
  return {
    favorites: state.favorite
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
