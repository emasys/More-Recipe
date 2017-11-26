import { Link } from 'react-router-dom';
import React, { Component } from 'react';
// import $ from 'jquery';
// import { findDOMNode } from 'react-dom';
import Fade from 'react-reveal/Fade';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: ''
    };
    this.generateList = this.generateList.bind(this);
    this.hoverIn = this.hoverIn.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
  }

  componentDidMount() {}

  hoverIn() {
    console.log('hovered');
  }

  hoverOut() {
    console.log('hovered out');
  }
  generateList({ catalog }) {
    if (catalog) {
      console.log(catalog);
      if (catalog.recipes.length < 1) {
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
      return catalog.recipes.map((item, index) => {
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
                  to={`/recipe/${item.id}`}
                  onMouseEnter={this.hoverIn}
                  onMouseLeave={this.hoverOut}
                >
                  <div className={`card animate`}>
                    <img
                      className="card-img-top img-box"
                      src={`../../../img/uploads/${item.foodImg}`}
                      alt="Card image cap"
                    />

                    <div className="card-body p-0 text-center social-icons">
                      <a href="#">
                        <span className="tag bg-danger">{item.category}</span>
                      </a>
                      <h6 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                        {item.name}
                      </h6>
                      <div className="card-body p-0 text-center">
                        <p className="crop-text">{item.description}</p>
                      </div>
                      <span>
                        <i className="fa fa-heart-o" aria-hidden="true" />
                        {item.favorite}
                      </span>
                      <span>
                        <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                        {item.upvote}
                      </span>
                      <span>
                        <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                        {item.downvote}
                      </span>
                      <span>
                        <i className="fa fa-eye" aria-hidden="true" />
                        {item.views}
                      </span>
                      <span>
                        <i className="fa fa-comment-o" aria-hidden="true" />
                        {item.comments}
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
      <div className="row justify-content-center">
        {this.generateList(this.props)}
      </div>
    );
  }
}

export default Catalog;
