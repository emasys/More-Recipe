import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

const generateList = ({ ingredients }) => {
  if (ingredients.recipe) {
    const list = ingredients.recipe.ingredients;
    return list.map((item, index) => (
      <a
        href={`https://en.wikipedia.org/wiki/${item}`}
        target="_blank"
        className="list-group-item text-capitalize list-group-item-action"
        key={index}
      >
        {item}
      </a>
    ));
  }
};

const Ingredients = props => (
  <div className="col-lg-5 col-sm-12">
    <h2 className="fresh-title wrapWord text-capitalize">
      {props.ingredients.recipe ? props.ingredients.recipe.name : 'loading...'}
    </h2>
    <small className="text-capitalize">
      A recipe by{' '}
      <Link
        className=" bolder text-info"
        to={`/user/${props.data ? props.data.data.id : null}`}
      >
        {props.data ? props.data.data.moniker : 'loading...'}
      </Link>
    </small>{' '}
    <br />
    <small className="">
      Posted on:{' '}
      {props.ingredients.recipe ?
        moment(props.ingredients.recipe.createdAt).format('MMM Do YYYY') :
        'loading...'}
    </small>
    <hr />
    <h5 className="text-muted">Description</h5>
    <div className="pb-3 ">
      <div className="bg-light direction rounded p-15">
        {props.ingredients.recipe ?
          props.ingredients.recipe.description :
          'loading...'}
      </div>
    </div>
    <hr />
    <h5 className="text-muted">Ingredients</h5>
    <hr />
    <div className="pb-3">
      <ul className="list-group wrapWord">{generateList(props)}</ul>
    </div>
    <h5 className="text-muted">Directions</h5>
    <hr />
    <div className="p-10 direction rounded  bg-light">
      {props.ingredients.recipe ? props.ingredients.recipe.direction : 'loading...'}
    </div>
  </div>
);

Ingredients.propTypes = {
  ingredients: PropTypes.object,
  data: PropTypes.object
};

export default Ingredients;
