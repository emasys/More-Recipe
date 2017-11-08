import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import '../style/index.scss';
import App from './components/app';

const store = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={store(reducers)}>
    <App/>
</Provider>, document.getElementById('root'));
