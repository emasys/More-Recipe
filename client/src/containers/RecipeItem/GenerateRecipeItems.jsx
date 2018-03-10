import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import approx from 'approximate-number';
import ReactTooltip from 'react-tooltip';

/**
 * Generate recipe detail
 *
 * @param {object} props
 * @returns {JSX.Element}
 * React element
 */
const GenerateRecipeItem = props => {
  const {
    auth,
    state: {
      save,
      status,
      preview,
      favoriteStatus,
      recipeItem: {
        recipe: {
          favorite, upvote, downvote, views, category
        }
      }
    }
  } = props;
  return (
    <div className="mb-20">
      <div>
        <button
          className={`btn btn-success mb-5 ${save}`}
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
          <div className={` changeDp hovered  ${status}`}>
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
          src={preview || props.foodImg}
          alt="foodie"
          className="img-fluid rounded recipeImage"
        />
      </figure>
      <div className="d-inline mt-3 reaction-pane justify-content-center">
        <span className="text-center card-link" onClick={props.favIt}>
          <i
            data-tip="Add to favorites"
            className={`material-icons hovered ${
              favoriteStatus ? ' red animated bounceIn flash' : 'gray'
            }`}
          >
            &#xE87D;
          </i>
          <em className="bold">{approx(favorite)}</em>
        </span>
        <span className="text-center card-link mr-1" onClick={props.upvote}>
          <i
            data-tip="upvote"
            className={`material-icons ${
              props.reactionUp.includes(auth.authInfo.userId) ?
                ' animated bounceIn flash blue' :
                ' gray'
            } fa-2x`}
            aria-hidden="true"
            id="like"
          >
            &#xE8DC;
          </i>
          <em className="">{approx(upvote)}</em>
        </span>
        <span className="text-center card-link mr-1" onClick={props.downvote}>
          <i
            data-tip="Downvote"
            className={`material-icons ${
              props.reactionDown.includes(auth.authInfo.userId) ?
                ' animated bounceIn flash red' :
                ' gray'
            }`}
            aria-hidden="true"
            id="dislike"
          >
            &#xE8DB;
          </i>
          <em style={{ verticalAlign: 'middle' }}>{approx(downvote)}</em>
        </span>
        <span className="text-center card-link m-1">
          <i data-tip="Views" className="material-icons gray">
            &#xE417;
          </i>
          <em>{approx(views)}</em>
        </span>
        <ReactTooltip place="bottom" type="dark" effect="float" />
      </div>
      <hr />
      <span className="labels float-right px-1">
        <i className="material-icons gray">&#xE892;</i>
        <Link
          data-tip="Category"
          className=" text-dark rounded "
          to={`/category/${category.toLowerCase()}`}
        >
          {category}
        </Link>
      </span>
    </div>
  );
};

GenerateRecipeItem.propTypes = {
  handleImg: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  hoverIn: PropTypes.func.isRequired,
  hoverOut: PropTypes.func.isRequired,
  handleDrop: PropTypes.func.isRequired,
  favIt: PropTypes.func.isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
  foodImg: PropTypes.string.isRequired,
  reactionDown: PropTypes.array.isRequired,
  reactionUp: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};
export default GenerateRecipeItem;
