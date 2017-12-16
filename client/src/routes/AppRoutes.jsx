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


const AppRoutes = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/signin" component={Signin}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/" exact component={Home}/>
        <Route path="/catalog" exact component={FullCatalog}/>
        <Route path="/recipe/:id" component={Auth.loggedIn() ? RecipeItem : Signin}/>
        <Route path="/user/:id" component={Auth.loggedIn() ? User : Signin}/>
        <Route path="/manageUsers" component={Auth.moniker() ? Management : Signin}/>
        <Route path="/favorites" component={Auth.loggedIn() ? Favorites : Signin}/>
        <Route path="/new" component={Auth.loggedIn() ? AddRecipe : Signin}/>
        <Route path="/profile/:id" component={Auth.loggedIn() ? Profile : Signin}/>
        <Route path="/category/:cat" component={Category}/>
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
export default AppRoutes;
