import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

// Actions
import {
  getUserInfo,
  getUserRecipes,
  updateUser
} from '../../actions/userActions';
import { clearRecipes, delRecipe } from '../../actions/recipeActions';
import { uploadImg } from '../../actions';

//component
import Navbar from '../../components/Navbar';
import UserInfo from './UserInfo';
import UserEditForm from './UserEditForm';
import CatalogList from '../../components/CatalogList';
import DeleteModal from './DeleteModal';
import Auth from '../../components/auth';
import Preloader from '../../components/Preloader';

// Helper function
import { validate } from './helper';

/**
 *@param {object} event
 *@param {number} recipeId
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  static propTypes = {
    getUserInfo: PropTypes.func.isRequired,
    getUserRecipes: PropTypes.func.isRequired,
    clearRecipes: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    uploadImg: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.array.isRequired,
    userInfo: PropTypes.object,
    recipes: PropTypes.object.isRequired,
    delRecipe: PropTypes.func.isRequired
  };

  static defaultProps = {
    userInfo: {
      id: 1
    }
  };
  /**
   * Creates an instance of Profile.
   * @param {any} props
   * @memberof Profile
   */
  constructor(props) {
    super(props);

    this.toastId = null;
    this.recipeId = null;

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
      country: '',
      edit: false,
      successMsg: false,
      save: 'd-none',
      showMore: true
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
        bio: nextProps.userInfo.data.bio,
        country: nextProps.userInfo.data.country
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

  hoverIn = () => {
    this.setState({ status: 'show' });
  };
  /**
   *
   * @returns {any} a new state
   * @memberof Profile
   */
  hoverOut = () => {
    this.setState({ status: 'fade' });
  };

  deleteRecipe = (event, recipeId) => {
    event.preventDefault();
    this.recipeId = recipeId.id;
  };

  confirmDelete = event => {
    event.preventDefault();
    this.props.delRecipe(this.recipeId, Auth.userID());
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
      firstName: event.target.elements.firstName.value.trim(),
      lastName: event.target.elements.lastName.value.trim(),
      bio: event.target.elements.bio.value.trim(),
      country: event.target.elements.country.value
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
        <Preloader />
        <ToastContainer />
        <section className="container-fluid profile catalog-wrapper mt-70">
          <div className="row justify-content-center mx-3">
            <DeleteModal {...this.props} confirmDelete={this.confirmDelete} />
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
                  <h2 className=" float-left clearfix">Recipes </h2>
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
                  <CatalogList
                    {...this.props}
                    showDeleteBtn
                    deleteRecipe={this.deleteRecipe}
                    catalog={this.state.recipes}
                  />
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
  updateUser: state.user.updateUser,
  netReq: state.netReq
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getUserInfo,
      getUserRecipes,
      clearRecipes,
      updateUser,
      uploadImg,
      delRecipe
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
