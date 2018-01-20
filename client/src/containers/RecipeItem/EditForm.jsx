import React from 'react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';

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
            defaultValue={props.name}
            onChange={props.nameChanged}
          />
          <div className="text-danger" id="recipe_error" />
        </li>
        <li className="col-lg-8 col-sm-12">
          <label>
              Ingredients{' '}
            <em className="text-warning">(separate with comma ",")</em>
          </label>
          <Textarea
            className="col-lg-11 col-sm-12"
            id="FormControlTextarea"
            name="ingredients"
            minRows={1}
            maxRows={50}
            defaultValue={props.ingredients}
            onChange={props.ingChanged}
          />
        </li>
        <li className="col-lg-8 col-sm-12">
          <label>Direction</label>
          <Textarea
            className="col-lg-11 col-sm-12"
            name="direction"
            minRows={3}
            maxRows={50}
            defaultValue={props.direction}
            onChange={props.directionChanged}
          />
        </li>

        <li className="col-lg-8 col-sm-12">
          <label>Description</label>
          <Textarea
            className="col-lg-11 col-sm-12"
            id="FormControlTextarea"
            defaultValue={props.description}
            onChange={props.descriptionChanged}
            name="description"
            minRows={3}
            maxRows={50}
          />
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
  descriptionChanged: PropTypes.func,
  description: PropTypes.string,
  directionChanged: PropTypes.func,
  direction: PropTypes.string,
  ingChanged: PropTypes.func,
  ingredients: PropTypes.string,
  handleSubmit: PropTypes.func,
  nameChanged: PropTypes.func,
  name: PropTypes.string
};

export default EditForm;
