import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import instance from '../../../src/config/axios';
import { isLoggedInFalse } from '../../__mocks__/authMocks';
import * as actions from '../../../src/actions/voteActions';
import * as voteMocks from '../../__mocks__/voteMocks';
import * as type from '../../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for vote actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should return an object containing confirmation of upvote', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: voteMocks.upvoteResponse
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.UPVOTE,
        payload: voteMocks.upvoteResponse
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.upvote(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing confirmation of downvote', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: voteMocks.downvoteResponse
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.DOWNVOTE,
        payload: voteMocks.downvoteResponse
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.downvote(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
