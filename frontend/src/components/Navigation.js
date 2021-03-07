import React, { Component } from 'react';
import {NavLink, Route, HashRouter} from 'react-router-dom';


class Nav extends Component {

	render (){

		return (

			<>
			<div className="white card-panel nav row">
				<div className="icon__group col s4">
					<NavLink to="/extras/at">
						<i className="material-icons" onClick={this.props.closeAction} >group</i>
					</NavLink>
					<NavLink to="/extras/coffee">  
						<i className="material-icons" onClick={this.props.closeAction} >free_breakfast</i>
					</NavLink>
					<NavLink to="/extras/schedule">
						<i className="material-icons" onClick={this.props.closeAction} >schedule</i>
					</NavLink>
				</div>
				<div className="icon__group col s4">
					<NavLink to="/forum">
						<i className="material-icons" onClick={this.props.closeAction} >public</i>
					</NavLink>
				</div>

				<div className="icon__group col s4">
					<NavLink to="/extras/setting">
						<i className="material-icons" onClick={this.props.closeAction} >settings</i>
					</NavLink>
					
					<NavLink to="/extras/home">
						<i className="material-icons" onClick={this.props.closeAction} >home</i>
					</NavLink>
					<NavLink to="/profil">
						<i className="material-icons" onClick={this.props.closeAction} >person</i>
					</NavLink>
				</div>
				
				
				
			</div>
			</>
			);
	};
}

export default Nav;