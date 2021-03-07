import React, { Component } from 'react';
import {HashRouter, Route, Redirect} from 'react-router-dom';
import Signup from './Signup.js';
import Signin from './Signin.js';

class Home extends Component {

	render(){
		return (
			<div className="main__wrapper">
				<main className="container">
					<HashRouter>
						<Route exact path="/">
							<Redirect to="/forum"/>
						</Route>
						<Route path="/extras">
							<Redirect to="/forum"/>
						</Route>
						<Route exact path="/signin"  component={Signin}/>
						<Route exact path="/signup" component={Signup}/>
					</HashRouter>
					
				</main>
				
			</div>
			);
	}
}

export default Home;