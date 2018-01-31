import React from 'react';
import { Link } from 'react-router-dom';

import config from '../config/index';


export const list = [
  'Breakfast',
  'Brunch',
  'Lunch',
  'Snacks',
  'Appetisers',
  'Dinner',
  'Soups',
  'Noodles',
  'Rice',
  'Pasta',
  'Meat',
  'Poultry',
  'Seafood',
  'Vegetarian',
  'Sides',
  'Sauces',
  'Baking',
  'Desserts',
  'Drinks',
  'Salads'
];

const CategoryList = props => (
  <section className="mt-0 mb-20 text-center">
    <div className="category-wrapper container-fluid">
      <div className="containe">
        <div className="row justify-content-center">
          {list.map(link => (
            <div className="col-lg-2 col-md-3 col-sm-4 mb-2 p-0" key={link}>
              <Link
                to={`/category/${link}`}
                className="categories hvr-shrink bg-dark"
              >
                <img
                  src={config.CAT_IMAGE[link]}
                  className="category-image"
                  alt="category"
                />
                <p>{link}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default CategoryList;
