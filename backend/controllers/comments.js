const Comments = require('../models/Comments');

exports.getCommentsByPostId = (req, res)=>{
	Comments.getByPostId(req.params.id)
	.then(comments => {
		res.status(200).json({ comments });
	})
	.catch(error => {res.status(403).json({ error })});
};