import React from 'react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

import { list as categoryList } from '../../components/CategoryList';

/**
 * Add new recipe form
 *
 * @param {object} props
 *
 * @returns {JSX.Element} render react element
 */
const AddRecipeForm = props => {
  const { required, nameConflict, buttonDisplay } = props.state;
  return (
    <form onSubmit={props.handleForm}>
      {required && <div className="text-error">All fields are required</div>}
      <ul className="form row p-10 mb-10">
        <li className="col-12">
          <label>Recipe Name</label>
          <input
            type="text"
            name="recipe"
            required
            onFocus={props.onFocus}
            className="col-12"
            id="inputRecipe"
            placeholder="Name of recipe"
          />
          {nameConflict && (
            <div className="text-danger" id="recipe_error">
              You have already posted this recipe
            </div>
          )}
        </li>
        <li className="col-12">
          <label htmlFor="description">Description</label>
          <Textarea
            className="col-12"
            placeholder="a short description of your recipe (400 characters)"
            id="description"
            minRows={1}
            onFocus={props.onFocus}
            maxRows={20}
            maxLength={400}
            required
            name="description"
          />
        </li>
        <li className="col-12">
          <label htmlFor="ingredients" className="col-form-label">
            Ingredients
          </label>
          <Textarea
            placeholder="Add your ingredients and separate with a comma ','"
            className="col-12"
            id="ingredients"
            minRows={1}
            maxRows={10}
            onFocus={props.onFocus}
            required
            name="ingredients"
          />
        </li>
        <li className="col-12">
          <label htmlFor="direction">Direction</label>
          <Textarea
            className="col-12"
            placeholder="how to make it happen"
            id="direction"
            minRows={1}
            onFocus={props.onFocus}
            maxRows={20}
            required
            name="direction"
          />
        </li>

        <li className="special col-12">
          <label>Category</label>
          <select
            name="category"
            className="col-12 "
            style={{ height: '50px' }}
          >
            {categoryList.map(item => (
              <option value={item} key={item} className="text-capitalize">
                {item}
              </option>
            ))}
          </select>
        </li>
        {buttonDisplay && (
          <li className=" col-12 ">
            <input
              type="submit"
              value="Submit"
              id="submit"
              className="bg-dark btn hovered"
            />
          </li>
        )}
        {!buttonDisplay && (
          <li className=" col-12 text-center ">
            <img
              src="https://res.cloudinary.com/emasys/image/upload/v1516647862/Facebook-0.9s-200px_sqqnu9.gif"
              width="50"
              height="50"
              alt="loading..."
            />
          </li>
        )}
      </ul>
    </form>
  );
};

AddRecipeForm.propTypes = {
  handleForm: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};
export default AddRecipeForm;
