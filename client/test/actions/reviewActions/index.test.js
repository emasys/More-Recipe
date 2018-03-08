import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import instance from '../../../src/config/axios';
import { isLoggedInFalse } from '../../__mocks__/authMocks';
import * as actions from '../../../src/actions/reviewActions';
import * as reviewMocks from '../../__mocks__/reviewMocks';
import * as type from '../../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for review actions', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should return an object containing review for a particular recipe', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: reviewMocks.fetchReviews
      });
    });

    const expectedActions = [
      {
        type: type.GET_REVIEWS,
        payload: reviewMocks.fetchReviews
      },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.getReviews(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing an array of previous reviews and most recent', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: reviewMocks.postReview
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },      
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.REVIEW,
        payload: reviewMocks.postReview
      },
      { type: type.CLEAR_REVIEW, payload: [] }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.postReview(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return an object containing confirmation of deleted review', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { success: true, message: 'review deleted' }
      });
    });

    const expectedActions = [
      { type: type.IS_LOGGEDIN, payload: isLoggedInFalse },
      { type: type.IS_LOADING, isLoading: true },
      {
        type: type.DELETE_REVIEWS,
        payload: { success: true, message: 'review deleted' }
      },
      { type: type.CLEAR_REVIEW, payload: [] },
      { type: type.IS_LOADING, isLoading: false }
    ];

    const store = mockStore({ payload: {} });

    return store.dispatch(actions.deleteReview(1)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
