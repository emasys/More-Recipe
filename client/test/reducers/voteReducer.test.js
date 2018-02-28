import reducer from '../../src/reducers/voteReducer';
import * as types from '../../src/actions/types';
import * as mockData from '../__mocks__/voteMocks';

describe('Test suite for vote reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle UPVOTE', () => {
    expect(reducer(
      {},
      {
        type: types.UPVOTE,
        payload: mockData.upvoteResponse
      }
    )).toEqual({
      upvote: mockData.upvoteResponse,
      downvote: mockData.upvoteResponse
    });
  });

  it('should handle DOWNVOTE', () => {
    expect(reducer(
      {},
      {
        type: types.DOWNVOTE,
        payload: mockData.downvoteResponse
      }
    )).toEqual({
      downvote: mockData.downvoteResponse,
      upvote: mockData.downvoteResponse
    });
  });
});
