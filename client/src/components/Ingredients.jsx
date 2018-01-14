import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const generateList = ({ ingredients }) => {
  if (ingredients) {
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
    <h2 className="fresh-title text-capitalize">
      {props.ingredients ? props.ingredients.recipe.name : 'loading...'}
    </h2>
    <small className="text-capitalize">
      A recipe by{' '}
      <Link
        className=" bolder text-info"
        to={`/user/${props.data ? props.data.data.id : null}`}
      >
        {props.data ? props.data.data.moniker : 'loading...'}
      </Link>
    </small> <br/>
    <small className="">
      Posted on: {props.ingredients ? moment(props.ingredients.recipe.createdAt).format('MMM Do YYYY') : "loading..."}
    </small>
    <hr />
    <h5 className="text-muted">Description</h5>
    <div className="pb-3">
      <div className="bg-light p-15">
        {props.ingredients ?
          props.ingredients.recipe.description :
          'loading...'}
      </div>
    </div>
    <hr />
    <h5 className="text-muted">Ingredients</h5>
    <hr />
    <div className="pb-3">
      <ul className="list-group">{generateList(props)}</ul>
    </div>
    <h5 className="text-muted">Directions</h5>
    <hr />
    <div className="p-10 direction rounded  bg-light">
      {props.ingredients ? props.ingredients.recipe.direction : 'loading...'}
    </div>
  </div>
);

export default Ingredients;
