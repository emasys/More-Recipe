import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
// import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import AppRoutes from './routes/AppRoutes';
// import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = applyMiddleware(reduxPromise)(createStore);

ReactDOM.render(
  <Provider store={store(reducers)}>
  <AppRoutes/>
</Provider>, document.getElementById('app'));
