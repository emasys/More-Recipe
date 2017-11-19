import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

//components
import App from '../components/app';
import Footer from '../components/footer';
import Catalog from '../containers/catalog';
import Favorites from '../components/favorites';
import NotFound from '../components/notfound';
import Playground from '../playground/app';
import Signup from '../components/signup';
import Signin from '../components/signin';
import Profile from '../components/profile';
import RecipeItem from '../containers/recipe_item';
import AddRecipe from '../containers/addRecipe';
import User from '../components/user';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/recipe/:id" component={RecipeItem} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/user/:id" component={User} />
        <Route path="/" exact component={App} />
        <Route path="/catalog" exact component={Catalog} />
        <Route path="/favorites" component={Favorites} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/808" component={Playground} />
        <Route path="/new" component={AddRecipe} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRoutes;
