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
		this.closeHandler = this.closeHandler.bind(this);
		this.submitPostHandler = this.submitPostHandler.bind(this);

		this.pictureInput = React.createRef();
	}

	componentDidMount()
	{
		if(this.props.text &&
		 	this.props.title &&
		 	this.props.postPicture)
		{
			this.setState({text: this.props.text, title: this.props.title, postPicture: this.props.postPicture})
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
		this.setState({postPicture: ""});
	}
	pictureHandler(e){
		
		e.preventDefault();
		const imageURL = URL.createObjectURL(this.pictureInput.current.files[0]);
		const name = this.pictureInput.current.files[0].name;
		console.log(name);
		this.setState({postPicture: imageURL})
	};
	closeHandler(e)
	{
		const modal = document.getElementById(this.props.modal);
		console.log(modal);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.destroy();
	}

	submitPostHandler(e){
		e.preventDefault();
		let formData = new FormData();
		if(this.state.text != "")
		{
			let body = {text: this.state.text, title: this.state.title};
			formData.append('body', JSON.stringify({...body}));
		}
		formData.append('image', this.pictureInput.current.files[0]);
		console.log(this.props.modal)
		if(this.props.modal == "modal1")
		{

			API.postOne(formData)
			.then(() => {this.props.onPosted()})
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
					<a className="col s12 offset-s11" onClick={this.closeHandler} ><i className="material-icons">close</i></a>
					<div className="input-field col s12">
						<input id={`post_title_of_${this.props.modal}`} className="validate" type="text" value={this.state.title} onChange={this.titleChangeHandler}/>
						<label className="active" htmlFor={`post_title_of_${this.props.modal}`}>Titre</label>
					</div>
					<div className="input-field col s12">
						<textarea id={`post_description_of_${this.props.modal}`} className="materialize-textarea" onChange={this.textChangeHandler} defaultValue={this.state.text}></textarea>
						<label className="active" htmlFor={`post_description_of_${this.props.modal}`}>Description</label>
					</div>
					<div className="containerImg col s12">
						{(this.state.postPicture != "") ? <button className="closeImg" onClick={this.closeImgHandler} >X</button> : null}
						<img src={this.state.postPicture} alt="" />
					</div>
					<div className="edit__palet col s12">
						<label htmlFor="postEdit"><i className="material-icons edit_icon">mode_edit</i></label>
						<i className="material-icons">attachment</i>
						<input type="file" ref={this.pictureInput} onChange={this.pictureHandler} /><i className="material-icons">panorama</i>
						<a href="#" className="modal-close waves-effect waves-green btn-flat" onClick={this.submitPostHandler}>Publier</a>
					</div>
				</div>
			    
			  </div>
			);
	}

}

export default EditPost;