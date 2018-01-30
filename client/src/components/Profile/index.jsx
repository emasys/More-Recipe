import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from 'glamor';

// Modal
import 'react-responsive-modal/lib/react-responsive-modal.css';

//component
import Navbar from '../Navbar';
import UserInfo from './UserInfo';
import * as actions from '../../actions';
import UserEditForm from './UserEditForm';
import CatalogList from '../CatalogList';

// Helper function
import { validate } from './helper';
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
      offset: 0,
      recipes: [],
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
    this.loadMore();
  }

  /**
   *
   *
   * @param {any} nextProps
   * @memberof Profile
   * @returns {any} a new state
   */
  componentWillReceiveProps(nextProps) {
    console.log("nextprops",nextProps.user);
    this.setState(prevState => ({
      recipes: nextProps.user
    }));
    if (this.state.offset - 6 > this.state.recipes.length) {
      this.setState({
        showMore: false
      });
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

  componentWillUnmount = () => {
    this.props.clearRecipes();
  };

  loadMore = () => {
    this.props.getUserRecipes(
      this.props.match.params.id,
      this.state.limit,
      this.state.offset
    );
    this.setState(prevState => ({
      offset: prevState.offset + 6
    }));
  };

  failedUpdate = () =>
    toast.update(this.toastId, {
      render: 'error, try again',
      type: toast.TYPE.ERROR,
      autoClose: 3000,
      className: css({
        transform: 'rotateY(360deg)',
        transition: 'transform 0.6s'
      })
    });
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
    if (validate(data)) {
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
        <section className="container-fluid profile catalog-wrapper mt-70">
          <div className="row justify-content-center mx-3">
            <UserInfo
              state={this.state}
              data={userInfo}
              showForm={this.showForm}
              hoverIn={this.hoverIn}
              hoverOut={this.hoverOut}
              handleDrop={this.handleDrop}
              handleImg={this.handleImg}
              notify={this.notify}
            />
            {edit && (
              <div className="col-lg-6 col-md-6 col-sm-12">
                <UserEditForm
                  state={this.state}
                  editProfile={this.editProfile}
                />
              </div>
            )}
            {!edit && (
              <div className="col-lg-10 col-md-8 col-sm-12 recipe-lists">
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
                  <CatalogList {...this.props} catalog={this.state.recipes} />
                </div>
                <div className="row justify-content-center">
                  {showMore && (
                    <button
                      onClick={this.loadMore}
                      className=" btn btn-lg btn-outline-dark text-center"
                    >
                      View more
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
