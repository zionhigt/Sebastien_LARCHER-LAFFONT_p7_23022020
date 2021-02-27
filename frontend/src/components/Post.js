import React, { Component } from 'react';
import * as API from '../api/api.js'; 

import Comments from './Comments.js';



class Post extends Component {

	constructor(props){

		super(props);
		this.state = {editComment: ""};
		this.editCommentHandler = this.editCommentHandler.bind(this);
		this.submitCommentHandler = this.submitCommentHandler.bind(this);
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

	render(){

		return (

			<div className="col s12">

		      <div className="card">
		      	<div className="card-header valign-wrapper row">
		    		<img className="circle responsive-img col s2" src={this.props.userPicture} />
		      		<p className="col s10 valign-wrapper">
		      			<i className={"material-icons " + this.props.onlineColor + "-text"}>brightness_1</i>
		      			
		      			{this.props.postedBy}
		      		</p>
		      	</div>
		      	<span className="card-title col s12">{this.props.title}</span>
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


		       	</div>
		       	{(this.props.commentCount > 0) ? <Comments post_id={this.props.idkey} numberOf={this.props.commentCount} /> : null}
		       	<div className="row valign-wrapper">
		    		<img className="circle col s2 m1 align-center responsive-img"  src={this.props.picture} />
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