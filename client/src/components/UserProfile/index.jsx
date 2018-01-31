import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Pace from 'react-pace-progress';


// Action
import { getUserInfo, getUserRecipes } from '../../actions/userActions';
import { clearRecipes } from '../../actions/recipeActions';

//component
import Navbar from '../Navbar';
import CatalogList from '../CatalogList';
import UserProfileInfo from './UserProfileInfo';
/**
 *
 *
 * @class UserProfile
 * @extends {Component}
 */
class UserProfile extends Component {
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
        <div className="fixed-top">
          {this.props.netReq && <Pace color="#e7b52c" height={2} />}
        </div>
        <section className="container-fluid profile catalog-wrapper mt-80">
          <div className="row justify-content-center">
            <UserProfileInfo data={this.props.userInfo} />
            <div className="col-lg-10 col-md-8 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h2 className="header-title float-left clearfix">
                  {this.props.userInfo ?
                    this.props.userInfo.data.moniker :
                    null}'s recipes
                </h2>
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
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.recipes.userRecipes,
  userInfo: state.user.userInfo,
  netReq: state.netReq
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getUserInfo, getUserRecipes, clearRecipes }, dispatch)
});

UserProfile.propTypes = {
  userInfo: PropTypes.object,
  getUserRecipes: PropTypes.func,
  clearRecipes: PropTypes.func,
  user: PropTypes.array,
  getUserInfo: PropTypes.func,
  match: PropTypes.object,
  netReq: PropTypes.bool
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
