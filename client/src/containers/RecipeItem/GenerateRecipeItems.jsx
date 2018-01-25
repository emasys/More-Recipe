import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Auth from '../../components/auth';

const GeneraterecipeItem = props => (
  <div>
    <div>
      <button
        className={`btn btn-success mb-5 ${props.state.save}`}
        onClick={props.handleImg}
      >
        Upload Image
      </button>
    </div>
    <figure
      className="img-wrapper"
      onMouseEnter={props.hoverIn}
      onMouseLeave={props.hoverOut}
    >
      {props.state.edit && (
        <div className={` changeDp hovered  ${props.state.status}`}>
          <Dropzone
            onDrop={props.handleDrop}
            accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
            multiple={false}
            className=" p-10 text-center text-light dropzone-dp"
          >
            click to upload / change picture
          </Dropzone>
        </div>
      )}

      <img
        src={props.state.preview || props.foodImg}
        alt="foodie"
        className="img-fluid rounded recipeImage"
      />
      {/* <figcaption className="text-center bolder">
        {props.state.recipeItem.recipe.name}
      </figcaption> */}
    </figure>
    <div className="d-inline mt-3 reaction-pane">
      <span className="text-center card-link" onClick={props.favIt}>
        <i
          className={`fa  ${
            props.state.favoriteStatus ?
              'fa-heart red animated bounceIn flash' :
              'fa-heart gray'
          } fa-2x`}
          aria-hidden="true"
          id="favorite"
        />
        <em className="bg-dark">{props.state.recipeItem.recipe.favorite}</em>
      </span>
      <span className="text-center card-link m-1" onClick={props.upvote}>
        <i
          className={`fa ${
            props.reactionUp.includes(Auth.userID()) ?
              'fa-thumbs-up animated bounceIn flash blue' :
              'fa-thumbs-up gray'
          } fa-2x`}
          aria-hidden="true"
          id="like"
        />
        <em className="bg-success">{props.state.recipeItem.recipe.upvote}</em>
      </span>
      <span className="text-center card-link m-1" onClick={props.downvote}>
        <i
          className={`fa ${
            props.reactionDown.includes(Auth.userID()) ?
              'fa-thumbs-down animated bounceIn flash red' :
              'fa-thumbs-down gray'
          } fa-2x`}
          aria-hidden="true"
          id="dislike"
        />
        <em className="bg-danger">{props.state.recipeItem.recipe.downvote}</em>
      </span>
      <span className="text-center card-link m-1" onClick={props.upvote}>
        <i
          className="fa fa-eye fa-2x"
          aria-hidden="true"
          id="views"
        />
        <em className=" bg-dark">{props.state.recipeItem.recipe.views}</em>
      </span>
      <span className="text-center card-link m-1" onClick={props.upvote}>
        <i
          className="fa fa-comments fa-2x"
          aria-hidden="true"
          id="views"
        />
        <em className=" bg-dark">{props.state.recipeItem.recipe.comments}</em>
      </span>
      <div className="m-1 float-right d-inline">
        <i className="fa fa-tag " aria-hidden="true" />
        <Link to={`/category/${props.state.recipeItem.recipe.category}`}>
          {props.state.recipeItem.recipe.category}
        </Link>
      </div>
    </div>
  </div>
);

GeneraterecipeItem.propTypes = {
  handleImg: PropTypes.func,
  state: PropTypes.object,
  hoverIn: PropTypes.func,
  hoverOut: PropTypes.func,
  handleDrop: PropTypes.func,
  favIt: PropTypes.func,
  upvote: PropTypes.func,
  downvote: PropTypes.func,
  foodImg: PropTypes.string
};
export default GeneraterecipeItem;
