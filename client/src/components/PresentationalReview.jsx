import React from 'react';

const PresentationalReview = props => (
  <div className="row justify-content-center mt-2 catalog-wrapper">
    <div className="col-12">
      <h5 className="text-center text-muted">Reviews</h5>
      <hr />
    </div>
    <div className="col-lg-7 col-sm-12 recipe-image">
      <form onSubmit={props.handleForm} className="text-center">
        <div className="form-row">
          <div className="form-group col-md-12 col-sm-12">
            <textarea
              className="special col-12"
              rows="4"
              onChange={props.txChanged}
              value={props.content}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-dark  btn-lg col-lg-4 col-md-6 col-sm-12"
        >
          Submit
        </button>
      </form>
    </div>
    <div className="col-lg-8 col-sm-12 ">
      {props.getReview(props.recipeItem)}
    </div>
  </div>
);

export default PresentationalReview;
