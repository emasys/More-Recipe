import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'hover.css/css/hover-min.css';
import AppRoutes from './routes/AppRoutes';
import './styles/styles.scss';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('app')
);
