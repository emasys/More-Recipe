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


 console.log(Auth.loggedIn());
 const requireAuth = (nextState, replace) => {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}
const AppRoutes = () => {
  return(
    <BrowserRouter>
    <div>
    <Switch>
      <Route path="/signin" component={Signin}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/" exact component={Home}/>
      <Route path="/catalog" exact component={Catalog}/>
      <Route path="/recipe/:id" component={Auth.loggedIn()? RecipeItem: Signin}/>
      <Route path="/user/:id" component={Auth.loggedIn()? User: Signin}/>
      <Route path="/manageUsers" component={Auth.moniker()? Management: Signin}/>
      <Route path="/favorites" component={Auth.loggedIn()? Favorites: Signin}/>
      <Route path="/new" component={Auth.loggedIn()? AddRecipe: Signin}/>
      <Route path="/profile/:id" component={Auth.loggedIn()? Profile: Signin}/>
      <Route path="/category/:cat" component={Category}/>
      <Route path="*" component={NotFound} /> 
    </Switch>
    <Footer />
    </div>
  </BrowserRouter>
  )
}
export default AppRoutes;
