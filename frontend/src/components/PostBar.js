import React, { Component } from 'react';

import * as API from '../api/api.js';

class PostBar extends Component {

	constructor(props){
		super(props)
		this.state = {firstName: "", lastName:"", postPicture: ""};
		this.editFocusHandler = this.editFocusHandler.bind(this);
		

	}
	componentDidMount()
	{
		this.setState({firstName: this.props.firstName, lastName:this.props.lastName, picture:this.props.picture})

		

	}
	editFocusHandler(e){
		const modal = document.getElementById(this.props.modal);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.open();
	}

	
	render(){

		return(
			<div className="card-panel row">
				<div className="input-field col s12">
						<input id={this.props.id} className="validate" onFocus={this.editFocusHandler}/>
						<label htmlFor={this.props.id}>Exprimez vous !</label>
					</div>
			</div>
			);
	};
}

export default PostBar;