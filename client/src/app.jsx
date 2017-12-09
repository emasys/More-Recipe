import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import reduxPromise from 'redux-promise';
import AppRoutes from './routes/AppRoutes.jsx';
import 'normalize.css/normalize.css';
import 'hover.css/css/hover-min.css';
import './styles/styles.scss';

const store = applyMiddleware(reduxPromise)(createStore);

ReactDOM.render(
  <Provider store={store(reducers)}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app'),
);
