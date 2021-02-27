import React, { Component } from 'react';
import Nav from './Navigation.js';
import Disconnect from './Disconnect.js'

class Header extends Component {

	render(){
		return (
			<header className="header nav-wrapper grey lighten-4 row">
				<img className="logo brand-logo col s12 m3" src="./image/logo.svg"/>
				<Content className="col s12" panel={this.props.loged}/>
			</header>
			);
	};

}

class Content extends Component {

	render(){
		return (
			<>
			<div className="navContent col s12 m6">

				{ (this.props.panel) ? <Nav /> : null }

			</div>
			<div className="navContent col s12 m3">

				{ (this.props.panel) ? <Disconnect /> : null }

			</div>
			</>
			);
		
	};
}




export default Header;