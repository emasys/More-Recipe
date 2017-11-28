import React from 'react';
import { Link } from 'react-router-dom';

const generateList = ({ ingredients }) => {
  if (ingredients) {
    const list = ingredients.recipe.ingredients;
    return list.map((item, index) => {
      return (
        <li className="list-group-item" key={index}>
          {item}
        </li>
      );
    });
  }
};

const getDirection = ({ ingredients }) => {
  if (ingredients) {
    return <p>{ingredients.recipe.direction}</p>;
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
const Ingredients = props => {
  return (
    <div className="col-lg-5 col-sm-12">
      <h2 className="fresh-title">{getTitle(props)}</h2>
      <small className="text-capitalize">
        A recipe by{' '}
        <Link className=" bolder text-info" to={`/user/${getUserId(props)}`}>
          {getUsername(props)}
        </Link>
      </small>
      <hr />
      <h5 className="text-muted">Description</h5>
      <div className="pb-3">
        <ul className="list-group">{getDescription(props)}</ul>
      </div>
      <hr />
      <h5 className="text-muted">Ingredients</h5>
      <hr />
      <div className="pb-3">
        <ul className="list-group">{generateList(props)}</ul>
      </div>
      <h5 className="text-muted">Directions</h5>
      <hr />
      <div className="p-3 direction rounded">{getDirection(props)}</div>
    </div>
  );
};

export default Ingredients;
