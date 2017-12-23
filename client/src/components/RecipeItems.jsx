import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFavorite, getFavStatus } from '../actions';
/**
 * 
 * 
 * @class RecipeItems
 * @extends {Component}
 */
class RecipeItems extends Component {
  constructor(props) {
    super(props);

    this.generateItems = this.generateItems.bind(this);
    this.favIt = this.favIt.bind(this);
  }

  componentDidMount() {
    this.props.getFavStatus(this.props.id);
  }

  favIt() {
    this.props.setFavorite(this.props.id).then(res => {
      this.props.getFavStatus(this.props.id);
      this.componentDidMount();
    });
  }

  generateItems({ reactions }) {
    if (reactions) {
      const {
        id,
        name,
        views,
        comments,
        downvote,
        favorite,
        category,
        upvote
      } = reactions.recipe;

      return (
        <div className="col-lg-6 col-sm-12  mb-5 bg-dark">
          <figure>
            <img
              src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
              alt="foodie"
              className="img-fluid rounded w-100"
            />
            <figcaption>{name}</figcaption>
          </figure>
          <div className="d-inline">
            {console.log(this.props.favStatus.favStatus.success)}
            <span className="text-center card-link" onClick={this.favIt}>
              <i
                className={`fa  ${this.props.favStatus.favStatus.success
                  ? 'fa-heart red animated bounceIn flash'
                  : 'fa-heart-o'} fa-2x`}
                aria-hidden="true"
                id="favorite"
              />
              <em className="bg-dark">{favorite}</em>
            </span>
            <span className="text-center card-link m-1">
              <i className="fa fa-eye  fa-2x" aria-hidden="true" />
              <em className="bg-primary">{views}</em>
            </span>

            <span className="text-center card-link m-1">
              <i
                className="fa fa-thumbs-o-up fa-2x"
                aria-hidden="true"
                id="like"
              />
              <em className="bg-success">{upvote}</em>
            </span>
            <span className="text-center card-link m-1">
              <i
                className="fa fa-thumbs-o-down fa-2x"
                aria-hidden="true"
                id="dislike"
              />
              <em className="bg-danger">{downvote}</em>
            </span>

            <span className="text-center card-link m-1">
              <i className="fa fa-comment-o  fa-2x" aria-hidden="true" />
              <em className="bg-dark">{comments}</em>
            </span>
          </div>
          <div className="mt-3">
            <a href="#" className="btn btn-danger btn-sm" role="button">
              CATEGORY <i
                className="fa fa-chevron-right"
                aria-hidden="true"
              />{' '}
              {category}
            </a>
          </div>
        </div>
      );
    }
  }
  render() {
    return <div className="">{this.generateItems(this.props)}</div>;
  }
}

const mapStateToProps = state => {
  // console.log(state.favStatus);
  return {
    favorite: state.favorite,
    favStatus: state.favStatus
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ setFavorite, getFavStatus }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeItems);
