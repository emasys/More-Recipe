import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

const generateList = ({ catalog }) => {
  if (catalog) {
    console.log(catalog.recipes);
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
          <Link to="item_id.html">
            <div className="card animate">
              <div className="description">
                <h6>Description</h6>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
                magnam sequi libero nulla ducimus a enim, saepe ex earum?
                Provident ullam ex aperiam architecto quod, voluptate ut culpa
                veritatis omnis.
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
                <h6 className="card-title custom-bg bg-secondary p-2 m-0 text-truncate ">
                  {item.name}
                </h6>
                <span>
                  <i className="fa fa-heart-o" aria-hidden="true" />
                  200
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
        </div>
      );
    });
  }
};
const Catalog = props => {
  return (
    <div>
      <SearchBar />
      <section className="container" id="catalog">
        <a
          href="addNew.html"
          className="btn btn-danger rounded-circle"
          id="floating-icon"
        >
          <i className="fa fa-plus-circle fa-2x" aria-hidden="true" />
        </a>
        <div className="row justify-content-center">{generateList(props)}</div>
      </section>
    </div>
  );
};

export default Catalog;
