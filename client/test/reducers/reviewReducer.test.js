import reducer from '../../src/reducers/reviewReducer';
import * as types from '../../src/actions/types';
import * as mockData from '../__mocks__/reviewMocks';

const initialState = {
  review: {},
  fetch_reviews: []
};

describe('Test suite for review reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('should handle POST_REVIEW', () => {
    expect(reducer(initialState, {
      type: types.REVIEW,
      payload: mockData.postReview
    })).toEqual({
      ...initialState,
      review: mockData.postReview
    });
  });

  it('should handle GET_REVIEWS', () => {
    expect(reducer(initialState, {
      type: types.GET_REVIEWS,
      payload: mockData.fetchReviews
    })).toEqual({
      ...initialState,
      fetch_reviews: mockData.fetchReviews.reviews,
      count_reviews: mockData.fetchReviews.count
    });
  });

  it('should handle DELETE_REVIEWS', () => {
    expect(reducer(initialState, {
      type: types.DELETE_REVIEWS,
      payload: {
        success: true,
        message: 'review deleted'
      }
    })).toEqual({
      ...initialState,
      delete_reviews: {
        success: true,
        message: 'review deleted'
      }
    });
  });

  it('should handle CLEAR_REVIEWS', () => {
    expect(reducer(initialState, {
      type: types.CLEAR_REVIEW,
      payload: []
    })).toEqual({
      ...initialState,
      fetch_reviews: []
    });
  });
});
