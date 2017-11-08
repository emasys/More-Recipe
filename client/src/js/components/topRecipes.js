import React, { Component } from 'react';
import Header from './header';

class TopRecipes extends Component {
  render() {
    return (
      <div>
        <Header/>
      <div className="container">
         <div className="row justify-content-center">
      <div className="col-12">
        <div className="title clearfix">
          <h5 className="float-left">Top Recipes</h5>
          <h6 className="float-right more">
            <a href="catalog.html">see all
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </a>
          </h6>
        </div>
      </div>

      <div className="col-lg-3 col-sm-10 mb-3  col-md-4">
        <a href="item_id.html">
          <div className="card animate">
            <div className="description">
              <h6>Description</h6>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste magnam sequi libero nulla ducimus a enim, saepe ex earum? Provident ullam ex aperiam architecto quod, voluptate ut culpa veritatis omnis.
            </div>
            <img className="card-img-top" src="img/J4_P6_Salade-Riz-Jambon-Dinde_03_small2-440x400.jpg" alt="Card image cap"/>
            <div className="card-body p-0 text-center social-icons">
              <a href="#"><span className="tag bg-danger">category</span></a>
              <h6 className="card-title custom-bg bg-secondary p-2 m-0 text-truncate ">Poached Egg over Spinach </h6>
              <span>
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                200
              </span>
              <span>
                  <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  50
              </span>
              <span>
                  <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                23
              </span>
              <span>
                  <i className="fa fa-eye" aria-hidden="true"></i>
                2.1k
              </span>
              <span>
                  <i className="fa fa-comment-o" aria-hidden="true"></i>
                    4
              </span>
            </div>
          </div>
        </a>
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default TopRecipes;