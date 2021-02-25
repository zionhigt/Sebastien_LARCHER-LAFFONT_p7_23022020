const Posts = require('../models/Posts');

exports.getAll = (req, res)=>{

	Posts.getPosts()
	.then(posts => {
		res.status(200).json({ posts });
	})
	.catch(error => {res.status(403).json({ error })});
};