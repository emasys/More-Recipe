import React from 'react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

import { list as categoryList } from '../../components/CategoryList';

const AddRecipeForm = props => (
  <form onSubmit={props.handleForm}>
    <ul className="form row p-3 mb-10">
      <li className="col-12">
        <label>Recipe Name</label>
        <input
          type="text"
          name="recipe"
          required
          className="col-12"
          id="inputRecipe"
          placeholder="Name of recipe"
        />
        <div className="text-danger" id="recipe_error" />
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
          required
          name="ingredients"
        />
        <div className="text-danger" id="ing_error" />
      </li>
      <li className="col-12">
        <label htmlFor="direction">Direction</label>
        <Textarea
          className="col-12"
          placeholder="how to make it happen"
          id="direction"
          minRows={1}
          maxRows={20}
          required
          name="direction"
        />
        <div className="text-danger" id="direction_error" />
      </li>
      <li className="col-12">
        <label htmlFor="description">Description</label>
        <Textarea
          className="col-12"
          placeholder="a short description of your recipe"
          id="description"
          minRows={1}
          maxRows={20}
          required
          name="description"
        />
        <div className="text-danger" id="description_error" />
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
      <li className=" col-12 ">
        <input
          type="submit"
          value="Submit"
          id="submit"
          className="bg-dark btn hovered"
        />
      </li>
    </ul>
  </form>
);

AddRecipeForm.propTypes = {
  handleForm: PropTypes.func
};
export default AddRecipeForm;
