import React, { Component } from 'react';
import Header from './Header.js';
import usersData from '../data/usersData.js';
import postsData from '../data/postsData.js';
import User from '../data/userData.js';

import * as API from '../api/api.js'; 

class OnlineUser extends Component {

	render (){

		return (
			
			<li className="collection-item avatar">
		      <img src={this.props.picture} className="circle responsive-img" />
		      <span className="title">{this.props.name}</span>
		      <a href="#!" className="secondary-content"><i className="material-icons">person_add</i></a>
		    </li>
			);
	}
}

class Comment extends Component {

	render(){
		return(
			<div>
				<span className="align-left comment__name">{this.props.by}</span>
				<p>{this.props.text}</p>
				<span className="align-right comment__date">{this.props.date}</span>
				<div className="divider"></div>
			</div>
			);
	}
}

class Comments extends Component {

	constructor(props){
		super(props);
		this.state = {comments: []}
	}
	componentDidMount(){
		const comments = this.props.comments.map(comment => {
			const date = new Date(comment.date);
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

			return(
			     	<Comment key={comment.id} by={comment.firstName+" "+comment.lastName} date={date.toLocaleDateString(undefined, options)+" à "+date.getHours()+"h"+date.getMinutes()} text={comment.text}/>
				);
		});
		this.setState({comments: comments});
		const elemCollapsible = document.querySelectorAll('.collapsible.collapsible-accordion');
    	const collapsible = M.Collapsible.init(elemCollapsible);
	}

	render(){
		return(
			<ul className="collapsible collapsible-accordion z-depth-0">
				<li>
			      <div className="collapsible-header"><i className="material-icons">comment</i>({this.state.comments.length}) Commentaire{(this.state.comments.length>1) ? 's':''}</div>
			      <ul className="collapsible-body">
			      	<li>
			      		{this.state.comments}
			      	</li>
			 	 </ul>
			    </li>
			</ul>
			);
	}
}

class Post extends Component {

	constructor(props){

		super(props);
		this.state = {editComment: "", comments: null};
		this.editCommentHandler = this.editCommentHandler.bind(this);
	}

	componentDidMount(){
		API.getCommentByPostId(this.props.idkey)
		.then(coms=>{
			if(coms.comments.length > 0)
			{

				this.setState({comments: coms.comments})
			}
		})
		.catch(error=>{console.log(error)});
	}
	editCommentHandler(e){

		this.setState({editComment: e.target.value});
	}

	render(){

		return (

			<div className="col s12">

		      <div className="card">
		      	<div className="card-header row">
		    		<img className="circle responsive-img col s2"  src={this.props.userPicture} />
		      		<p className="col s10">
		      			<span className="circle">
		      				<i className={"material-icons " + this.props.onlineColor + "-text"}>brightness_1</i>
		      			</span>
		      			{this.props.postedBy}
		      		</p>
		      		<span className="card-title col s12">{this.props.title}</span>
		      	</div>
		        <div className="card-image">
		          <img src={this.props.picture} className="responsive-img" />
		        </div>
		        <div className="card-content">
		          <p>{this.props.text}</p>
		        </div>
		       <div className="card-footer">
		       	<div className="row">
		       		<div className="like-palet col s6">
		       			<i className="material-icons">thumb_up</i>
		       			<i className="material-icons">thumb_down</i>
		       			
		       		</div>

		       		<div className="card-footer__date col s6">
		       			<p>{this.props.date}</p>
		       		</div>

		       		{(this.state.comments != null) ? <Comments comments={this.state.comments} /> : null}

		       	</div>
		        <div className="divider"></div>
		       	<div className="row">
		    		<img className="circle col s1 align-center responsive-img"  src={this.props.picture} />
		    		<div className="input-field col s11">
		    			<input id={this.props.idkey + "_comment"} type="text" value={this.state.editComment} onChange={this.editCommentHandler} className="validate" />
		    			<label htmlFor={this.props.idkey + "_comment"}>Commentaire: </label>
		    		</div>
		       		
		       	</div>
		       </div>
		      </div>
		    </div>

			);
	};
}

class TopPosts extends Component {

	render(){
		return(

			<div className="col s12">
			    <div className="card horizontal">
			      <div className="card-image">
			        <img src="http:\/\/placehold.it/300x300" className="responsive-img" />
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

class PostBar extends Component {

	render(){

		return(
			<div className="card-panel row">
				<div className="col s12 row valign-wrapper">
		    		<img className="circle col s1 responsive-img"  src={this.props.picture} />
					<h5 className="col s11">{User.firstName} {User.lastName}</h5>
				</div>
				<div className="col s12">
					<textarea id="postEdit"className=""></textarea>
					<div className="edit__palet">
						<label htmlFor="postEdit"><i className="material-icons edit_icon">mode_edit</i></label>
						<i className="material-icons">attachment</i>
						<i className="material-icons">panorama</i>
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
					name={user.firstName+" "+user.lastName}/>);
			});
			this.setState({onlineUsers: listOnlineUsers});
		})
		.catch(error => {console.log(error)});
		

		API.posts()
		.then(posts => {
			const listPosts = posts.posts.map(post => {
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			const date = new Date(post.date);
			return( <Post 
				onlineColor={(post.userActive) ? "green":"red"} 
				postedBy={post.firstName+" "+post.lastName} 
				key={post.id} 
				idkey={post.id} 
				title={post.title} 
				picture={post.media} 
				text={post.description}
				userPicture={post.picture}
				date={date.toLocaleDateString(undefined, options)+" à "+date.getHours()+"h"+date.getMinutes()}/>);
			});
			this.setState({posts: listPosts});
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
						<PostBar picture={User.picture}/>
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