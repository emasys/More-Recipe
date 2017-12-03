import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getAllUsers, deleteUser } from '../actions';
import { connect } from 'react-redux';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Modal from 'react-responsive-modal/lib/css';

//components
import Navbar from './Navbar';

class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);

    this.globalId = 0;
  }

  componentDidMount = () => {
    this.props.getAllUsers();
  };

  deleteUser(e) {
    if (e.target.id) {
      this.globalId = e.target.id;
      this.onOpenModal();
    }
  }

  onOpenModal = e => {
    this.setState({ open: true });
  };

  confirmDelete(e) {
    if (e.target.id === 'yes') {
      this.props.deleteUser(this.globalId).then(() => {
        this.componentDidMount();
        this.onCloseModal();
      });
    }
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };
  generateTable(user) {
    if (user) {
      return user.users.map((item, index) => {
        return (
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
                <button className="btn btn-danger" id={item.id} onClick={this.deleteUser}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      });
    }
  }
  render() {
    const { open } = this.state;

    return (
      <div>
        <Navbar />
        <Modal open={open} onClose={this.onCloseModal} little>
          <div className="text-center mt-10">
            <h4>Delete Recipe?</h4>
            <h2 className="mt-5">Are you sure you want to delete this user?</h2>
            <button id="yes" className="btn btn-block btn-success" onClick={this.confirmDelete}>
              Yes
            </button>
            <button id="no" className="btn btn-block btn-danger" onClick={this.onCloseModal}>
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

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getAllUsers, deleteUser }, dispatch),
});
const mapStateToProps = state => {
  console.log(state.signin.allUsers);
  return {
    users: state.signin.allUsers,
    deluser: state.signin.delUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
