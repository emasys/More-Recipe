import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//components
import Home from '../components/Home';
import Footer from '../components/Footer';
import FullCatalog from '../containers/FullCatalog/index';
import FavoritesRecipes from '../containers/Favorites/index';
import NotFound from '../components/NotFound';
import isAuthenticated from '../components/HOC/index';
import preventAccess from '../components/HOC/PreventAccess';
import Signup from '../containers/SignUp/index';
import Signin from '../containers/SignIn/index';
import Profile from '../containers/Profile/index';
import RecipeItem from '../containers/RecipeItem/index';
import AddRecipe from '../containers/AddRecipe/index';
import User from '../containers/UserProfile/index';
import Management from '../components/ManageUsers';
import Category from '../components/Category/index';
import Preloader from '../components/Preloader';

const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Preloader />
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={preventAccess(Signup)} />
        <Route path="/" exact component={Home} />
        <Route path="/catalog" exact component={FullCatalog} />
        <Route path="/recipe/:id" component={isAuthenticated(RecipeItem)} />
        <Route path="/user/:id" component={User} />
        <Route path="/manageUsers" component={isAuthenticated(Management)} />
        <Route
          path="/favorites"
          component={isAuthenticated(FavoritesRecipes)}
        />
        <Route path="/new" component={isAuthenticated(AddRecipe)} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/category/:cat" component={Category} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
export default AppRoutes;
