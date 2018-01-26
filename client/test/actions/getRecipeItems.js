import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../src/actions';

const store = configureStore([thunk]);

describe('testing')
