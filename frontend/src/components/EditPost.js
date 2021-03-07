import React, { Component } from 'react';
import * as API from '../api/api.js';

class EditPost extends Component {

	constructor(props){
		super(props);
		this.state = {text: "", title: "", postPicture:"", pictureName:""};
		this.titleChangeHandler = this.titleChangeHandler.bind(this);
		this.textChangeHandler = this.textChangeHandler.bind(this);
		this.pictureHandler = this.pictureHandler.bind(this);
		this.closeImgHandler = this.closeImgHandler.bind(this);
		this.closeHandler = this.closeHandler.bind(this);
		this.submitPostHandler = this.submitPostHandler.bind(this);

		this.pictureInput = React.createRef();
	}

	componentDidMount()
	{
		if(this.props.text ||
		 	this.props.title ||
		 	this.props.postPicture)
		{
			this.setState({text: this.props.text || null, title: this.props.title || null, postPicture: this.props.postPicture || null})
		}
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
		this.setState({postPicture: "", pictureName: ""});
	}
	pictureHandler(e){
		
		e.preventDefault();
		const imageURL = URL.createObjectURL(this.pictureInput.current.files[0]);
		const mediaType = this.pictureInput.current.files[0].type.split('/')[0];
		this.setState({pictureName: this.pictureInput.current.files[0].name, postPicture: imageURL, mediaType: mediaType})
	};
	closeHandler(e)
	{
		const modal = document.getElementById(this.props.modal);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.destroy();
	}

	submitPostHandler(e){
		e.preventDefault();
		let formData = new FormData();
		if(this.state.title != "")
		{
			let body = {text: this.state.text, title: this.state.title};
			formData.append('body', JSON.stringify({...body}));
		}
		formData.append('image', this.pictureInput.current.files[0]);
		if(this.props.modal == "modalDesk" || this.props.modal == "modalHead")
		{

			API.postOne(formData)
			.then(() => {this.props.onPosted(false)})
			.catch(error => {console.log({ error })});
		}
		else
		{
			const post_id = parseInt(this.props.modal.split("modalUpdatePost")[1])
			API.updateOnePost(formData, post_id)
			.then(() => {this.props.onPosted(parseInt(post_id))})
			.catch(error => {console.log({ error })});
		}
	}

	render(){
		return(
			<div id={this.props.modal} className="modal">
				<div className="modal-content row">
					<a className="col s1 push-s11" onClick={this.closeHandler} ><i className="material-icons circle z-depth-2">close</i></a>
					<div className="input-field col s12 z-depth-1">
						<input id={`post_title_of_${this.props.modal}`} className="validate" type="text" value={this.state.title} onChange={this.titleChangeHandler}/>
						<label className="active" htmlFor={`post_title_of_${this.props.modal}`}>Titre</label>
					</div>
					<div className="input-field col s12 z-depth-1">
						<textarea id={`post_description_of_${this.props.modal}`} className="materialize-textarea" onChange={this.textChangeHandler} defaultValue={this.state.text}></textarea>
						<label className="active" htmlFor={`post_description_of_${this.props.modal}`}>Description</label>
					</div>
					<div className="edit__palet col s12">
						<div className="row">
							<label htmlFor={`post_edit${this.props.modal}`} className="label-file col s12 m6 valign-wrapper"><i className="material-icons">attachment</i>{(this.state.pictureName != "") ? this.state.pictureName : "Choisissez un fichier !"}</label>
							<input id={`post_edit${this.props.modal}`} type="file" ref={this.pictureInput} onChange={this.pictureHandler} className="input-file" />
							<a href="#" className="modal-close btn col s12 m6 z-depth-2" onClick={this.submitPostHandler}>Publier</a>
						</div>
					</div>
					{(this.state.postPicture != "") ?
					<div className="containerImg col s12 z-depth-3">
						<a className="closeImg" onClick={this.closeImgHandler} ><i className="material-icons circle white z-depth-4">close</i></a>
						{(this.state.mediaType == "video") ?
    					<video width="100%" controls src={this.state.postPicture}></video> : 
    					null}

    					{(this.state.mediaType == "audio") ?
    					<audio width="100%" controls src={this.state.postPicture}></audio> : 
    					null}

    					{(this.state.mediaType == "image") ?
    					<img src={this.state.postPicture} className="responsive-img" /> : 
    					null}
					</div>
					 : null}
				</div>
			    
			  </div>
			);
	}

}

export default EditPost;