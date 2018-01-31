import * as type from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
  case type.IS_LOADING:
    return action.isLoading;
  default:
    return state;
  }
};
