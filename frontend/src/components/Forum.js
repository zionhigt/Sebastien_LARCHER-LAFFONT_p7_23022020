import React, { Component } from 'react';

import usersData from '../data/usersData.js';
import postsData from '../data/postsData.js';
import User from '../data/userData.js';

import Header from './Header.js';
import OnlineUser from './OnlineUser.js';
import Post from './Post.js';
import PostBar from './PostBar.js';

import * as API from '../api/api.js'; 



class TopPosts extends Component {

	render(){
		return(

			<div className="col s12">
			    <div className="card horizontal">
			      <div className="card-image">
			        <img src="http:\/\/placehold.it/300x300" className=" responsive-img" />
			      </div>
			      <div className="card-stacked">
			        <div className="card-content">
			          <p>I am a very simple card. I am good at containing small bits of information.</p>
			        </div>
			        <div className="card-action">
			          <a href="#">This is a link</a>
			        </div>
			      </div>
			    </div>
			 </div>
			);
	};
}



class Forum extends Component {
	constructor(props){
		super(props);
		this.state = {onlineUsers: [], posts: [] };
	}
	componentDidMount(){
		API.other()
		.then(users =>{
			const listOnlineUsers = users.map(user => {
				return( <OnlineUser 
					key={user.id} 
					picture={user.picture} 
					name={`${user.firstName} ${user.lastName}`}/>);
			});
			this.setState({onlineUsers: listOnlineUsers});
		})
		.catch(error => {console.log(error)});
		

		API.posts()
		.then(posts => {
			if(posts.error)
			{
				window.location = "/?#/signin";
			}
			const listPosts = posts.posts.map(post => {
				const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				const date = new Date(post.date);
				return( <Post 
					onlineColor={(post.userActive) ? "green":"red"} 
					postedBy={`${post.firstName} ${post.lastName}`} 
					key={post.id} 
					idkey={post.id} 
					title={post.title} 
					picture={post.media} 
					text={post.description}
					userPicture={post.picture}
					commentCount={post.comment_count}
					date={date.toLocaleDateString(undefined, options)+" à "+date.getHours()+"h"+date.getMinutes()}/>);
			});
			this.setState({posts: listPosts});
			const elemCircle = document.querySelectorAll('.card-header .circle, .card-footer .circle');

			elemCircle.forEach(elem => {
		    	elem.style.height = `${elem.width}px`;		    	
		    });
		})
		.catch(error => {console.log(error)});
		

	}
	render(){
		return (
			<div className="main__wrapper">
				<Header loged={true}/>
				<main className="row">
					<aside className="view__aside--left col s12 l3">
						<div className="row center" id="onlineContainer">
							<a className="dropdown-trigger btn col s12" data-target="onlineList">En ligne <span>({this.state.onlineUsers.length})</span></a>
							<ul id="onlineList" className="collection dropdown-content col s12">{this.state.onlineUsers}</ul>
						</div>
					</aside>
					<section className="view__center section col s12 l6">
						<PostBar/>
						<div className="row">{this.state.posts}</div>
						
					</section>
					<aside className="view__aside--right col s12 l3 row">
						<p>Le top Hebdo <i className="material-icons">arrow_upward</i></p>
						<TopPosts />
					</aside>
				</main>

			</div>
			);
	};
}

export default Forum;