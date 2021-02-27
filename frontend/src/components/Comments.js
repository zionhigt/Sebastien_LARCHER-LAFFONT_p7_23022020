import React, { Component } from 'react';
import * as API from '../api/api.js';
class Comment extends Component {

	constructor(props)
	{
		super(props);
		this.state = {comments: null}
	}
	

	render(){
		return(
			<div className="comment">
				<div className="divider"></div>
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
		this.state = {comments: []};
		this.getComments = this.getComments.bind(this);
	}

	componentDidMount(){
		const elemCollapsible = document.querySelectorAll('.collapsible.collapsible-accordion');
		const collapsible = M.Collapsible.init(elemCollapsible);
	}
	getComments(){
		console.log(this.state.comments);
		if(this.state.comments.length == 0)
		{
			API.getCommentByPostId(this.props.post_id)
			.then(coms=>{
				if(coms.comments.length > 0)
				{
					const comments = coms.comments.map(comment => {
						const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
						let date = new Date(Date(comment.date))
						date = date.toLocaleDateString(undefined, options)+" à "+date.getHours()+"h"+date.getMinutes();
						console.log((this.props.post_id == 9) ? comment : "");

						return(
						     	<Comment key={comment.id} by={comment.firstName+" "+comment.lastName} date={date} text={comment.text} />
							);
					});
					this.setState({comments: comments});
					
						
				}
			})
			.catch(error=>{console.log(error)});
		}

	}

	render(){
		return(
			<ul className="collapsible collapsible-accordion z-depth-0">
				<li>
			      <div className="collapsible-header" onClick={this.getComments} ><i className="material-icons">comment</i>({this.props.numberOf}) Commentaire{(this.state.comments.length>1) ? 's':''}</div>
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

export default Comments;