import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import 'hover.css/css/hover-min.css';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
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

export default store;
