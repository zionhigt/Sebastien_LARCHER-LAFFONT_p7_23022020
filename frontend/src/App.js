import React, { Component } from "react";
import {HashRouter, Route} from 'react-router-dom';

import { Provider } from 'react-redux';
import Store from './Store/configStore.js';

import Home from "./components/Home.js";
import Forum from "./components/Forum.js";
import Profil from "./components/Profil.js";

class Test extends Component {
	render(){

		return (
			<p>{this.props.text}</p>
			);
	};
}

class App extends Component {

	constructor(props){

		super(props);
		this.state = {loged: false};
	}

	
	render(){
		return (
			<HashRouter>
				
				<Provider store={Store}>
					<Route  path="/" component={Home} />
					<Route exact path="/forum" component={Forum} />
					<Route exact path="/profil" component={Profil} />
				</Provider>
			</HashRouter>
			);
	};
}

export default App;