import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

// Actions
import { getAllUsers, deleteUser } from '../actions/userActions';

//components
import Navbar from './Navbar';
import Preloader from './Preloader';

/**
 *
 *
 * @class ManageUsers
 * @extends {Component}
 */
class ManageUsers extends Component {
  /**
   * Creates an instance of ManageUsers.
   * @param {any} props
   * @memberof ManageUsers
   */
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.globalId = 0;
  }
  /**
   *
   *
   * @memberof ManageUsers
   * @returns {object} list of users
   */
  componentDidMount() {
    this.props.getAllUsers();
  }
  /**
   *
   *
   * @param {any} event
   * @memberof ManageUsers
   * @returns {any} delete user
   * @description this will fetch the id of the recipe to
   * be deleted, then pass it to the globalId to the used in the api call
   */
  deleteUser = event => {
    if (event.target.id) {
      this.globalId = event.target.id;
      this.onOpenModal();
    }
  };
  /**
   *
   *
   * @param {any} event
   * @memberof ManageUsers
   * @returns {any} modal state
   */
  onOpenModal = event => {
    this.setState({ open: true });
  };
  /**
   *
   *
   * @param {any} event
   * @memberof ManageUsers
   * @returns {any} recieves the globalId and do the needful
   */
  confirmDelete = event => {
    if (event.target.id === 'yes') {
      this.props.deleteUser(this.globalId);
      this.onCloseModal();
    }
  };
  /**
   *
   *
   * @memberof ManageUsers
   * @returns {any} Modal state
   */
  onCloseModal = () => {
    this.setState({ open: false });
  };
  /**
   *
   *
   * @param {any} user
   * @returns {object} a table of list of users
   * @memberof ManageUsers
   */
  generateTable = user => {
    if (user) {
      return user.users.map(item => (
        <tbody key={item}>
          <tr>
            <th scope="row" name={item.id}>
              {item.id}
            </th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.moniker}</td>
            <td>{item.email}</td>
            <td>
              <button
                className="btn btn-danger"
                id={item.id}
                onClick={this.deleteUser}
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      ));
    }
  };
  /**
   *
   *
   * @returns {any} jsx
   * @memberof ManageUsers
   */
  render() {
    const { open } = this.state;

    return (
      <div>
        <Preloader />
        <Navbar className="bg-dark fixed-top" />
        <Modal open={open} onClose={this.onCloseModal} little>
          <div className="text-center mt-10">
            <h4>Delete Recipe?</h4>
            <h2 className="mt-5">Are you sure you want to delete this user?</h2>
            <button
              id="yes"
              className="btn btn-block btn-success"
              onClick={this.confirmDelete}
            >
              Yes
            </button>
            <button
              id="no"
              className="btn btn-block btn-danger"
              onClick={this.onCloseModal}
            >
              No
            </button>
          </div>
        </Modal>
        <div className="container mt-80 mb-20">
          <div className="row">
            <div className="catalog-wrapper col-12">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">last Name</th>
                    <th scope="col">Moniker</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {this.generateTable(this.props.users)}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.user.allUsers,
  deluser: state.user.delUser
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getAllUsers, deleteUser }, dispatch)
});
ManageUsers.propTypes = {
  users: PropTypes.object,
  deleteUser: PropTypes.func,
  getAllUsers: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
