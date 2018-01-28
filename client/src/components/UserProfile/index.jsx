import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as actions from '../../actions';

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
    console.log(this.state.offset);
    this.setState(prevState => ({
      recipes: [...prevState.recipes, ...nextProps.user]
    }));
    if (this.state.offset - 6 > this.state.recipes.length) {
      this.setState({
        showMore: false
      });
    }
  }

  loadMore = () => {
    console.log('triggered');
    console.log(this.state.offset);
    this.props.getUserRecipes(
      this.props.match.params.id,
      this.state.limit,
      this.state.offset
    );
    console.log('watch this state', this.state.recipes);
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
        <section className="container-fluid profile catalog-wrapper mt-80">
          <div className="row justify-content-center">
            <UserProfileInfo data={this.props.userInfo} />
            <div className="col-lg-10 col-md-10 col-sm-12 recipe-lists">
              <div className="clearfix">
                <h2 className="fresh-title float-left clearfix">
                  {this.props.userInfo ?
                    this.props.userInfo.data.moniker :
                    null}'s Recipes
                </h2>
              </div>
              <hr />
              <div className="row justify-content-center">
                <InfiniteScroll
                  next={this.loadMore}
                  hasMore={showMore}
                  loader={
                    <div className="loader text-center" key={0}>
                      <img
                        src="https://res.cloudinary.com/emasys/image/upload/v1516647862/Facebook-0.9s-200px_sqqnu9.gif"
                        width="30"
                        height="30"
                        alt="loading..."
                      />
                    </div>
                  }
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>No more recipe</b>
                    </p>
                  }
                >
                  <CatalogList catalog={this.state.recipes} />
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.recipes.userRecipes.recipes,
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps, actions)(UserProfile);
