import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

//components
import Home from '../components/Home';
import Footer from '../components/Footer';
import Catalog from '../containers/Catalog';
import Favorites from '../components/Favorites';
import NotFound from '../components/Notfound';
import Playground from '../playground/app';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import Profile from '../components/Profile';
import RecipeItem from '../containers/RecipeItem';
import AddRecipe from '../containers/AddRecipe';
import User from '../components/UserProfile';
import Auth from '../components/Auth';
import Management from '../components/ManageUsers';
import Category from '../components/Category';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path={`/recipe/:id`} component={RecipeItem} />
        <Route path={`/category/:cat`} component={Category} />
        <Route path={`/dashboard/:id`} component={Profile} />
        <Route path={`/userInfo/:id`} component={User} />
        <Route path={`/favorite`} component={Favorites} />
        <Route path={`/signup`} component={Signup} />
        <Route path={`/signin`} component={Signin} />
        <Route path={`/addnew`} component={AddRecipe} />
        <Route path={`/user_management`} component={Management} />
        <Route
          exact
          path="/manageUsers"
          render={() => {
            if (!Auth.moniker() === 'admin') {
              return <Redirect to={`/`} />;
            } else {
              return <Redirect to={`/user_management`} />;
            }
          }}
        />
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
        <Route path="/" exact component={Home} />
        <Route path="/catalog" component={Catalog} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRoutes;
