import { Link } from 'react-router-dom';
import approx from 'approximate-number';
import React from 'react';

/**
 *
 *
 * @param {object} props
 * @returns {object} list of recipes
 * @memberof CatalogList
 */
const generateList = ({ catalog }) => {
  if (catalog) {
    if (catalog.length < 1) {
      return (
        <div className="text-center error-message">
          <div>
            <img
              className="img-fluid"
              src="https://res.cloudinary.com/emasys/image/upload/v1516439649/mR_2_jwnuce.png"
              alt="logo"
              height="200"
              width="200"
            />
            <h4 className="p-3 m-2 text-center">...Oops</h4>
            <p className="p-3 m-2 text-center">No recipe found</p>
            <p className="p-3 m-2 text-center">
              <Link to="/" className="btn btn-outline-dark hvr-icon-back">
                ...go back home
              </Link>
            </p>
          </div>
        </div>
      );
    }
    return catalog.map((item, index) => (
      <div className="row" key={index}>
        <div className="col-lg-12 col-sm-12 mb-20 mt-50 col-md-12">
          <div>
            <Link
              to={`/recipe/${item.id}`}
              className="hvr-grow-shadow"
            >
              <div className="card" data-aos="fade-up" data-aos-duration="1000">
                <img
                  className="card-img-top img-box"
                  src={item.foodImg}
                  alt="recipe image"
                />

                <div className="card-body p-0 text-center social-icons">
                  <span className="tag bg-danger">{item.category}</span>
                  <h4 className="card-title custom-bg bg-dark p-2 m-0">
                    {item.name.length > 25 ?
                      item.name.slice(0, 24).concat('...') :
                      item.name}
                  </h4>
                  <div className="card-body p-5 text-left bg-light">
                    <p className="line-clamp crop-text wrapWord wrapIt">
                      {item.description}
                    </p>
                  </div>
                  <span>
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    {approx(item.favorite)}
                  </span>
                  <span>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                    {approx(item.upvote)}
                  </span>
                  <span>
                    <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                    {approx(item.downvote)}
                  </span>
                  <span>
                    <i className="fa fa-eye" aria-hidden="true" />
                    {approx(item.views)}
                  </span>
                  <span>
                    <i className="fa fa-comment-o" aria-hidden="true" />
                    {approx(item.comments)}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    ));
  }
};
const CatalogList = props => (
  <div className="row justify-content-center">{generateList(props)}</div>
);

export default CatalogList;
