import React, { Component } from 'react';
import * as API from '../api/api.js';
class Comment extends Component {

	constructor(props)
	{
		super(props);
		this.state = {comments: null};
		this.likeCommentHandler = this.likeCommentHandler.bind(this);
	}
	
	likeCommentHandler(like)
	{
		return (e => {

			API.likeComment(like, this.props.commentId)
			.then(() => {
				// window.location.reload(false);
				this.props.onLike(true);
			})
			.catch(error => {console.log(error)});
			});
	}

	render(){
		
		return(
			<div className="comment">
				<div className="divider"></div>
				<span className="align-left comment__name">{this.props.by}</span>
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
		this.state = {editComment: "", comments: [], commentsData: []};
		this.builtinComment = this.builtinComment.bind(this);
		this.getComments = this.getComments.bind(this);
		this.editCommentHandler = this.editCommentHandler.bind(this);
		this.submitCommentHandler = this.submitCommentHandler.bind(this);
	}

	componentDidMount(){
		const elemCollapsible = document.querySelectorAll('.collapsible.collapsible-accordion');
		const collapsible = M.Collapsible.init(elemCollapsible);
		
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
			     	<Comment commentId={comment.id} onLike={this.getComments} currentUserId={this.props.currentUserId} likes={likes} dislikes={dislikes} key={comment.id} by={comment.firstName+" "+comment.lastName} date={date} text={comment.text} />
				);
		});
		this.setState({comments: comments});
	};

	render(){

		return(
			<>
				{(this.props.numberOf>0 || this.state.comments.length>0) ?
				 <ul className="collapsible collapsible-accordion z-depth-0">
					<li>
				      <div className="collapsible-header" onClick={this.getComments} ><i className="material-icons">comment</i>({
				      (this.state.comments.length > this.props.numberOf) ?
				       this.state.comments.length :
				       this.props.numberOf}) Commentaire{(this.state.comments.length>1) ? 's':''}</div>
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