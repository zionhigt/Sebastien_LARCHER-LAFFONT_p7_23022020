import React, { Component } from 'react';
class OnlineUser extends Component {

	render (){

		return (
			
			<li className="collection-item avatar valign-wrapper">
		      <img src={this.props.picture} className="circle responsive-img" />
		      <span className="title">{this.props.name}</span>
		      <a href="#!" className="secondary-content"><i className="material-icons">person_add</i></a>
		    </li>
			);
	}
}

export default OnlineUser;