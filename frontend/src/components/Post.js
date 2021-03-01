import React, { Component } from 'react';
import * as API from '../api/api.js'; 

import Comments from './Comments.js';



class Post extends Component {

	constructor(props){

		super(props);
		this.state = {editComment: ""};
		this.editCommentHandler = this.editCommentHandler.bind(this);
		this.submitCommentHandler = this.submitCommentHandler.bind(this);
		this.likePostHandler = this.likePostHandler.bind(this);
	}

	editCommentHandler(e){

		this.setState({editComment: e.target.value});
	}

	submitCommentHandler(e){
		e.preventDefault();
		console.log(this.state.comment);
		const body = {
			text: this.state.editComment,
			post_id: this.props.idkey,
		};
		API.sendComment(body)
		.then(() => {})
		.catch(error => {console.log(error)});
	}

	likePostHandler(like)
	{
		return (e => {

			API.likePost(like, this.props.idkey)
			.then(() => {
				// window.location.reload(false);
				this.props.onLikePost(this.props.idkey)
			})
			.catch(error => {console.log(error)});
			});
	}

	render(){

		return (

			<div className="col s12" id={`post_${this.props.idkey}`} >

		      <div className="card">
		      	<div className="card-header valign-wrapper row">
		    		<img className="circle responsive-img col s2" src={this.props.userPicture} />
		      		<p className="col s10 valign-wrapper">
		      			<i className={"material-icons " + this.props.onlineColor + "-text"}>brightness_1</i>
		      			
		      			{this.props.postedBy}
		      		</p>
		      	</div>
		      	<span className="card-title col s12">{this.props.title}</span>
		        {(this.props.picture != "") ? <div className="card-image">
		        		          <img src={this.props.picture} className="responsive-img" />
		        		        </div> : null}
		        <div className="card-content">
		          <p>{this.props.text}</p>
		        </div>
		       <div className="card-footer">
		       	<div className="row">
		       		<div className="like-palet col s6 valign-wrapper">
		       			<span className="valign-wrapper thumb">
		       				<i className={`material-icons ${(this.props.likes.indexOf(`${this.props.currentUserId}`) > -1) ? 'green-text' : null }`} onClick={this.likePostHandler(1)}>thumb_up</i>
		       				{(this.props.likes[0] != "") ? this.props.likes.length : null}
		       			</span>
		       			<span className="valign-wrapper thumb">
		       				<i className={`material-icons ${(this.props.dislikes.indexOf(`${this.props.currentUserId}`) > -1) ? 'red-text' : null }`} onClick={this.likePostHandler(-1)}>thumb_down</i>
		       				{(this.props.dislikes[0] != "") ? this.props.dislikes.length : null}
		       			</span>
		       			
		       		</div>

		       		<div className="card-footer__date col s6">
		       			<p>{this.props.date}</p>
		       		</div>


		       	</div>
		       	{(this.props.commentCount > 0) ? <Comments post_id={this.props.idkey} numberOf={this.props.commentCount} /> : null}
		       	<div className="row valign-wrapper">
		    		<img className="circle col s2 m1 align-center responsive-img"  src={this.props.currentUserPicture} />
		    		<div className="input-field col s11">
		    			<input id={this.props.idkey + "_comment"} type="text" value={this.state.editComment} onChange={this.editCommentHandler} className="validate" />
		    			<label htmlFor={this.props.idkey + "_comment"}>Commentaire: </label>
		    			<input type="submit" value="Envoyer" onClick={this.submitCommentHandler} />
		    		</div>
		       		
		       	</div>
		       </div>
		      </div>
		    </div>

			);
	};
}

export default Post;