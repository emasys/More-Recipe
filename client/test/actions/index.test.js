import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions/index';
import * as type from '../../src/actions/types';

const mockStore = configureStore([thunk]);

describe('Test suite for Authentication actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it.skip('should test the upload action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'securedurl'
      });
    });

    const expectedActions = [
      { type: type.UPLOAD_FOOD_IMG, payload: 'securedurl' }
    ];

    const store = mockStore({ payload: {} });
    const data = {
      preview: 'blob:http://localhost:8081/2ffdc676-ed6c-4b5d-90d8-70c6020691ab'
    };
    return store.dispatch(actions.uploadImg(data)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Flash message action', () => {
  it('should create an action to send flash message', () => {
    const path = '/link';
    const expectedAction = {
      type: type.FLASH_MESSAGE,
      message: 'You have to be logged in to view this content',
      path
    };
    expect(actions.flashMessage(path)).toEqual(expectedAction);
  });
});
