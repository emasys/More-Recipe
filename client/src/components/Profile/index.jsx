import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';

// Modal
import 'react-responsive-modal/lib/react-responsive-modal.css';

//component
import Navbar from '../Navbar';
import UserInfo from './UserInfo';
import * as actions from '../../actions';
import UserRecipes from './UserRecipes';
import UserEditForm from './UserEditForm';
import Auth from '../auth';
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
  changeDp = () => {
    console.log('change');
  };
  /**
   *
   * @returns {any} a new state
   * @memberof Profile
   */
  hoverIn = () => {
    this.setState({ status: 'show' });
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to true
   */
  onOpenModal = () => {
    this.setState({ open: true });
  };
  /**
   *
   *
   * @memberof RecipeItem
   * @returns {bool} sets modal display to false
   */
  onCloseModal = () => {
    this.setState({ open: false });
  };
  /**
   *
   * @returns {any} a new state
   * @memberof Profile
   */
  hoverOut = () => {
    this.setState({ status: 'fade' });
  };

  /**
   *
   *
   * @param {any} files
   * @memberof AddRecipe
   * @returns {object} a preview of image
   */
  handleDrop = files => {
    const [{ preview }] = files;
    this.setState({ preview, files, save: 'show' });
  };
  /**
   *
   *
   * @returns {object}
   * upload status
   * @memberof Profile
   */
  notify = () => {
    this.toastId = toast('Uploading...', { autoClose: false });
    return this.toastId;
  };

  saveInfo = () =>
    toast('Saved !', { type: toast.TYPE.SUCCESS, autoClose: 1000 });

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
  handleImg = () => {
    const { files } = this.state;
    console.log(files);
    let query = {
      avatar: ''
    };

    const file = files[0];
    this.props.uploadImg(file).then(() => {
      query.avatar = this.props.recipes.uploadedImg;
      // for poor/no internet connection
      if (typeof query.avatar === 'object') return this.failedUpdate();
      this.props.updateUser(this.props.match.params.id, query).then(() => {
        this.props.getUserInfo(this.props.match.params.id);
        this.update();
        this.setState({
          save: 'd-none',
          status: 'fade'
        });
      });
    });
  };
  /**
   *
   * @returns {bool}
   * edit state
   * @memberof Profile
   */
  showForm = () => {
    this.setState({
      edit: true,
      status: 'show'
    });
  };

  /**
   *
   * @returns {object} validates data and trigger the update user endpoint
   * @param {any} event
   * @memberof Profile
   */
  editProfile = event => {
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
  };
  /**
   *
   *
   * @memberof Profile
   * @returns {any} pagination
   */
  viewMore = () => {
    this.setState(prevState => ({
      limit: prevState.limit + 2
    }));
  };
  /**
   *
   *
   * @memberof Profile
   * @returns {any} render
   */
  render() {
    const { userInfo, showMore, edit } = this.state;
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <ToastContainer />
        <section className="container profile catalog-wrapper">
          <div className="row justify-content-center">
            <UserInfo
              state={this.state}
              data={userInfo}
              showForm={this.showForm}
              hoverIn={this.hoverIn}
              hoverOut={this.hoverOut}
              changeDp={this.changeDp}
              handleDrop={this.handleDrop}
              handleImg={this.handleImg}
              notify={this.notify}
            />
            {edit && (
              <UserEditForm state={this.state} editProfile={this.editProfile} />
            )}
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
                  <UserRecipes data={this.props.user} />
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
  recipes: state.recipes,
  userInfo: state.user.userInfo,
  updateUser: state.user.updateUser
});

export default connect(mapStateToProps, actions)(Profile);
