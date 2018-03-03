import React from 'react';
import PropTypes from 'prop-types';
import { countBy } from 'lodash';

const FavoriteCategoryList = ({ list, filterList }) => {
  const orderedList = [];
  if (list) {
    list.map(item => {
      orderedList.push(item.Recipe.category);
      return orderedList;
    });
    const orderedListWithBadge = countBy(orderedList);
    return (
      <div className="list-group favoriteList">
        {Object.keys(orderedListWithBadge).map(key => (
          <a
            key={key}
            href="#"
            onClick={event => filterList(event, key)}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {key}{' '}
            <span
              data-tip="Total number of recipes added"
              className="badge badge-dark badge-pill"
            >
              {orderedListWithBadge[key]}
            </span>
          </a>
        ))}
      </div>
    );
  }
  return 'Loading......';
};

FavoriteCategoryList.propTypes = {
  list: PropTypes.array.isRequired
};

export default FavoriteCategoryList;
