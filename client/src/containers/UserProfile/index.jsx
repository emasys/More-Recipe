import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';


// Action
import { getUserInfo, getUserRecipes } from '../../actions/userActions';
import { clearRecipes } from '../../actions/recipeActions';

//component
import Navbar from '../../components/Navbar';
import CatalogList from '../../components/CatalogList';
import UserProfileInfo from './UserProfileInfo';
import Preloader from '../../components/Preloader';
/**
 *
 *
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    getUserRecipes: PropTypes.func.isRequired,
    clearRecipes: PropTypes.func.isRequired,
    user: PropTypes.array.isRequired,
    getUserInfo: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    recipes: PropTypes.object.isRequired
  };
  /**
   * Creates an instance of UserProfile.
   * @param {any} props
   * @memberof UserProfile
   */
  constructor(props) {
    super(props);
    this.state = {
      limit: 6,
      offset: 0,
      recipes: [],
      showMore: true
    };
  }
  /**
   *
   *
   * @memberof UserProfile
   * @returns {any} cdm
   */
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id);
    this.loadMore();
  }
  /**
   *
   * @returns {any} cwr
   * @param {any} nextProps
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
      recipes: nextProps.user
    }));
    if (this.state.offset > this.props.count) {
      this.setState({
        showMore: false
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
  /**
   *
   *
   * @memberof UserProfile
   * @returns {any} pagination
   */
  viewMore = () => {
    this.setState(prevState => ({
      limit: prevState.limit + 6
    }));
  };
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
        <Navbar className="bg-dark fixed-top" />
        <Preloader />
        <section className="container-fluid profile catalog-wrapper-full-grid mt-80">
          <div className="row justify-content-center">
            <UserProfileInfo data={this.props.userInfo} />
            <div className="col-lg-9 col-md-8 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h4 className="header-title float-left clearfix">
                  {this.props.userInfo ?
                    this.props.userInfo.data.moniker :
                    'loading'}
                  {"'"}s recipes
                  {` `}
                  <span
                    data-tip="Total number of recipes added"
                    className="badge badge-dark"
                  >
                    {this.props.count}
                  </span>
                </h4>
              </div>
              <hr />
              <div className="row justify-content-center">
                <CatalogList
                  {...this.props}
                  showDeleteBtn={false}
                  catalog={this.props.recipes}
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
          </div>
          <ReactTooltip place="bottom" type="dark" effect="float" />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes.userRecipes,
  userInfo: state.user.userInfo,
  count: state.recipes.userRecipesCount
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getUserInfo, getUserRecipes, clearRecipes }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
