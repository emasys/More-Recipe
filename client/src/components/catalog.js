import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';
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

  componentDidMount() {
    // const script = document.createElement('script');
    // script.src =
    //   'https://raw.githubusercontent.com/emasys/More-Recipe/develop/client/public/js/script.js';
    // // script.async = true;
    // document.body.appendChild(script);
    // const el = findDOMNode(this.refs.toggle);
    // $(el).hide();
    // $(el).bind('mouseenter click focus', function() {
    //   $(this).addClass('animated pulse');
    // });
  }

  hoverIn() {
    console.log('hovered');
    // document.querySelector('.animate').classList.add('animated', 'pulse');
    // this.setState({
    //   hover: 'animated pulse'
    // });

    // $('.animate').bind('mouseenter click focus', function() {
    //   $(this).addClass('animated pulse');
    // });
    // $('.animate').bind('mouseleave', function() {
    //   $(this).removeClass('animated pulse');
    // });
    // $('.description').bind('mouseenter focus', function() {
    //   $(this).fadeTo(400, 1);
    // });
    // $('.description').on('mouseleave', function() {
    //   $(this).fadeTo(400, 0.0000000001);
    // });
  }

  hoverOut() {
    console.log('hovered out');
    // document.querySelector('.animate').classList.remove('animated', 'pulse');
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
                    <div className="description">
                      <h6>Description</h6>
                      {item.description}
                    </div>
                    <img
                      className="card-img-top"
                      src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
                      alt="Card image cap"
                    />
                    <div className="card-body p-0 text-center social-icons">
                      <a href="#">
                        <span className="tag bg-danger">{item.category}</span>
                      </a>
                      <h6 className="card-title custom-bg bg-dark p-2 m-0 text-truncate ">
                        {item.name}
                      </h6>
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
