import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';
import * as actions from '../actions';

//components
import Navbar from './Navbar';

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
    this.deleteUser = this.deleteUser.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);

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
   * @param {any} e
   * @memberof ManageUsers
   * @returns {any} delete user
   * @description this will fetch the id of the recipe to
   * be deleted, then pass it to the globalId to the used in the api call
   */
  deleteUser(e) {
    if (e.target.id) {
      this.globalId = e.target.id;
      this.onOpenModal();
    }
  }
  /**
   *
   *
   * @param {any} e
   * @memberof ManageUsers
   * @returns {any} modal state
   */
  onOpenModal(e) {
    this.setState({ open: true });
  }
  /**
   *
   *
   * @param {any} e
   * @memberof ManageUsers
   * @returns {any} recieves the globalId and do the needful
   */
  confirmDelete(e) {
    if (e.target.id === 'yes') {
      this.props.deleteUser(this.globalId).then(() => {
        this.props.getAllUsers();
        this.onCloseModal();
      });
    }
  }
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
  generateTable(user) {
    if (user) {
      return user.users.map((item, index) => (
        <tbody key={index}>
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
  }
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
        <Navbar />
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
  users: state.signin.allUsers,
  deluser: state.signin.delUser
});
export default connect(mapStateToProps, actions)(ManageUsers);
