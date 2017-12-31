import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import * as actions from '../actions';

//component
import Navbar from './Navbar';
import config from '../config';
/**
 *
 *
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  /**
   * Creates an instance of UserProfile.
   * @param {any} props
   * @memberof UserProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      limit: 6,
      showMore: false
    };
    this.generateRecipes = this.generateRecipes.bind(this);
    this.generateUserInfo = this.generateUserInfo.bind(this);
    this.viewMore = this.viewMore.bind(this);
  }
  /**
   *
   *
   * @memberof UserProfile
   * @returns {any} cdm
   */
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id);
    this.props.getUserRecipes(this.state.limit, this.props.match.params.id);
  }
  /**
   *
   * @returns {any} cwr
   * @param {any} nextProps
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      console.log(nextProps.user.recipes);
      if (nextProps.user.recipes.length > 5) {
        this.setState({
          showMore: true
        });
      }
    }
  }

   /**
   *
   *
   * @param {object} nextProps
   * @param {object} nextState
   * @memberof UserProfile
   * @returns {any}
   * invoked immediately before rendering
   * when new props or state are being received.
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.limit > this.state.limit) {
      this.props.getUserRecipes(nextState.limit, this.props.match.params.id);
    }
  }

  /**
   *
   *
   * @param {any} data
   * @returns {object} recipe list
   * @memberof UserProfile
   */
  generateRecipes(data) {
    if (data) {
      return data.recipes.map((item, index) => (
        <div
          key={index}
          className="col-lg-5 col-md-6 col-sm-6  mb-20 animate-catalog"
          data-animate="bounceIn"
          data-duration="1.0s"
          data-delay="0.1s"
          data-offset="100"
        >
          <div>
            <Fade bottom>
              <Link to={`/recipe/${item.id}`} className="hvr-grow-shadow">
                <div className="card animate">
                  <div className="description">
                    <h6>Description</h6>
                    {item.description}
                  </div>
                  <img
                    className="card-img-top profile-img-box"
                    src={item.foodImg}
                    alt="Card image cap"
                  />
                  <div className="card-body p-0 text-center social-icons">
                    <span className="tag bg-danger">{item.category}</span>
                    <h6 className="card-title custom-bg bg-secondary p-2 m-0 text-truncate ">
                      {item.name.length > 25 ? item.name.slice(0, 15).concat("...") : item.name }
                    </h6>
                    <span>
                      <i className="fa fa-heart-o" aria-hidden="true" />
                      {item.favorite}
                    </span>
                    <span>
                      <i className="fa fa-thumbs-o-up" aria-hidden="true" />
                      {item.upvote}
                    </span>
                    <span>
                      <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                      {item.downvote}
                    </span>
                    <span>
                      <i className="fa fa-eye" aria-hidden="true" />
                      {item.views}
                    </span>
                    <span>
                      <i className="fa fa-comment-o" aria-hidden="true" />
                      {item.comments}
                    </span>
                  </div>
                </div>
              </Link>
            </Fade>
          </div>
        </div>
      ));
    }
  }
  /**
   *
   *
   * @param {any} data
   * @returns {object} user data
   * @memberof UserProfile
   */
  generateUserInfo(data) {
    if (data) {
      const {
        firstName,
        lastName,
        bio,
        email,
        avatar,
        country,
        moniker
      } = data.data;
      return (
        <div className="col-lg-4 col-md-4 col-sm-12 mb-10">
          <img
            src={
              avatar || config.DEFAULT_DISPLAY_PICTURE
            }
            alt="avi"
            className="img-fluid rounded mb-3"
          />
          <div className="bg-light rounded p-10">
            <h2 className="mb-10 bolder">
              {`${firstName} ${lastName} `}
              (<small className="header-title">{moniker}</small>)
            </h2>
            <p>{bio}</p>
            <hr />

            <p>
              <i className="fa fa-envelope" aria-hidden="true" /> {email}
            </p>
            <p className=" text-capitalize">
              <i className="fa fa-map-marker" aria-hidden="true" /> {country}
            </p>
          </div>
        </div>
      );
    }
  }
  /**
   *
   *
   * @memberof UserProfile
   * @returns {any} pagination
   */
  viewMore() {
    this.setState(prevState => ({
      limit: prevState.limit + 6
    }));
  }
  /**
   *
   *
   * @returns {any} render
   * @memberof UserProfile
   */
  render() {
    const { showMore } = this.state;
    return (
      <div>
        <Navbar />
        <section className="container profile catalog-wrapper">
          <div className="row justify-content-center">
            {this.generateUserInfo(this.props.userInfo)}
            <div className="col-lg-7 col-md-7 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h2 className="fresh-title float-left clearfix">{
                  this.props.userInfo ? this.props.userInfo.data.moniker : null
                }'s Recipes </h2>
              </div>
              <hr />
              <div className="row justify-content-center">
                {this.generateRecipes(this.props.user)}
              </div>
              <div className="text-center">
                {showMore && (
                  <button className="btn btn-dark" onClick={this.viewMore}>
                    View More
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.recipes.userRecipes,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, actions)(UserProfile);
