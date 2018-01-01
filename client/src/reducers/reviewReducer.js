import * as type from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
  case type.REVIEW:
    return {
      ...state,
      review: action.payload
    };

  default:
    return state;
  }
};
