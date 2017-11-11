import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

//components
import App from '../components/app';
import Footer from '../components/footer';
import Catalog from '../containers/Catalog';
import Favorites from '../components/favorites';
import NotFound from '../components/notfound';
import Playground from '../playground/app';
import Signup from '../components/signup.js';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/catalog" exact component={Catalog} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/signup" component={Signup} />
        <Route path="/808" component={Playground} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRoutes;
