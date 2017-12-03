import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserRecipes, getUserInfo } from '../actions';
import Fade from 'react-reveal/Fade';

//component
import Navbar from './Navbar';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 6,
    };
    this.generateRecipes = this.generateRecipes.bind(this);
    this.generateUserInfo = this.generateUserInfo.bind(this);
    this.viewMore = this.viewMore.bind(this);
  }

  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id);
    this.props.getUserRecipes(this.state.limit, this.props.match.params.id).then(() => {
      console.log(this.props.userInfo);
      this.setState(prevState => {
        return {
          limit: prevState.limit + 6,
        };
      });
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
            <div style={{ overflow: 'hidden' }}>
              <Fade bottom>
                <Link to={`/recipe/${item.id}`} className="hvr-bounce-out">
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
                      <Link to={`/category/${item.category}`}>
                        <span className="tag bg-danger">{item.category}</span>
                      </Link>
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
              </Fade>
            </div>
          </div>
        );
      });
    }
  }

  generateUserInfo(data) {
    if (data) {
      // console.log(data.data);
      const { id, firstName, lastName, bio, email, avatar, country, moniker } = data.data;
      return (
        <div className="col-lg-4 col-sm-12 mr-5 mb-10">
          <img src={avatar} alt="foodie" className="img-fluid rounded mb-3" />
          <div className="bg-light rounded p-10">
            <h2 className="mb-10 bolder">
              {`${firstName} ${lastName} `}
              (<small className="header-title">{moniker}</small>)
            </h2>
            <p>
              {bio}
              <hr />
            </p>
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

  viewMore() {
    this.componentDidMount();
  }
  render() {
    return (
      <div>
        <Navbar />
        <section className="container profile catalog-wrapper">
          <div className="row justify-content-center">
            {this.generateUserInfo(this.props.userInfo)}
            <div className="col-lg-7 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h2 className="fresh-title float-left clearfix">Recipes </h2>
              </div>

              <hr />

              <div className="row justify-content-center">
                {this.generateRecipes(this.props.user)}
              </div>
              <div className="text-center">
                <button className="btn btn-dark" onClick={this.viewMore}>
                  View More
                </button>
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
    userInfo: state.signin.userInfo,
  };
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getUserRecipes, getUserInfo }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
