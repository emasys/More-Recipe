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
import Auth from '../components/auth';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          path={Auth.loggedIn() ? `/recipe/:id` : `/notfound`}
          component={RecipeItem}
        />
        <Route
          path={Auth.loggedIn() ? `/profile/:id` : `/notfound`}
          component={Profile}
        />
        <Route
          path={Auth.loggedIn() ? `/user/:id` : `/notfound`}
          component={User}
        />
        <Route path="/" exact component={App} />
        <Route path="/catalog" component={Catalog} />
        <Route
          path={Auth.loggedIn() ? `/favorites` : `/notfound`}
          component={Favorites}
        />
        <Route
          path={!Auth.loggedIn() ? `/signup` : `/notfound`}
          component={Signup}
        />
        <Route
          path={!Auth.loggedIn() ? `/signin` : `/notfound`}
          component={Signin}
        />
        <Route path="/808" component={Playground} />
        <Route
          path={Auth.loggedIn() ? `/new` : `/notfound`}
          component={AddRecipe}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRoutes;
