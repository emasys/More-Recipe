import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Footer from './footer';
// import TopRecipes from './topRecipes';
import Home from '../containers/home';

class App extends Component {
	render() {
		return (
				 <BrowserRouter>
          <div>
            <Route exact path='/' component={Home}/>
						<Footer/>
          </div>
        </BrowserRouter>
		);
	}
}

export default App;