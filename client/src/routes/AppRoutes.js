import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

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
        <Route path={`/recipe/:id`} component={RecipeItem} />
        <Route path={`/dashboard/:id`} component={Profile} />
        <Route path={`/userInfo/:id`} component={User} />
        <Route path={`/favorite`} component={Favorites} />
        <Route path={`/signup`} component={Signup} />
        <Route path={`/signin`} component={Signin} />
        <Route path={`/addnew`} component={AddRecipe} />

        <Route
          exact
          path="/favorites"
          render={() => {
            if (!Auth.loggedIn()) {
              return <Redirect to={`/signin`} />;
            } else {
              return <Redirect to={`/favorite`} />;
            }
          }}
        />
        <Route
          exact
          path="/new"
          render={() => {
            if (!Auth.loggedIn()) {
              return <Redirect to={`/signin`} />;
            } else {
              return <Redirect to={`/addnew`} />;
            }
          }}
        />
        <Route
          exact
          path="/user/:id"
          render={({ match }) => {
            if (!Auth.loggedIn()) {
              return <Redirect to={`/signin`} />;
            } else {
              return <Redirect to={`/userInfo/${match.params.id}`} />;
            }
          }}
        />
        <Route
          exact
          path="/recipes/:id"
          render={({ match }) => {
            if (!Auth.loggedIn()) {
              return <Redirect to={`/signin`} />;
            } else {
              return <Redirect to={`/recipe/${match.params.id}`} />;
            }
          }}
        />
        <Route
          exact
          path="/profile/:id"
          render={({ match }) => {
            if (!Auth.loggedIn()) {
              return <Redirect to={`/signin`} />;
            } else {
              return <Redirect to={`/dashboard/${match.params.id}`} />;
            }
          }}
        />
        <Route path="/" exact component={App} />
        <Route path="/catalog" component={Catalog} />

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRoutes;
