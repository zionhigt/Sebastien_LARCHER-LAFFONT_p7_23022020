import React, { Component } from "react";
import {HashRouter, Route} from 'react-router-dom'

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
		this.headerHandler = this.headerHandler.bind(this);
	}

	headerHandler(){
		this.setState({loged: true});
	}
	render(){
		return (
			<HashRouter>
				<Route  path="/" component={Home} />
				<Route exact path="/forum" component={Forum} />
				<Route exact path="/profil" component={Profil} />
			</HashRouter>
			);
	};
}

export default App;