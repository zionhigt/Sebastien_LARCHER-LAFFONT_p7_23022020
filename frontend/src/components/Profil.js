import React, { Component } from 'react';
import Header from './Header.js';

import { connect } from 'react-redux';

import { getUserProfil } from '../Store/actions/profilAction.js';

import * as API from '../api/api.js';


class Profil extends Component {

	constructor(props){

		super(props);

		this.state = {modify: false, firstName: "", lastName: "", picture: "", pictureName: ""};

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
		if(!this.props.profil.userProfil.firstName)
		{
			this.props.dispatch(getUserProfil());
		}
		const elemCircle = document.querySelectorAll('.profil__image--user img');
		elemCircle.forEach(elem => {
			elem.style.height = `${elem.width}px`;		    	
		})
		
	}

	componentDidUpdate(){
		const elemCircle = document.querySelectorAll('.profil__image--user img');
		elemCircle.forEach(elem => {
			elem.style.height = `${elem.width}px`;		    	
		})
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
		this.setState({picture: imageURL, pictureName: this.pictureInput.current.files[0].name})
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
		delete body.pictureName;

		let formData = new FormData();
		formData.append('body', JSON.stringify({...body}));
		formData.append('image', this.pictureInput.current.files[0]);
		API.setProfil(formData)
		.then(() => {
			this.props.dispatch(getUserProfil());
			this.setState({modify: false});
		})
		.catch(error => {console.log({ error })});
	};

	render(){
		return (
			<div className="main__wrapper">
				<Header loged={true} profil={true} />
				<main className="profil__main row">
					<a href="?#/forum" className="col l2 push-l1"><i className="material-icons">arrow_back</i></a>
					<div className="profil__image--user col s8 l2 offset-l3">
						<img src={(this.state.picture) ? this.state.picture : this.props.profil.userProfil.picture} className="circle z-depth-3"/>
						{(this.state.modify) ? 
						<div>
							<label htmlFor="imageProfilPicker" className="label-file"><i className="material-icons">camera</i>{(this.state.pictureName != "") ? this.state.pictureName : "Choisissez une image"}</label>
							<input id="imageProfilPicker" type="file" ref={this.pictureInput} onChange={this.pictureHandler} className="input-file" />
						</div> : null}
					</div>
					<label>
						<i className="material-icons">mode_edit</i>
				      <input type="checkbox" className="browser-default" checked={this.state.modify} onChange={this.modifyHandler}/>
				      <span>Modifier ?</span><br />
				    </label> 
					<form className="profil__form col s10 offset-s1 l4 offset-l4 z-depth-2">

						<div className="profil__input input-field">
							{(this.state.modify) ? <input id="profilLastName" className="validate" type="text" value={(this.state.lastName) ? this.state.lastName : this.props.profil.userProfil.lastName} onChange={this.lastNameHandler}/> : <p>{this.props.profil.userProfil.lastName}</p>}
							<label htmlFor="profilLastName" className="active">Nom</label>
						</div>

						<div className="profil__input input-field">
							{(this.state.modify) ? <input id="profilFirstName" className="validate active" type="text" value={(this.state.firstName) ? this.state.firstName : this.props.profil.userProfil.firstName} onChange={this.firstNameHandler}/> : <p>{this.props.profil.userProfil.firstName}</p>}
							<label htmlFor="profilFirstName" className="active">Prénom</label>
						</div>
						
						
					</form>
					{(this.state.modify) ?
						<div className="col s10 offset-s1 l4 offset-l4">
							<div className="row">
								<input className="btn col l4" type="submit" value="Modifier mes infos" onClick={this.submitHandler} />
								<a className="supress__user red-text col s8 l4 push-l4" onClick={this.deleteAcountHandler} >Supprimer mon compte</a>
							</div>
						</div>
					: null}
				</main>
				
			</div>
			);
	};
}

const mapStateToProps = state => {return {...state}};

export default connect(mapStateToProps)(Profil);