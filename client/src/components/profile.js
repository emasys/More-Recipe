import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserRecipes, getUserInfo } from '../actions';

//component
import Navbar from './navbar';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.generateRecipes = this.generateRecipes.bind(this);
  }

  componentDidMount() {
    this.props.getUserRecipes(5).then(() => {
      const userId = this.props.user.recipes[0].userId;
      this.props.getUserInfo(userId);
    });
  }

  generateRecipes(data) {
    if (data) {
      return data.recipes.map((item, index) => {
        return (
          <div
            key={index}
            className="col-lg-4 col-sm-12 mb-3  col-md-4 animate-catalog"
            data-animate="bounceIn"
            data-duration="1.0s"
            data-delay="0.1s"
            data-offset="100"
          >
            <Link to={`/recipe/${item.id}`}>
              <div className="card animate">
                <div className="description">
                  <h6>Description</h6>
                  {item.description}
                </div>
                <img
                  className="card-img-top"
                  src="../../../img/e5bf6d96d76b37f6da3351b4bff7b0e9--african-vegan-recipes-vegan-african-food.jpg"
                  alt="Card image cap"
                />
                <div className="card-body p-0 text-center social-icons">
                  <a href="#">
                    <span className="tag bg-danger">{item.category}</span>
                  </a>
                  <h6 className="card-title custom-bg bg-secondary p-2 m-0 text-truncate ">
                    {item.name}
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
          </div>
        );
      });
    }
  }

  generateUserInfo(data) {
    if (data) {
      // console.log(data.data);
      const { id, firstName, lastName, bio, email } = data.data;
      return (
        <div className="col-lg-4 col-sm-12 mr-5">
          <img
            src="img/Profile_avatar_placeholder_large.png"
            alt="foodie"
            className="img-fluid rounded mb-3"
          />
          <h4>Name: {`${firstName} ${lastName}`}</h4>
          <p>email: {email}</p>
          <p>
            <i className="fa fa-map-marker" aria-hidden="true" /> Nigeria
          </p>
          <hr />
          <p>
            Bio
            <hr />
            {bio}
          </p>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <section className="container profile">
          <div className="row justify-content-center">
            {/* <div className="col-lg-4 col-sm-12 mr-5">
              <img
                src="img/Profile_avatar_placeholder_large.png"
                alt="foodie"
                className="img-fluid rounded mb-3"
              />
              <h4>John Doe</h4>
              <p>
                <i className="fa fa-at" aria-hidden="true" /> johndoe@gmail.com
              </p>
              <p>
                <i className="fa fa-map-marker" aria-hidden="true" /> Nigeria
              </p>
              <hr />
              <p>
                ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis
                eos blanditiis voluptate nostrum ea at cum eum perferendis
                possimus, amet fugit id omnis doloribus laboriosam corporis
                itaque, laborum sint magni.
              </p>
            </div> */}
            {this.generateUserInfo(this.props.userInfo)}
            <div className="col-lg-7 col-sm-12 recipe-lists">
              <h4>Recipes </h4>
              <hr />
              <Link className="btn btn-dark btn-lg  " role="button" to="/new">
                Add New Recipes
              </Link>

              <hr />
              <div className="row justify-content-center">
                {this.generateRecipes(this.props.user)}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.recipes.userRecipes);
  return {
    user: state.recipes.userRecipes,
    userInfo: state.signin.userInfo
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getUserRecipes, getUserInfo }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
