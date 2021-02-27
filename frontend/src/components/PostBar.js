import React, { Component } from 'react';

import * as API from '../api/api.js';

class PostBar extends Component {

	constructor(props){
		super(props)
		this.state = {text: "", firstName: "", lastName:"", picture:""};
		this.textChangeHandler = this.textChangeHandler.bind(this);
		this.submitPostHandler = this.submitPostHandler.bind(this);
	}
	componentDidMount()
	{
		API.getProfil()
		.then(profil=>{
			this.setState({...profil});
		})
		.catch(error=>{console.log(error)});
	}
	textChangeHandler(e){
		this.setState({text: e.target.value});
	}

	submitPostHandler(e){
		e.preventDefault();
		console.log(this.state.text);
	}
	render(){

		return(
			<div className="card-panel row">
				<div className="col s12 row valign-wrapper">
		    		<img className="circle col s2 m1 responsive-img"  src={this.state.picture} />
					<h5 className="col s11">{this.state.firstName} {this.state.lastName}</h5>
				</div>
				<div className="col s12">
					<textarea id="postEdit" className="" onChange={this.textChangeHandler} ></textarea>
					<input type="submit" value="Publier" onClick={this.submitPostHandler} />
					<div className="edit__palet">
						<label htmlFor="postEdit"><i className="material-icons edit_icon">mode_edit</i></label>
						<i className="material-icons">attachment</i>
						<i className="material-icons">panorama</i>
					</div>
				</div>
			</div>
			);
	};
}

export default PostBar;