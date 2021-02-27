const Comments = require('../models/Comments');

exports.getCommentsByPostId = (req, res)=>{
	Comments.getByPostId(req.params.id)
	.then(comments => {
		res.status(200).json({ comments });
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.postComment = (req, res) => {
	const body = { 
		...req.body,
		 user_id: req.session.user.id,
	}
	console.log(body);
	Comments.sendComment(body)
	.then(comments => {
		res.status(200).json({message: "Commentaire publié"});
	})
	.catch(error => {res.status(403).json({ error })});
};