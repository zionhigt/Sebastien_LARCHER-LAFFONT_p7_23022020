import React, { Component } from 'react';

import * as API from '../api/api.js';

import Password from './Password.js';
import Header from './Header.js';


class Signin extends Component {

	constructor(props)
	{
		super(props);
		this.state = {email: "", password: "", error: ""};
		this.submitHandler = this.submitHandler.bind(this);
		this.emailHandler = this.emailHandler.bind(this);
		this.passwordHandler = this.passwordHandler.bind(this);
	};

	submitHandler(e)
	{
		e.preventDefault();
		if(this.state.email != "")
		{
			API.signin({email: this.state.email, password: this.state.password})
			.then(res => {
				if(res.error)
				{
					throw res.error
				}
				window.location = "/?#/forum";
			})
			.catch(error => {
				this.setState({error: error})
		});
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
	};

	passwordHandler(e){
		this.setState({password: e.target.value});
	};

	render(){
		
		return (
			<>
			<Header loged={false}/>
			<main>
				<form onSubmit={this.submitHandler}>
					<div className="row">
						
						<div className="input-field col s12">
							<input id="email_signin"className="validate" type="email" value={this.state.email} onChange={this.emailHandler}/>
							<label htmlFor="email_signin">Email</label>
						</div>
						<Password where="_signin" id="password" value={this.state.password} handler={this.passwordHandler} text="Mot de passe"/>
						
						<div className="row">
							<p className="red-text">{(this.state.error != "") ? this.state.error : null}</p>
							<button type="submit" className="btn waves-effect waves-light col s6">Se connecter</button>
							<p className="col s6 right-align"><a href="/#/signup">Pas encore inscrit ?</a></p>	
						</div>
					</div>
				</form>
			</main>
			</>
			);
	};
}


export default Signin;