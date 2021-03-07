import React, { Component } from 'react';
import Nav from './Navigation.js';
import Disconnect from './Disconnect.js';
import PostBar from './PostBar.js';
import EditPost from './EditPost.js';


class Header extends Component {
	constructor(props){
		super(props);
		this.closeSidenav = this.closeSidenav.bind(this);
	}
	componentDidMount()
	{
		const elems = document.querySelectorAll('.sidenav');
    	const instances = M.Sidenav.init(elems);
	}
	closeSidenav()
	{
    	this.props.profil ? null :this.props.onPosted();
		const elems = document.querySelectorAll('.sidenav');
    	const instances = M.Sidenav.init(elems);
    	try
    	{
    		instances.destroy();
    	}
    	catch(error)
    	{
    		return 0;
    	}
	}

	render(){
		return (
			<div>
				<header className="nav-wrapper grey lighten-4">
				<nav>
					<img className="logo brand-logo" src="./image/logo.svg"/>
					{ (this.props.loged) ? <a href="#" data-target="slide-out-header" className="sidenav-trigger"><i className="material-icons red-text">menu</i></a> : null }
					
				</nav>

				
				</header>
				{(this.props.loged) ? 
				<ul id="slide-out-header" className="sidenav side">
				    {this.props.profil ? null : 
				    <li>
					    <div className="user-view">
					      <div className="sidenav__profil row">
					      	<div className="col s8 offset-s4">
						    	<img className="circle z-depth-2" src={this.props.picture} />
						    </div>
						    <span className="bold col s12 center">{this.props.firstName} </span>
						    <span className="bold col s12 center">{this.props.lastName}</span>
					      	
					      </div>
						 </div>
					</li>}
				    <li><div className="divider"></div></li>
				   	<li>{ (this.props.loged) ? <Nav closeAction={this.closeSidenav}/> : null }</li>
				   	
					<li><PostBar id="post_edit_header" modal="modalHead"/></li>

				   	<li><a className="dropdown-trigger btn col s12 online__list--button" data-target="onlineList-header">Membre en ligne</a></li>
				   	<li>{ (this.props.loged) ? <Disconnect closeAction={this.closeSidenav} /> : null }</li>
				   	<ul id="onlineList-header" className="collection dropdown-content col s12 z-depth-5">{this.props.onlineUsers}</ul>
				  </ul> : null}
				  <EditPost modal="modalHead" onPosted={this.closeSidenav}/>
			  </div>
			);
	};

}

class Content extends Component {

	render(){
		return (
			<>
			<div>

				{ (this.props.panel) ? <Disconnect/> : null }
				{ (this.props.panel) ? <Nav /> : null }

			</div>
			</>
			);
		
	};
}




export default Header;