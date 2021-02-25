import React, { Component } from 'react';
import Header from './Header.js';

import User from '../data/userData.js';


class Profil extends Component {

	constructor(props){

		super(props);

		this.state = {modify: false, firstName: User.firstName, lastName: User.lastName, email: User.email, picture: User.picture};

		this.pictureInput = React.createRef();

		this.modifyHandler = this.modifyHandler.bind(this);
		this.firstNameHandler = this.firstNameHandler.bind(this);
		this.lastNameHandler = this.lastNameHandler.bind(this);
		this.emailHandler = this.emailHandler.bind(this);
		this.pictureHandler = this.pictureHandler.bind(this);
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

	emailHandler(e){
		
		this.setState({email: e.target.value});
		User.email = e.target.value;
	};

	pictureHandler(e){
		
		e.preventDefault();
		const imageURL = URL.createObjectURL(this.pictureInput.current.files[0]);
		this.setState({picture: imageURL})
		User.picture = e.target.value;
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
							{(this.state.modify) ? <input id="profilFirstName" className="validate" type="text" value={this.state.lastName} onChange={this.lastNameHandler}/> : <p>{this.state.lastName}</p>}
							<label htmlFor="profilFirstName" className="active">Nom</label>
						</div>
						<div className="profil__input input-field">
							{(this.state.modify) ? <input id="profilLastName" className="validate" type="text" value={this.state.firstName} onChange={this.firstNameHandler}/> : <p>{this.state.firstName}</p>}
							<label htmlFor="profilLastName" className="active">Prénom</label>
						</div>
						<div className="profil__input input-field">
							{(this.state.modify) ? <input id="profilEmail" className="validate" type="email" value={this.state.email} onChange={this.emailHandler}/> : <p>{this.state.email}</p>}
							<label htmlFor="profilEmail" className="active">Email</label>
						</div>
						<label>
							<i className="material-icons">mode_edit</i>
					      <input type="checkbox" className="browser-default" checked={this.state.modify} onChange={this.modifyHandler}/>
					      <span>Modifier ?</span><br />
					    </label>
					    
					    
					    
						
						{(this.state.modify) ? <input className="btn" type="submit" value="Modifier mes infos"/> : null}
					</form>
				</main>
				
			</div>
			);
	};
}

export default Profil;