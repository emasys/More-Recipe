import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

ReactDOM.render(<AppRoutes />, document.getElementById('app'));
