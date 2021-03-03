import React, { Component } from 'react';
import * as API from '../api/api.js'; 

import Comments from './Comments.js';
import EditPost from './EditPost.js';



class Post extends Component {

	constructor(props){

		super(props);
		this.state = {postId: ""};
		this.likePostHandler = this.likePostHandler.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
	}

	deleteHandler(e)
	{
		e.preventDefault();
		API.deleteOnePost(this.props.idkey)
		.then(message => {this.props.onUpdate()})
		.catch(error => {});
	}

	updateHandler(e)
	{
		e.preventDefault();
		
		const modal = document.getElementById(`modalUpdatePost${this.props.idkey}`);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.open();
	}

	componentDidMount()
	{
		this.setState({postId: this.props.idkey})
		const elemDropDown = document.querySelectorAll('.dropdown-trigger');
		const dropDown = M.Dropdown.init(elemDropDown, {coverTrigger: false, alignment: 'right'});
	}

	likePostHandler(like)
	{
		return (e => {

			API.likePost(like, this.props.idkey)
			.then(() => {
				// window.location.reload(false);
				this.props.onChangePost(this.props.idkey)
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
		      		<p className="col s8 valign-wrapper post__name">
		      			{(this.props.currentUserId == this.props.postedById) ? null : <i className={"material-icons " + this.props.onlineColor + "-text"}>brightness_1</i>}
		      			
		      			{this.props.postedBy}
		      		</p>
		      		{(this.props.currentUserId == this.props.postedById) ? 
		      			<><a className='dropdown-trigger' href='#' data-target={`drop_post_action_${this.props.idkey}`}><i className="material-icons">more_vert</i></a>
		      			<ul id={`drop_post_action_${this.props.idkey}`} className='dropdown-content'>
							<li><a onClick={this.updateHandler} ><i className="material-icons">create</i>Modifier</a></li>
							<li className="divider"></li>
							<li><a onClick={this.deleteHandler} ><i className="material-icons">delete</i>Supprimer</a></li>
						</ul></>:
						 null }					
					<EditPost text={this.props.text} title={this.props.title} postPicture={this.props.media.url} modal={`modalUpdatePost${this.props.idkey}`} onPosted={this.props.onChangePost} />

			  	</div>
		      	<span className="card-title col s12">{this.props.title}</span>
		        {(typeof(this.props.media) == "object") ? 
		        				<div className="card-image">
		        					{(this.props.media.type == "video") ?
		        					<video width="100%" controls src={this.props.media.url}></video> : 
		        					null}

		        					{(this.props.media.type == "audio") ?
		        					<audio width="100%" controls src={this.props.media.url}></audio> : 
		        					null}

		        					{(this.props.media.type == "image") ?
		        					<img src={this.props.media.url} className="responsive-img" /> : 
		        					null}
		        		        </div> :
		        		         null}
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
		       	<Comments post_id={this.props.idkey} numberOf={this.props.commentCount} currentUserId={this.props.currentUserId} currentUserPicture={this.props.currentUserPicture} />
		       	
		       </div>
		      </div>
		    </div>

			);
	};
}

export default Post;