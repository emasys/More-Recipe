import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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
    match: PropTypes.object.isRequired
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
    if (this.state.offset - 6 > this.state.recipes.length) {
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
        <section className="container-fluid profile catalog-wrapper mt-80">
          <div className="row justify-content-center">
            <UserProfileInfo data={this.props.userInfo} />
            <div className="col-lg-10 col-md-8 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h2 className="header-title float-left clearfix">
                  {this.props.userInfo ?
                    this.props.userInfo.data.moniker :
                    null}{"'"}s recipes
                </h2>
              </div>
              <hr />
              <div className="row justify-content-center">
                <CatalogList
                  {...this.props}
                  showDeleteBtn={false}
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getUserInfo, getUserRecipes, clearRecipes }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
