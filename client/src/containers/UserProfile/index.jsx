import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

// Action
import { getUserInfo, getUserRecipes } from '../../actions/userActions';
import { clearRecipes } from '../../actions/recipeActions';

//component
import Navbar from '../../components/Navbar';
import CatalogList from '../../components/CatalogList';
import UserProfileInfo from './UserProfileInfo';
/**
 *
 *
 * @class UserProfile
 * @extends {Component}
 */
export class UserProfile extends Component {
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
   * @param {object} props
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

    this.viewMore = this.viewMore.bind(this);
  }
  /**
   *
   *
   * @memberof UserProfile
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.id);
    this.loadMore();
  }
  /**
   *
   * @returns {void}
   *
   * @param {any} nextProps
   *
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
      recipes: nextProps.user
    }));
    if (this.state.offset >= nextProps.count) {
      this.setState({
        showMore: false
      });
    } else {
      this.setState({
        showMore: true
      });
    }
  }

  /**
   *
   * @returns {void}
   *
   *
   * @memberof UserProfile
   */
  componentWillUnmount() {
    this.props.clearRecipes();
  };

  /**
   * Fetch more recipes
   *
   * @returns {void}
   *
   * @memberOf UserProfile
   */
  loadMore = () => {
    this.props.getUserRecipes(this.props.match.params.id, 2, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + 2
    }));
  };

  /**
   * View more recipes
   *
   * @param {object} event
   *
   * @returns {void}
   * @memberOf UserProfile
   */
  viewMore(event) {
    event.preventDefault();
    this.loadMore();
  };
  /**
   *
   *
   * @returns {JSX.Element} render react element
   * @memberof UserProfile
   */
  render() {
    const { showMore } = this.state;
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
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
                    onClick={this.viewMore}
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

export const mapStateToProps = state => ({
  recipes: state.recipes.userRecipes,
  userInfo: state.user.userInfo,
  count: state.recipes.userRecipesCount
});


export default connect(mapStateToProps, { getUserInfo, getUserRecipes, clearRecipes })(UserProfile);
