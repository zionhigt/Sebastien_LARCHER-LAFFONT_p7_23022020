import React, { Component } from 'react';


class Password extends Component {

	constructor(props){
		super(props);
		this.state = {watch: false};
		this.watchHandler = this.watchHandler.bind(this);
	}

	watchHandler(e){
		this.setState({watch: e.target.checked})
	}

	render(){
		let type = (this.state.watch == true) ? "text" : "password";
		let icon = (this.state.watch == true) ? "visibility" : "visibility_off";
		return(
			    <div className="input-field col s12">
							
					<input id={this.props.id + this.props.where} className="validate"  type={type} value={this.props.value} onChange={this.props.handler} />
					<label htmlFor={this.props.id + this.props.where}>{this.props.text}
					</label>
					<label htmlFor={this.props.id + "_checkbox"}><i className="material-icons eye">{icon}</i></label>
					<input id={this.props.id + "_checkbox"} type="checkbox" checked={this.state.watch} onChange={this.watchHandler}/>
				</div>
			);
	}
}

export default Password;