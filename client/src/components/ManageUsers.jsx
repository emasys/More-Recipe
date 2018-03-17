import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getAllUsers, deleteUser } from '../actions/userActions';

//components
import Navbar from './Navbar';
import DeleteModal from '../containers/Profile/DeleteModal';

/**
 * ManageUsers
 *
 * @class
 *
 * @extends {Component}
 */
export class ManageUsers extends Component {
  static propTypes = {
    users: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
  };
  /**
   * Creates an instance of ManageUsers.
   *
   * @param {object} props
   *
   * @memberof ManageUsers
   */
  constructor(props) {
    super(props);

    this.globalId = 0;
  }
  /**
   *  Invoked immediately after component is mounted
   *
   *@returns {object} response after instantiating
   * network request
   *
   */
  componentDidMount() {
    this.props.getAllUsers();
  }
  /**
   *
   *@description this will fetch the id of the recipe to
   * be deleted, then pass it to the globalId to be used in the api call
   *
   * @param {object} event
   * @param {number} id
   *
   * @memberof ManageUsers
   *
   * @returns {void}
   *
   */
  deleteUser = (event, id) => {
    event.preventDefault();
    this.globalId = id;
  };
  /**
   * Confirm deletion of a user
   *
   * @param {any} event
   *
   * @memberof ManageUsers
   *
   * @returns {void}
   */
  confirmDelete = event => {
    event.preventDefault();
    this.props.deleteUser(this.globalId);
  };
  /**
   * Generate a list of users
   *
   * @param {object} user
   *
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof ManageUsers
   */
  generateTable = user => {
    if (user) {
      return user.users.map(item => (
        <tbody key={item.id}>
          <tr>
            <th scope="row" name={item.id}>
              {item.id}
            </th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td className="moniker">{item.moniker}</td>
            <td>{item.email}</td>
            <td>
              <button
                className="btn btn-danger delete-user-btn"
                id={item.id}
                onClick={event => this.deleteUser(event, item.id)}
                data-toggle="modal"
                data-target="#deleteModal"
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
   * @returns {JSX.Element}
   * render react element into the DOM
   * @memberof ManageUsers
   */
  render() {
    return (
      <div>
        <Navbar className="bg-dark fixed-top" />
        <DeleteModal {...this.props} confirmDelete={this.confirmDelete} />
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

export const mapStateToProps = state => ({
  users: state.user.allUsers
});

export default connect(mapStateToProps, { getAllUsers, deleteUser })(ManageUsers);
