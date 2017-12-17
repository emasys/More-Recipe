import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import AppRoutes from './routes/AppRoutes';
// import 'normalize.css/normalize.css';
import 'hover.css/css/hover-min.css';
import './styles/styles.scss';
import reducers from './reducers';


// const store = applyMiddleware(reduxPromise, thunk)(createStore);
const store = createStore(reducers, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app'),
);
