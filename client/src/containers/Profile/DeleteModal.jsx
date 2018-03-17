import React from 'react';
import PropTypes from 'prop-types';

/**
 * Delete modal
 *
 * @param {object} props
 *
 * @returns {JSX.Element} react element
 */
const DeleteModal = props => (
  <div
    className="modal fade"
    id="deleteModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="deleteModalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLongTitle">
            Delete Item
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Are you sure you want to continue with this action?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn-lg"
            data-dismiss="modal"
          >
            No
          </button>
          <button
            onClick={props.confirmDelete}
            id="confirmDelete"
            type="button"
            data-dismiss="modal"
            className="btn btn-danger btn-lg"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  confirmDelete: PropTypes.func.isRequired
};
export default DeleteModal;
