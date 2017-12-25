import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//components
import Home from '../components/Home';
import Footer from '../components/Footer';
import FullCatalog from '../containers/FullCatalog';
import Favorites from '../components/Favorites';
import NotFound from '../components/NotFound';
import Signup from '../components/SignUp';
import Signin from '../components/SignIn';
import Profile from '../components/Profile';
import RecipeItem from '../containers/RecipeItem';
import AddRecipe from '../containers/AddRecipe';
import User from '../components/UserProfile';
import Auth from '../components/auth';
import Management from '../components/ManageUsers';
import Category from '../components/Category';

const Message = 'You have to be logged in to view this content';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={Home} />
        <Route path="/catalog" exact component={FullCatalog} />
        <Route
          path="/recipe/:id"
          render={props =>
            (Auth.loggedIn() ? (
              <RecipeItem {...props} />
            ) : (
              <Signin {...props} msg={Message} />
            ))
          }
        />
        <Route
          path="/user/:id"
          render={routeProps =>
            (Auth.loggedIn() ? (
              <User {...routeProps} />
            ) : (
              <Signin {...routeProps} msg={Message} />
            ))
          }
        />
        <Route
          path="/manageUsers"
          render={routeProps =>
            (Auth.loggedIn() ? (
              <Management />
            ) : (
              <Signin {...routeProps} msg={Message} />
            ))
          }
        />
        <Route
          path="/favorites"
          render={routeProps =>
            (Auth.loggedIn() ? (
              <Favorites />
            ) : (
              <Signin {...routeProps} msg={Message} />
            ))
          }
        />
        <Route
          path="/new"
          render={routeProps =>
            (Auth.loggedIn() ? (
              <AddRecipe {...routeProps}/>
            ) : (
              <Signin {...routeProps} msg={Message} />
            ))
          }
        />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/category/:cat" component={Category} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
export default AppRoutes;
