import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

//components
import App from '../components/app';
import Footer from '../components/footer';
import Catalog from '../components/catalog';
import Favorites from '../components/favorites';
import NotFound from '../components/notfound';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/catalog" exact component={Catalog} />
        {/* <Route path="/recipe/:id" component={Recipe} /> */}
        <Route path="/favorites" component={Favorites} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRoutes;
