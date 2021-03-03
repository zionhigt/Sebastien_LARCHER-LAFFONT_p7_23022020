import React, { Component } from 'react';

import usersData from '../data/usersData.js';
import postsData from '../data/postsData.js';
import User from '../data/userData.js';

import Header from './Header.js';
import OnlineUser from './OnlineUser.js';
import Post from './Post.js';
import PostBar from './PostBar.js';
import EditPost from './EditPost.js';

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
		this.state = {onlineUsers: [], posts: [], currentUser: {}, dataPosts: [] };
		this.onChange = this.onChange.bind(this);
		this.getAllPosts = this.getAllPosts.bind(this);
	}
	builtinPost(){
		const listPosts = this.state.dataPosts.map(post => {
				// const likes = JSON.parse(post.likes);
				let likes = post.likes.split('[').join("");
				likes = likes.split(']').join("");
				likes = likes.split(',');

				let dislikes = post.dislikes.split('[').join("");
				dislikes = dislikes.split(']').join("");
				dislikes = dislikes.split(',');
				const media = JSON.parse(post.media)
				const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				const date = new Date(post.date);
				return( <Post
					onChangePost={this.onChange}
					onUpdate={this.getAllPosts}
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
					currentUserPicture={this.state.currentUser.picture}
					currentUserId={this.state.currentUser.id}
					date={date.toLocaleDateString(undefined, options)+" à "+date.getHours()+"h"+date.getMinutes()}/>);
			});
			this.setState({posts: listPosts});
	};
	componentDidMount(){
		API.getProfil()
		.then(profil=>{
			if(profil.length != undefined)
			{
				profil = profil[0];
			}
			this.setState({currentUser: profil});
			console.log(profil.length, "here")
		})
		.catch(error=>{console.log(error)});
		
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
		
		this.getAllPosts();

		const elemDropDown = document.querySelectorAll('.dropdown-trigger');
		const dropDown = M.Dropdown.init(elemDropDown, {coverTrigger: false, alignment: 'right'});
		
		

	}

	getAllPosts(){
		API.posts()
		.then(posts => {
			if(posts.error)
			{
				window.location = "/?#/signin";
			}
			this.setState({dataPosts: posts.posts});
			this.builtinPost();
			const elemCircle = document.querySelectorAll('.card-header .circle, .card-footer .circle');

			elemCircle.forEach(elem => {
		    	elem.style.height = `${elem.width}px`;		    	
		    });
		})
		.catch(error => {console.log(error)});
	}

	onChange(e){
		let old_post = {};
		this.state.dataPosts.forEach(p => {
			if(p.id == parseInt(e))
			{
				old_post = p;
			}
		});
		API.getOnePost(e)
		.then(post => {
			console.log(post.post[0])
			const indexOfPost = this.state.dataPosts.indexOf(old_post);
			let newPosts = this.state.dataPosts;
			newPosts.splice(indexOfPost, 1, post.post[0]);
			this.setState({dataPosts: newPosts});
			this.builtinPost();
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
						
						<div className="row">{this.state.posts}</div>
						
					</section>
					<aside className="view__aside--right col s12 l3 row">
						<EditPost modal="modal1" onPosted={this.getAllPosts}/>
						<PostBar picture={this.state.currentUser.picture} firstName={this.state.currentUser.firstName} lastName={this.state.currentUser.lastName} />
					</aside>
				</main>
					
			</div>
			);
	};
}

export default Forum;