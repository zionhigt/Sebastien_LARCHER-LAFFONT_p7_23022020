import React, { Component } from 'react';
import * as API from '../api/api.js';

class EditPost extends Component {

	constructor(props){
		super(props);
		this.state = {text: "", title: "", postPicture:""};
		this.titleChangeHandler = this.titleChangeHandler.bind(this);
		this.textChangeHandler = this.textChangeHandler.bind(this);
		this.pictureHandler = this.pictureHandler.bind(this);
		this.closeImgHandler = this.closeImgHandler.bind(this);
		this.submitPostHandler = this.submitPostHandler.bind(this);

		this.pictureInput = React.createRef();
	}

	titleChangeHandler(e){

		this.setState({title: e.target.value});
	}

	textChangeHandler(e){

		this.setState({text: e.target.value});
	}
	closeImgHandler(e)
	{
		e.target.value = "";
		this.setState({postPicture: ""});
	}
	pictureHandler(e){
		
		e.preventDefault();
		const imageURL = URL.createObjectURL(this.pictureInput.current.files[0]);
		const name = this.pictureInput.current.files[0].name;
		console.log(name);
		this.setState({postPicture: imageURL})
	};

	submitPostHandler(e){
		e.preventDefault();
		let formData = new FormData();
		if(this.state.text != "")
		{
			let body = {text: this.state.text, title: this.state.title};
			formData.append('body', JSON.stringify({...body}));
		}
		formData.append('image', this.pictureInput.current.files[0]);
		API.postOne(formData)
		.then(() => {console.log("posted")})
		.catch(error => {console.log({ error })});
	}

	render(){
		return(
			<div id="modal1" className="modal">
				<div className="modal-content row">
					<div className="input-field col s12">
						<input id="post_title"className="validate" type="text" value={this.state.title} onChange={this.titleChangeHandler}/>
						<label htmlFor="post_title">Titre</label>
					</div>
					<div className="input-field col s12">
						<textarea id="post_description" className="materialize-textarea" onChange={this.textChangeHandler} ></textarea>
						<label htmlFor="post_description">Description</label>
					</div>
					<div className="containerImg col s12">
						{(this.state.postPicture != "") ? <button className="closeImg" onClick={this.closeImgHandler} >X</button> : null}
						<img src={this.state.postPicture} alt="" />
					</div>
					<div className="edit__palet col s12">
						<label htmlFor="postEdit"><i className="material-icons edit_icon">mode_edit</i></label>
						<i className="material-icons">attachment</i>
						<input type="file" ref={this.pictureInput} onChange={this.pictureHandler} /><i className="material-icons">panorama</i>
					</div>

			    </div>
			    	<div className="modal-footer">
					<a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.submitPostHandler}>Publier</a>
			    </div>
			  </div>
			);
	}

}

export default EditPost;