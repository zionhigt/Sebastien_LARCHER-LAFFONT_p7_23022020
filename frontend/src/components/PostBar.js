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
		console.log(this.props);
		this.setState({firstName: this.props.firstName, lastName:this.props.lastName, picture:this.props.picture})

		

	}
	editFocusHandler(e){
		const modal = document.getElementById('modal1');
		console.log(modal);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.open();
	}

	
	render(){

		return(
			<div className="card-panel row">
				<div className="col s12 row valign-wrapper card-header">
		    		<img className="circle responsive-img col s12"  src={this.props.picture} />
					<h5 className="col s11">{this.props.firstName} {this.props.lastName}</h5>
				</div>
				<div className="input-field col s12">
						<input id="editPost"className="validate" onFocus={this.editFocusHandler}/>
						<label htmlFor="editPost">Exprimez vous !</label>
					</div>
			</div>
			);
	};
}

export default PostBar;