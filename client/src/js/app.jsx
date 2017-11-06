import React, { Component } from 'react';
import { render } from 'react-dom';
import '../style/index.scss';
import Header from './components/header';
import Footer from './components/footer';
import TopRecipes from './components/cat_home';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Header/>
				<TopRecipes/>
				<Footer/>
			</div>
		);
	}
}

render(<App />, document.getElementById('root'));
