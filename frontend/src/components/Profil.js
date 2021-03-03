import React, { Component } from 'react';
import Header from './Header.js';

import User from '../data/userData.js';
import * as API from '../api/api.js';


class Profil extends Component {

	constructor(props){

		super(props);

		this.state = {modify: false, firstName: "", lastName: "", picture: ""};

		this.pictureInput = React.createRef();

		this.modifyHandler = this.modifyHandler.bind(this);
		this.firstNameHandler = this.firstNameHandler.bind(this);
		this.lastNameHandler = this.lastNameHandler.bind(this);
		this.pictureHandler = this.pictureHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.deleteAcountHandler = this.deleteAcountHandler.bind(this);
	}
	componentDidMount()
	{
		API.getProfil()
		.then(profil => {
			this.setState({firstName: profil.firstName, lastName: profil.lastName, picture: profil.picture});
			if(profil.error)
			{
				window.location = "/?#/signin";
			}
		})
		.catch(error => {console.log({ error })});
	}

	modifyHandler(e){
		this.setState({modify: e.target.checked})
	}
	
	firstNameHandler(e){
		this.setState({firstName: e.target.value});
		User.firstName = e.target.value;
	};

	lastNameHandler(e){
		
		this.setState({lastName: e.target.value});
		User.lastName = e.target.value;
	};

	pictureHandler(e){
		
		e.preventDefault();
		const imageURL = URL.createObjectURL(this.pictureInput.current.files[0]);
		this.setState({picture: imageURL})
		User.picture = e.target.value;
	};

	deleteAcountHandler(){
		API.killMe()
		.then(() => {
			API.signout()
			.then(message => {console.log(message)})
			.catch(error => {console.log(error)});
			window.location = "/?#/signin"; 
		})
		.catch(error => { console.log(error)})
	}

	submitHandler(e){
		
		e.preventDefault();
		let body = {};
		Object.keys(this.state).forEach(k => {
			if(this.state[k] != "")
			{
				body[k] = this.state[k];
			}
		});
		delete body.modify;
		delete body.picture;

		let formData = new FormData();
		formData.append('body', JSON.stringify({...body}));
		formData.append('image', this.pictureInput.current.files[0]);
		console.log(this.pictureInput.current.files[0]);
		API.setProfil(formData)
		.then(() => {
			API.getProfil()
			.then(profil => {
				this.setState({...profil, modify: false});

			})
			.catch(error => {console.log({ error })});
		})
		.catch(error => {console.log({ error })});
	};

	render(){
		return (
			<div className="main__wrapper">
				<Header loged={true}/>
				<main className="profil__main row">
					<div className="profil__image--user col s12 m4">
						<img src={this.state.picture}/>
						{(this.state.modify) ? <input type="file" ref={this.pictureInput} onChange={this.pictureHandler} /> : null}
					</div>
					<form className="col s12 m8">
						<div className="profil__input input-field">
							{(this.state.modify) ? <input id="profilFirstName" className="validate active" type="text" value={this.state.lastName} onChange={this.lastNameHandler}/> : <p>{this.state.lastName}</p>}
							<label htmlFor="profilFirstName" className="active">Nom</label>
						</div>
						<div className="profil__input input-field">
							{(this.state.modify) ? <input id="profilLastName" className="validate" type="text" value={this.state.firstName} onChange={this.firstNameHandler}/> : <p>{this.state.firstName}</p>}
							<label htmlFor="profilLastName" className="active">Prénom</label>
						</div>
						
						<label>
							<i className="material-icons">mode_edit</i>
					      <input type="checkbox" className="browser-default" checked={this.state.modify} onChange={this.modifyHandler}/>
					      <span>Modifier ?</span><br />
					    </label>
					    
					    
					    
						
						{(this.state.modify) ?
						 <><input className="btn" type="submit" value="Modifier mes infos" onClick={this.submitHandler} />
						 <input type="submit" className="btn red" value="Supprimer mon compte" onClick={this.deleteAcountHandler} /></> : null}
					</form>
				</main>
				
			</div>
			);
	};
}

export default Profil;