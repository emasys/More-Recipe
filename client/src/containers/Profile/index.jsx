import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { css } from 'glamor';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

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

// Helper function
import validate from './helper';

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
    userInfo: PropTypes.object.isRequired,
    recipes: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    delRecipe: PropTypes.func.isRequired
  };

  // static defaultProps = {
  //   userInfo: {
  //     id: 1
  //   }
  // };
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
    if (this.state.offset >= nextProps.count) {
      this.setState({
        showMore: false
      });
    } else {
      this.setState({
        showMore: true
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

  loadMore = event => {
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
    this.props.delRecipe(this.recipeId, this.props.auth.authInfo.userId);
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
    const file = files[0];
    this.props.uploadImg(file, this.props.match.params.id).then(() => {
      this.update();
      this.setState({
        save: 'd-none',
        status: 'fade'
      });
      // });
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
   * @param {object} event
   * @memberof Profile
   * @returns {any} pagination
   */
  viewMore = event => {
    event.preventDefault();
    this.loadMore();
  };
  /**
   *
   * @param {object} event
   * @memberof Profile
   * @returns {any} pagination
   */
  goBack = event => {
    event.preventDefault();
    this.setState({ edit: false });
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
        <section className="container-fluid profile catalog-wrapper-full-grid mt-70">
          <div className="row justify-content-center">
            <DeleteModal {...this.props} confirmDelete={this.confirmDelete} />
            <UserInfo
              state={this.state}
              data={userInfo}
              count={this.props.count}
              showForm={this.showForm}
              hoverIn={this.hoverIn}
              hoverOut={this.hoverOut}
              handleDrop={this.handleDrop}
              handleImg={this.handleImg}
              notify={this.notify}
              auth={this.props.auth}
            />
            {edit && (
              <div className="col-lg-6 col-md-6 col-sm-12">
                <UserEditForm
                  state={this.state}
                  editProfile={this.editProfile}
                  goBack={this.goBack}
                />
              </div>
            )}
            {!edit && (
              <div className="col-lg-10 col-md-9 col-sm-6 col-12 recipe-lists">
                <div className="clearfix">
                  <h2 className=" float-left clearfix">
                    Recipes{' '}
                    <span
                      data-tip="Total number of recipes added"
                      className="badge badge-dark"
                    >
                      {this.props.count}
                    </span>
                  </h2>
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
                    catalog={this.props.recipes}
                  />
                </div>
                <div className="row justify-content-center">
                  {showMore && (
                    <button
                      onClick={this.viewMore}
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
        <ReactTooltip place="bottom" type="dark" effect="float" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.userRecipes,
  count: state.recipes.userRecipesCount,
  userInfo: state.user.userInfo,
  auth: state.user,
  updateUser: state.user.updateUser
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
