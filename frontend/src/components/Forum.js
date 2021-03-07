import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header.js';
import OnlineUser from './OnlineUser.js';
import Post from './Post.js';
import Nav from './Navigation.js';
import Disconnect from './Disconnect.js';
import PostBar from './PostBar.js';
import EditPost from './EditPost.js';

import * as API from '../api/api.js';
import { getUserProfil } from '../Store/actions/profilAction.js';
import { getOthers } from '../Store/actions/otherAction.js';
import { getAllPosts, getOnePost } from '../Store/actions/postsAction.js';


class Forum extends Component {
	constructor(props){
		super(props);
		this.state = {onlineUsers: [], posts: []};
		this.onChange = this.onChange.bind(this);
	}
	builtin(){
		const listPosts = this.props.posts.posts.map(post => {
				// const likes = JSON.parse(post.likes);
			let likes = post.likes.split('[').join("");
			likes = likes.split(']').join("");
			likes = likes.split(',');

			let dislikes = post.dislikes.split('[').join("");
			dislikes = dislikes.split(']').join("");
			dislikes = dislikes.split(',');
			let media = JSON.parse(post.media);
			if(!media)
			{
				media = {url: "", type: null};
			}
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			const timeOptions = { hour: "numeric", minute: "numeric", style: "currencyDisplay"};
			let date = new Date(Math.floor(post.date*1000))
			date = `${date.toLocaleDateString(undefined, options)} à ${date.toLocaleTimeString(undefined, timeOptions)}`.replace(':', 'h');
			return( <Post
				onUpdate={this.onChange}
				likes={likes}
				dislikes={dislikes}
				onlineColor={(post.userActive) ? "green":"red"} 
				postedBy={`${post.firstName} ${post.lastName}`}
				postedById={post.posted_by_id} 
				key={post.id} 
				idkey={post.id} 
				title={post.title} 
				media={media}
				text={post.description}
				userPicture={post.picture}
				commentCount={post.comment_count}
				currentUserPicture={this.props.profil.userProfil.picture}
				currentUserId={this.props.profil.userProfil.id}
				date={date}/>);
		});
		this.setState({posts: listPosts});
		const listOnlineUsers = this.props.other.others.map(user => {
			return( <OnlineUser 
				key={user.id} 
				picture={user.picture} 
				name={`${user.firstName} ${user.lastName}`}/>);
		});
		this.setState({onlineUsers: listOnlineUsers});
	};
	componentDidMount(){
		if(!this.props.profil.userProfil.id || !this.props.other.others || !this.props.posts.posts)
		{

			this.props.dispatch(getUserProfil());
			this.props.dispatch(getOthers());
			this.props.dispatch(getAllPosts());
			const elemCircle = document.querySelectorAll('img.circle');
			elemCircle.forEach(elem => {
				elem.style.height = `${elem.width}px`;		    	
			})

		}
		else
		{

			this.builtin();
		}

	}

	componentDidUpdate(prevProps) {
	  if (this.props.posts !== prevProps.posts) {
		this.builtin();
		const elemDropDown = document.querySelectorAll('.dropdown-trigger');
		const dropDown = M.Dropdown.init(elemDropDown, {coverTrigger: true, alignment: 'right'});
		const elemCircle = document.querySelectorAll('img.circle');
		elemCircle.forEach(elem => {
			elem.style.height = `${elem.width}px`;		    	
		})
	  }
	}

	onChange(id=false, scroll=true){
		const viewBox = document.getElementById('postView');
		if(scroll)
		{
			viewBox.scrollTo({top: 0})
		}
		

		id ? this.props.dispatch(getOnePost(id)) : this.props.dispatch(getAllPosts());
	}

	render(){
		return (
			<div>
				<Header loged={true} onlineUsers={this.state.onlineUsers} firstName={this.props.profil.userProfil.firstName} lastName={this.props.profil.userProfil.lastName} picture={this.props.profil.userProfil.picture}  onPosted={this.onChange} />
				<ul id="onlineList" className="collection dropdown-content col s12 z-depth-5">{this.state.onlineUsers}</ul>
				<main className="row">
					
					<section id="postView" className="view__center section col s12 m6 l6 offset-l1">
						
						<div className="row">{this.state.posts}</div>
						
					</section>
					<aside className="view__aside--right col l3 push-l1 row">
						<ul className="side">
						    <li>
							    <div className="user-view">
							      <div className="sidenav__profil row">
								    <img className="circle col s8 offset-s3" src={this.props.profil.userProfil.picture} />
								    <span className="bold col s12">{this.props.profil.userProfil.firstName} </span>
								    <span className="bold col s12">{this.props.profil.userProfil.lastName}</span>
							      	
							      </div>
								 </div>
							</li>
						    <li><div className="divider"></div></li>
						   	<li><Nav /></li>
						   	<li><EditPost modal="modalDesk" onPosted={this.onChange}/></li>
						   	<li><PostBar id="post_edit_desk" modal="modalDesk" /></li>
						   	<li><a className="dropdown-trigger btn col s12 online__list--button" data-target="onlineList">Membre en ligne</a></li>
						   	<li><Disconnect/></li>
			  			</ul>
						
						
					</aside>
				</main>
			</div>
		);
	};
}

const mapStateToProps = state => {return {...state}};

export default connect(mapStateToProps)(Forum);