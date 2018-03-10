import React from 'react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

import { list as categoryList } from '../../components/CategoryList';

/**
 *
 *
 * @param {object} props
 *
 * @returns {JSX.Element}
 * react element
 */
const EditForm = props => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <ul className="form row justify-content-center">
        <li className="col-lg-8 col-sm-12">
          <label>Recipe Title</label>
          <input
            type="text"
            required
            placeholder="Recipe Name"
            className="col-lg-11 col-sm-12"
            name="recipe"
            defaultValue={props.state.name}
          />
          <div className={`text-danger ${props.state.error}`} id="recipe_error">
            A recipe with this name already exist
          </div>
        </li>
        <li className="col-lg-8 col-sm-12">
          <label>
            Ingredients{' '}
            <small>
              <em>separate each ingredient with a comma {','}</em>
            </small>
          </label>
          <Textarea
            className="col-lg-11 col-sm-12"
            id="FormControlTextarea"
            name="ingredients"
            minRows={1}
            maxRows={50}
            defaultValue={props.state.ingredients}
          />
        </li>
        <li className="col-lg-8 col-sm-12">
          <label>Direction</label>
          <Textarea
            className="col-lg-11 col-sm-12"
            name="direction"
            minRows={1}
            maxRows={50}
            defaultValue={props.state.direction}
          />
        </li>

        <li className="col-lg-8 col-sm-12">
          <label>
            Description{' '}
            <small>
              <em>400 characters</em>
            </small>
          </label>
          <Textarea
            className="col-lg-11 col-sm-12"
            id="FormControlTextarea"
            defaultValue={props.state.description}
            name="description"
            minRows={1}
            maxRows={50}
            maxLength={400}
          />
        </li>
        <li className="col-lg-8 col-sm-12">
          <label>Category</label>
          <select
            name="category"
            className="col-12 "
            style={{ height: '50px' }}
            defaultValue={props.state.category}
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
            value="save"
            id="submit"
            className="btn bg-dark hovered"
          />
        </li>
      </ul>
    </form>
  </div>
);

EditForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default EditForm;
