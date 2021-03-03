import React, { Component } from 'react';
import * as API from '../api/api.js';

class EditPost extends Component {

	constructor(props){
		super(props);
		this.state = {text: ""};
		this.updateHandler = this.updateHandler.bind(this);
		this.textChangeHandler = this.textChangeHandler.bind(this);
		this.closeHandler = this.closeHandler.bind(this);
		

		this.pictureInput = React.createRef();
	}

	componentDidMount()
	{
		this.setState({text: this.props.text})
	}
	
	textChangeHandler(e){

		this.setState({text: e.target.value});
	}
	
	updateHandler(e){
		e.preventDefault();
		
		API.updateOneComment(this.state.text, this.props.id)
		.then(() => {this.props.onUpdate(true)})
		.catch(error => {console.log({ error })});
	}

	closeHandler(e)
	{
		const modal = document.getElementById(`modalComment${this.props.id}`);
		console.log(modal);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.destroy();
	}


	render(){
		return(
			<div id={`modalComment${this.props.id}`} className="modal">
				<div className="modal-content row">
					<a className="col s12 offset-s11" onClick={this.closeHandler} ><i className="material-icons">close</i></a>
					<div className="input-field col s12">
						<textarea className="materialize-textarea" onChange={this.textChangeHandler} defaultValue={this.state.text}></textarea>
						<label className="active" htmlFor={`post_description_of_${this.props.modal}`}>Commentaire</label>
					</div>
			    </div>
			    	<div className="modal-footer">
					<a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.updateHandler}>Publier</a>
			    </div>
			  </div>
			);
	}

}

export default EditPost;