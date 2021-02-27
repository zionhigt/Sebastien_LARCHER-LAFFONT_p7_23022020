import React, { Component } from 'react';
import * as API from '../api/api.js'
import Password from './Password.js'

class Form extends Component {

	constructor(props){
		super(props);
		this.state = {firstName: "", lastName: "", email: "", password: "", confirmPassword: "", error: ""};

		this.submitHandler = this.submitHandler.bind(this);
		this.emailHandler = this.emailHandler.bind(this);
		this.passwordHandler = this.passwordHandler.bind(this);
		this.firstNameHandler = this.firstNameHandler.bind(this);
		this.lastNameHandler = this.lastNameHandler.bind(this);
		this.confirmPasswordHandler = this.confirmPasswordHandler.bind(this);
	}
	
	submitHandler(e)
	{
		e.preventDefault();
		if(this.state.error == "" && this.state.email != "")
		{
			let body = {email: this.state.email, password: this.state.password};
			if(this.state.firstName != "" && this.state.lastName != "")
			{
				body = {
					...body,
					firstName: this.state.firstName,
					lastName: this.state.lastName
				}
			}
			API.signup(body)
			.then(res => {
				if(res.error)
				{
					this.setState({error: res.error})
				}
				else
				{
					this.setState({error: ""});
					console.log(res.isProfil);
					window.location = "/?#/signin"
				}
			})
			.catch(error => {console.log(error)});
		}
		else
		{
			if(this.state.email == "")
			{
				this.setState({error: "l'adresse email est obligatoire"})
			}
		}
	}

	emailHandler(e){
		this.setState({email: e.target.value});
	}
	firstNameHandler(e){
		this.setState({firstName: e.target.value});
	}
	lastNameHandler(e){
		this.setState({lastName: e.target.value});
	}

	passwordHandler(e){
		this.setState({password: e.target.value});
		if(this.state.confirmPassword == e.target.value)
		{
			this.setState({error: ""});
		}
		else
		{
			this.setState({error: "Le mot de passe n'est pas confirmé"});

		}
	}

	confirmPasswordHandler(e){
		this.setState({confirmPassword: e.target.value});
		if(e.target.value == this.state.password)
		{
			this.setState({error: ""});
		}
		else
		{
			this.setState({error: "Le mot de passe n'est pas confirmé"});

		}
	}

	render(){

		return (
			<div className="center">
				<p>Créer un compte ?</p>
				<form onSubmit={this.submitHandler}>
					<div className="row">
				        <div className="input-field col s6">
				          <input id="first_name_signup" type="text" className="validate" value={this.state.firstName} onChange={this.firstNameHandler} />
				          <label htmlFor="first_name_signup">Prénom</label>
				        </div>
				        <div className="input-field col s6">
				          <input id="last_name_signup" type="text" className="validate" value={this.state.lastName} onChange={this.lastNameHandler} />
				          <label htmlFor="last_name_signup">Nom</label>
				        </div>
				     </div>
				     <div className="row">
						<div className="input-field col s12">
							
							<input id="email_signup" className="validate" type="email" value={this.state.email} onChange={this.emailHandler} />
							<label htmlFor="email_signup">Email</label>
						</div>

						<Password where="_signup" id="password" value={this.state.password} handler={this.passwordHandler} text="Mot de passe"/>
						<Password where="_signup" id="confirm" value={this.state.confirmPassword} handler={this.confirmPasswordHandler} text="Confirmation du mot de passe"/>

				     </div>

				     <p className="red-text">{(this.state.error != "") ? this.state.error : null}</p>
					<button type="submit" className="btn waves-effect waves-light" onClick={this.submiHandler}>S'inscrire</button>
				</form>
			</div>
			);
	};
}


class Singup extends Component {

	render (){
		return (
			<Form />
			);
	};
}

export default Singup;