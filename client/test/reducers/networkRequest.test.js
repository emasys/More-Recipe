import reducer from '../../src/reducers/networkRequestReducer';
import * as types from '../../src/actions/types';

describe('Test suite for network request state', () => {
  it('should return the initial state', () => {
    expect(reducer(false, {})).toEqual(false);
  });

  it('should check if an ajax request was made', () => {
    expect(reducer(false, {
      type: types.IS_LOADING,
      isLoading: true
    })).toEqual(true);
  });
});
