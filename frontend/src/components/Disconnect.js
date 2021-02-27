import React, { Component } from 'react';
import * as API from '../api/api.js';

class Disconnect extends Component {

	constructor(props)
	{
		super(props);
		this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(e){
		API.signout()
		.then(message => {console.log(message)})
		.catch(error => {console.log(error)});
		window.location = "/?#/signin"; 
	}

	render(){
		return(
			<span className='exit valign-wrapper' onClick={this.clickHandler} >Se déconnecter <i className="material-icons">exit_to_app</i></span>
			);
	}
}

export default Disconnect;