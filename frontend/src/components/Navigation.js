import React, { Component } from 'react';
import {NavLink, Route, HashRouter} from 'react-router-dom';


class Nav extends Component {

	render (){

		return (

			<HashRouter>
			<div className="white card-panel nav">
				<div className="icon__group">
					<NavLink to="/at">
						<i className="material-icons">group</i>
					</NavLink>
					<NavLink to="/coffee">  
						<i className="material-icons">free_breakfast</i>
					</NavLink>
					<NavLink to="/schedule">
						<i className="material-icons">schedule</i>
					</NavLink>
				</div>

				<NavLink to="/forum">
					<i className="material-icons">public</i>
				</NavLink>

				<div className="icon__group">
					<NavLink to="/setting">
						<i className="material-icons">settings</i>
					</NavLink>
					
					<NavLink to="/home">
						<i className="material-icons">home</i>
					</NavLink>
					<NavLink to="/profil">
						<i className="material-icons">person</i>
					</NavLink>
				</div>
				
				
				
			</div>
			</HashRouter>
			);
	};
}

export default Nav;