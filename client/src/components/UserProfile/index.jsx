import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

//component
import Navbar from '../Navbar';
import UserRecipes from './UserRecipes';
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
      showMore: false
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
    this.props.getUserRecipes(this.state.limit, this.props.match.params.id);
  }
  /**
   *
   * @returns {any} cwr
   * @param {any} nextProps
   * @memberof UserProfile
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      console.log(nextProps.user.recipes);
      if (nextProps.user.recipes.length > 5) {
        this.setState({
          showMore: true
        });
      }
    }
  }

  /**
   *
   *
   * @param {object} nextProps
   * @param {object} nextState
   * @memberof UserProfile
   * @returns {any}
   * invoked immediately before rendering
   * when new props or state are being received.
   */
  componentWillUpdate(nextProps, nextState) {
    if (nextState.limit > this.state.limit) {
      this.props.getUserRecipes(nextState.limit, this.props.match.params.id);
    }
  }
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
        <section className="container profile catalog-wrapper">
          <div className="row justify-content-center">
            <UserProfileInfo data={this.props.userInfo} />
            <div className="col-lg-7 col-md-7 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h2 className="fresh-title float-left clearfix">
                  {this.props.userInfo ?
                    this.props.userInfo.data.moniker :
                    null}'s Recipes{' '}
                </h2>
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

export default connect(mapStateToProps, actions)(UserProfile);
