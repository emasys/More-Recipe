import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';

// Modal
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

//component
import Navbar from './Navbar';
import config from '../config';
import * as actions from '../actions';
import Auth from './auth';
/**
 *
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);

    this.toastId = null;

    this.state = {
      limit: 6,
      view: false,
      status: 'fade',
      preview: '',
      files: '',
      open: false,
      firstName: '',
      lastName: '',
      bio: '',
      edit: false,
      successMsg: false,
      save: 'd-none',
      showMore: false
    };
    this.generateRecipes = this.generateRecipes.bind(this);
    this.generateUserInfo = this.generateUserInfo.bind(this);
    this.viewMore = this.viewMore.bind(this);
    this.changeDp = this.changeDp.bind(this);
    this.hoverIn = this.hoverIn.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleImg = this.handleImg.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.editProfile = this.editProfile.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  /**
   *
   *
   * @memberof Profile
   * @returns {any} cdm
   */
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id);
    this.props.getUserRecipes(this.state.limit, Auth.userID());
  }

  /**
   *
   *
   * @param {any} nextProps
   * @memberof Profile
   * @returns {any} a new state
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      if (nextProps.user.recipes.length > 5) {
        this.setState({
          showMore: true
        });
      }
    }
    if (nextProps.userInfo) {
      this.setState({
        userInfo: nextProps.userInfo,
        firstName: nextProps.userInfo.data.firstName,
        lastName: nextProps.userInfo.data.lastName,
        bio: nextProps.userInfo.data.bio
      });
    }
  }
  /**
   *
   *
   * @param {object} nextProps
   * @param {object} nextState
   * @memberof Profile
   * @returns {any}
   * invoked immediately before rendering
   * when new props or state are being received.
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.limit > this.state.limit) {
      this.props.getUserRecipes(nextState.limit, Auth.userID());
    }
  }
  /**
   *
   * @returns {any} a new state
   * @memberof Profile
   */
  changeDp() {
    console.log('change');
  }
  /**
   *
   * @returns {any} a new state
   * @memberof Profile
   */
  hoverIn() {
    this.setState({ status: 'show' });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to true
   */
  onOpenModal() {
    this.setState({ open: true });
  }
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to false
   */
  onCloseModal() {
    this.setState({ open: false });
  }
  /**
   *
   * @returns {any} a new state
   * @memberof Profile
   */
  hoverOut() {
    this.setState({ status: 'fade' });
  }

  /**
   *
   *
   * @param {any} files
   * @memberof AddRecipe
   * @returns {object} a preview of image
   */
  handleDrop(files) {
    const [{ preview }] = files;
    this.setState({ preview, files, save: 'show' });
  }
  /**
   *
   *
   * @returns {object}
   * upload status
   * @memberof Profile
   */
  notify() {
    this.toastId = toast('Uploading...', { autoClose: false });
    return this.toastId;
  }

  saveInfo = () => toast("Saved !", {type: toast.TYPE.SUCCESS,autoClose: 1000, });

  update = () =>
    toast.update(this.toastId, {
      render: 'Upload complete!',
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      className: css({
        transform: 'rotateY(360deg)',
        transition: 'transform 0.6s'
      })
    });
  /**
   *
   *
   * @param {any} files
   * @memberof AddRecipe
   * @returns {object} a preview of image
   */
  handleImg() {
    const { files } = this.state;
    console.log(files);
    let query = {
      avatar: ''
    };
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tags', `morerecipe`);
      formData.append('upload_preset', config.UPLOAD_PRESET);
      formData.append('api_key', config.API_KEY);
      formData.append('timestamp', (Date.now() / 1000) | 0);

      return axios
        .post('https://api.cloudinary.com/v1_1/emasys/image/upload', formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        })
        .then(response => {
          const resdata = response.data;
          query.avatar = resdata.secure_url;
        });
    });

    axios.all(uploaders).then(() => {
      // perform after upload is successful operation
      this.props.updateUser(this.props.match.params.id, query).then(() => {
        console.log('saved');
        this.props.getUserInfo(this.props.match.params.id);
        this.update();
        this.setState({
          save: 'd-none'
        });
      });
    });
  }
  /**
   *
   *
   * @param {any} data
   * @returns {any} jsx
   * @memberof Profile
   */
  generateRecipes(data) {
    if (data) {
      return data.recipes.map((item, index) => (
        <div
          key={index}
          className="col-lg-5 col-md-6 col-sm-6 mb-20 animate-catalog"
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
      ));
    }
  }
  /**
   *
   * @returns {bool}
   * edit state
   * @memberof Profile
   */
  showForm() {
    this.setState({
      edit: true
    });
  }
  /**
   *
   *
   * @param {any} data
   * @returns {any} user data
   * @memberof Profile
   */
  generateUserInfo(data) {
    if (data) {
      const {
        firstName,
        lastName,
        bio,
        email,
        avatar,
        moniker,
        country
      } = data.data;

      const { status, preview, save } = this.state;
      return (
        <div className="col-lg-4 col-md-4 col-sm-12 mr-5 mb-10">
          <div
            className="img-wrapper"
            onMouseEnter={this.hoverIn}
            onMouseLeave={this.hoverOut}
          >
            <div
              className={` changeDp hovered  ${status}`}
              onClick={this.changeDp}
            >
              <Dropzone
                onDrop={this.handleDrop}
                accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                multiple={false}
                className=" p-10 text-center text-light dropzone-dp"
              >
                click to change profile picture
              </Dropzone>
            </div>
            <img
              src={preview || avatar || config.DEFAULT_DISPLAY_PICTURE}
              alt="avi"
              className="img-fluid rounded mb-3"
            />
          </div>
          <div className="bg-light rounded p-10 profile-wrapper">
            <h2 className="mb-10 bolder">
              {`${firstName} ${lastName} `}
              (<small className="header-title">{moniker}</small>)
            </h2>
            <div>
              <p>{bio}</p>
              <hr />
            </div>
            <p>
              <i className="fa fa-envelope" aria-hidden="true" /> {email}
            </p>
            <p className=" text-capitalize">
              <i className="fa fa-map-marker" aria-hidden="true" /> {country}
            </p>
            <div>
              <button
                className={`btn btn-dark btn-lg ${save}`}
                onClick={() => {
                  this.handleImg();
                  this.notify();
                }}
              >
                save update
              </button>
            </div>
            <div className="mt-5">
              {Auth.moniker() === 'admin' ? (
                <Link to="/manageUsers" className="btn btn-lg btn-light">
                  {' '}
                  Manage Users
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className="mt-5">
              <button className="btn btn-dark" onClick={this.showForm}>
                Edit profile
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  /**
   *
   * @returns {object} validates data and trigger the update user endpoint
   * @param {any} event
   * @memberof Profile
   */
  editProfile(event) {
    event.preventDefault();
    const data = {
      firstName: event.target.elements.fname.value.trim(),
      lastName: event.target.elements.lname.value.trim(),
      bio: event.target.elements.bio.value.trim()
    };
    // Test for whitespace and digits
    const re = /[\s\d]/;
    let firstName = true,
      lastName = true;
    if (re.test(data.firstName) || data.firstName === '') {
      document.querySelector('#firstname_error').innerHTML =
        'Please enter a valid name';
      firstName = false;
    } else {
      document.querySelector('#firstname_error').innerHTML = '';
      firstName = true;
    }

    if (re.test(data.lastName) || data.lastName === '') {
      document.querySelector('#lastname_error').innerHTML =
        'Please enter a valid name';
      lastName = false;
    } else {
      document.querySelector('#lastname_error').innerHTML = '';
      lastName = true;
    }
    if (lastName && firstName) {
      this.props.updateUser(this.props.match.params.id, data).then(() => {
        this.props.getUserInfo(this.props.match.params.id);
        this.saveInfo();
        this.setState({
          edit: false
        });
      });
    }
  }
  /**
   *
   *
   * @returns {any} current data in the db to be edited
   * @memberof Profile
   */
  getEditForm() {
    const { firstName, lastName, bio } = this.state;
    return (
      <form onSubmit={this.editProfile}>
        <ul className="form row">
          <li className="col-lg-6 col-sm-12">
            <label>First Name</label>
            <input
              type="text"
              required
              placeholder="First Name"
              className="col-lg-11 col-sm-12"
              name="fname"
              defaultValue={firstName}
            />
            <div className="text-danger" id="firstname_error" />
          </li>
          <li className="col-lg-6 col-sm-12">
            <label>Last Name</label>
            <input
              type="text"
              required
              placeholder="Last Name"
              className="col-lg-11 col-sm-12"
              name="lname"
              defaultValue={lastName}
            />
            <div className="text-danger" id="lastname_error" />
          </li>
          <li className="col-lg-6 col-sm-12">
            <label>Bio</label>
            <textarea
              className="col-lg-11 col-sm-12"
              id="FormControlTextarea"
              name="bio"
              defaultValue={bio}
              rows="4"
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
    );
  }
  /**
   *
   *
   * @memberof Profile
   * @returns {any} pagination
   */
  viewMore() {
    this.setState(prevState => ({
      limit: prevState.limit + 2
    }));
  }
  /**
   *
   *
   * @memberof Profile
   * @returns {any} render
   */
  render() {
    const {
      userInfo, showMore, open, edit
    } = this.state;
    return (
      <div>
        <Navbar />
        <ToastContainer />
        <Modal open={open} onClose={this.onCloseModal} little>
          <h2>Edit Profile</h2>
          {this.getEditForm()}
        </Modal>
        <section className="container profile catalog-wrapper">
          <div className="row justify-content-center">
            {this.generateUserInfo(userInfo)}
            {edit && this.getEditForm()}
            {!edit && (
              <div className="col-lg-7 col-md-7 col-sm-12 recipe-lists">
                <div className="clearfix">
                  <h2 className="fresh-title float-left clearfix">Recipes </h2>
                  <Link
                    className="btn btn-dark float-right clearfix"
                    role="button"
                    to="/new"
                  >
                    Add New Recipes
                  </Link>
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
            )}
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.recipes.userRecipes,
  userInfo: state.user.userInfo,
  updateUser: state.user.updateUser
});

export default connect(mapStateToProps, actions)(Profile);
