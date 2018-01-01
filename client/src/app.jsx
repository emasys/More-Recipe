import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import 'hover.css/css/hover-min.css';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import AppRoutes from './routes/AppRoutes';
import './styles/styles.scss';
import reducers from './reducers';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
    compose;

let enhancer = composeEnhancers(applyMiddleware(thunk));
if (process.env.NODE_ENV !== 'production') {
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
);
