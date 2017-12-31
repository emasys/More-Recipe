import React from 'react';
import { Link } from 'react-router-dom';

const generateList = ({ ingredients }) => {
  if (ingredients) {
    const list = ingredients.recipe.ingredients;
    return list.map((item, index) => (
      <a href={`https://en.wikipedia.org/wiki/${item}`} target="_blank" className="list-group-item text-capitalize list-group-item-action" key={index}>
        {item}
      </a>
    ));
  }
};

const getDirection = ({ ingredients }) => {
  if (ingredients) {
    return <p className=" p-15">{ingredients.recipe.direction}</p>;
  }
};

const getDescription = ({ ingredients }) => {
  if (ingredients) {
    return <p>{ingredients.recipe.description}</p>;
  }
};
const getTitle = ({ ingredients }) => {
  if (ingredients) {
    return ingredients.recipe.name;
  }
};

const getUsername = ({ data }) => {
  if (data) {
    return data.data.moniker;
  }
};

const getUserId = ({ data }) => {
  if (data) {
    return data.data.id;
  }
};
const Ingredients = props => (
  <div className="col-lg-5 col-sm-12">
    <h2 className="fresh-title text-capitalize">{getTitle(props)}</h2>
    <small className="text-capitalize">
        A recipe by{' '}
      <Link className=" bolder text-info" to={`/user/${getUserId(props)}`}>
        {getUsername(props)}
      </Link>
    </small>
    <hr />
    <h5 className="text-muted">Description</h5>
    <div className="pb-3">
      <div className="bg-light p-15">{getDescription(props)}</div>
    </div>
    <hr />
    <h5 className="text-muted">Ingredients</h5>
    <hr />
    <div className="pb-3">
      <ul className="list-group">{generateList(props)}</ul>
    </div>
    <h5 className="text-muted">Directions</h5>
    <hr />
    <div className="p-3 direction rounded  bg-light">
      {getDirection(props)}
    </div>
  </div>
);

export default Ingredients;
