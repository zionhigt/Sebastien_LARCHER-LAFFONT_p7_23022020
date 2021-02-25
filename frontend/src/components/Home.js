import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import Header from './Header.js';
import Signup from './Signup.js';
import Signin from './Signin.js';

class Home extends Component {

	constructor(props){

		super(props);
	}

	render(){
		return (
			<div className="main__wrapper">
				<Header loged={false}/>
				<main className="container">
					<HashRouter>
						<Route exact path="/signin"  component={Signin}/>
						<Route exact path="/signup" component={Signup}/>
					</HashRouter>
					
				</main>
				
			</div>
			);
	}
}

export default Home;