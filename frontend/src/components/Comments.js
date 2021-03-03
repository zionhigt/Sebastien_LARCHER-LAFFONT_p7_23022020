import React, { Component } from 'react';
import * as API from '../api/api.js';
import EditComment from './EditComment.js';


class Comment extends Component {

	constructor(props)
	{
		super(props);
		this.state = {comments: null};
		this.likeCommentHandler = this.likeCommentHandler.bind(this);
		this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
		this.updateHandler = this.updateHandler.bind(this);
	}
	
	componentDidMount()
	{
		const elemDropDown = document.querySelectorAll('.dropdown-trigger');
		const dropDown = M.Dropdown.init(elemDropDown, {coverTrigger: false, alignment: 'right'});
	}

	likeCommentHandler(like)
	{
		return (e => {

			API.likeComment(like, this.props.commentId)
			.then(() => {
				// window.location.reload(false);
				this.props.onChanged(true);
			})
			.catch(error => {console.log(error)});
			});
	}

	deleteCommentHandler(like)
	{
		API.deleteComment(this.props.commentId)
		.then(() => {
			// window.location.reload(false);
			this.props.onChanged(true);
		})
		.catch(error => {console.log(error)});
	}

	updateHandler(e)
	{
		e.preventDefault();
		
		const modal = document.getElementById(`modalComment${this.props.commentId}`);
		console.log(`modalComment${this.props.commentId}`);
    	const modalInstances = M.Modal.init(modal);
		modalInstances.open();
	}

	render(){
		
		return(
			<div className="comment">
				<div className="divider"></div>
				<div className="row">
					<span className="align-left comment__name col s11">{this.props.by}</span>
					{(this.props.currentUserId == this.props.posted_by_id)?
					<a className='dropdown-trigger col s1' href='#' data-target={`drop_comment_action_${this.props.commentId}`}><i className="material-icons">more_vert</i></a>
					 :null}
				</div>
				{(this.props.currentUserId == this.props.posted_by_id)?
					<ul id={`drop_comment_action_${this.props.commentId}`} className='dropdown-content'>
						<li><a onClick={this.updateHandler}><i className="material-icons">create</i>Modifier</a></li>
						<li className="divider"></li>
						<li><a onClick={this.deleteCommentHandler}><i className="material-icons">delete</i>Supprimer</a></li>
					</ul>
				 :
				 null}
				 <EditComment onUpdate={this.props.onChanged} id={this.props.commentId} text={this.props.text} />
				<p className="comment__text">{this.props.text}</p>
				<div className="row">
		       		<div className="like-palet col s6 valign-wrapper">
		       			<span className="valign-wrapper thumb">
		       				<i className={`material-icons ${(this.props.likes.indexOf(`${this.props.currentUserId}`) > -1) ? 'green-text' : null }`} onClick={this.likeCommentHandler(1)} >thumb_up</i>
		       				{(this.props.likes[0] != "") ? this.props.likes.length : null}
		       			</span>
		       			<span className="valign-wrapper thumb">
		       				<i className={`material-icons ${(this.props.dislikes.indexOf(`${this.props.currentUserId}`) > -1) ? 'red-text' : null }`} onClick={this.likeCommentHandler(-1)} >thumb_down</i>
		       				{(this.props.dislikes[0] != "") ? this.props.dislikes.length : null}
		       			</span>
		       			
		       		</div>

		       		<div className="card-footer__date col s6">
		       			<p>{this.props.date}</p>
		       		</div>


		       	</div>
			</div>
			);
	}
}

class Comments extends Component {

	constructor(props){
		super(props);
		this.state = {editComment: "", comments: [], commentsData: [], commentLength: 0};
		this.builtinComment = this.builtinComment.bind(this);
		this.getComments = this.getComments.bind(this);
		this.editCommentHandler = this.editCommentHandler.bind(this);
		this.submitCommentHandler = this.submitCommentHandler.bind(this);
	}

	componentDidMount(){
		const elemCollapsible = document.querySelectorAll('.collapsible.collapsible-accordion');
		const collapsible = M.Collapsible.init(elemCollapsible);
		this.setState({ commentLength: this.props.numberOf})
		
	}

	getComments(force=false){
		console.log(this.state.comments);
		if(this.state.comments.length == 0 || force)
		{
			API.getCommentByPostId(this.props.post_id)
			.then(coms=>{
				if(coms.comments.length > 0)
				{
					this.setState({commentsData: coms.comments});
					this.builtinComment();
				}
			})
			.catch(error=>{console.log(error)});
		}

	}

	submitCommentHandler(e){
		e.preventDefault();
		console.log(this.state.comment);
		const body = {
			text: this.state.editComment,
			post_id: this.props.post_id,
		};
		if(body.text != "")
		{
			API.sendComment(body)
			.then(() => {
				this.getComments(true);
				this.setState({editComment: ""})
			})
			.catch(error => {console.log(error)});
		}
	}

	editCommentHandler(e){

		this.setState({editComment: e.target.value});
	}

	builtinComment(){
		const comments = this.state.commentsData.map(comment => {

			// const likes = JSON.parse(post.likes);
			console.log(comment);
			let likes = comment.likes.split('[').join("");
			likes = likes.split(']').join("");
			likes = likes.split(',');

			let dislikes = comment.dislikes.split('[').join("");
			dislikes = dislikes.split(']').join("");
			dislikes = dislikes.split(',');

			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			let date = new Date(Date(comment.date))
			date = date.toLocaleDateString(undefined, options)+" à "+date.getHours()+"h"+date.getMinutes();
			console.log((this.props.post_id == 9) ? comment : "");


			return(
			     	<Comment
			     		posted_by_id={comment.profil_id}
			     	 	commentId={comment.id}
			     	 	onChanged={this.getComments}
			     	 	currentUserId={this.props.currentUserId}
			     	 	likes={likes}
			     	 	dislikes={dislikes}
			     	 	key={comment.id}
			     	 	by={`${comment.firstName} ${comment.lastName}`}
			     	 	date={date}
			     	 	text={comment.text} />
				);
		});
		this.setState({comments: comments, commentLength: comments.length});
	};

	render(){

		return(
			<>
				{(this.props.numberOf>0 || this.state.comments.length>0) ?
				 <ul className="collapsible collapsible-accordion z-depth-0">
					<li>
				      <div className="collapsible-header" onClick={this.getComments} ><i className="material-icons">comment</i>({this.state.commentLength}) Commentaire{(this.state.commentLength>1) ? 's':''}</div>
				      <ul className="collapsible-body">
				      	<li>
				      		{this.state.comments}
				      	</li>
				 	 </ul>
				    </li>
				</ul> :
				null}
				<div className="row valign-wrapper">
		    		<img className="circle col s2 m1 align-center responsive-img"  src={this.props.currentUserPicture} />
		    		<div className="input-field col s11">
		    			<input id={this.props.post_id + "_comment"} type="text" value={this.state.editComment} onChange={this.editCommentHandler} className="validate" />
		    			<label htmlFor={this.props.post_id + "_comment"}>Commentaire: </label>
		    			<input type="submit" value="Envoyer" onClick={this.submitCommentHandler} />
		    		</div>
		       		
		       	</div>

		       </>

			);
	}
}

export default Comments;