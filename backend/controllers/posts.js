const Posts = require('../models/Posts');


exports.getAll = (req, res)=>{
	Posts.getPosts()
	.then(posts => {
		res.status(200).json({ posts });
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.getOne = (req, res)=>{
	Posts.getOnePost(parseInt(req.params.id))
	.then(post => {
		console.log(post);
		res.status(200).json({ post });
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.posting = (req, res) => {
	
	let body = JSON.parse(req.body.body)
	let post = {
		title: (body.title) ? body.title : null,
		description: (body.text) ? body.text : null,
		profil_id: (req.session.profil.id) ? req.session.profil.id : null
	}
	if(req.file != undefined)
	{
		const imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		post = {

			media: imagePath,
			
		}
	}
	Object.keys(post).forEach(k => {
		if(post[k] == null)
		{
			delete post[k]
		}
	});
	console.log(post);
	Posts.sendPost(post)
	.then(() => {
		res.status(200).json({message: "Post publié"});
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.likeHandler = (req, res) => {
	switch(req.body.like)
	{
		case 1:
			Posts.getLikesDislikes(parseInt(req.params.id))
			.then(arrays => {
				let likes = JSON.parse(arrays[0].likes);
				let dislikes = JSON.parse(arrays[0].dislikes);
				const indexOfLikes = likes.indexOf(req.session.profil.id);
				const indexOfDislikes = dislikes.indexOf(req.session.profil.id);
				let returnMessage = "";
				if(indexOfLikes > -1)
				{
					likes.splice(indexOfLikes, 1);
					returnMessage = "Vous n'avez plus d'avis sur ce post !";
				}
				else
				{
					likes.push(req.session.profil.id);
					returnMessage = "Vous aimez ce post";
				}
				if(indexOfDislikes > -1)
				{
					dislikes.splice(indexOfDislikes, 1);
				}
				console.log(indexOfLikes);
				Posts.updateLikesDislikes(JSON.stringify(likes), JSON.stringify(dislikes), parseInt(req.params.id))
				.then(() => {res.status(200).json({message: returnMessage})})
				.catch(error => res.status(500).json({ error }));
			})
			.catch(error => res.status(401).json({ error }))
			break;
		case -1:
			Posts.getLikesDislikes(parseInt(req.params.id))
			.then(arrays => {
				let likes = JSON.parse(arrays[0].likes);
				let dislikes = JSON.parse(arrays[0].dislikes);
				const indexOfLikes = likes.indexOf(req.session.profil.id);
				const indexOfDislikes = dislikes.indexOf(req.session.profil.id);
				let returnMessage = "";
				if(indexOfDislikes > -1)
				{
					dislikes.splice(indexOfDislikes, 1);
					returnMessage = "Vous n'avez plus d'avis sur ce post !";
				}
				else
				{
					dislikes.push(req.session.profil.id);
					returnMessage = "Vous n'aimez pas ce post";
				}
				if(indexOfLikes > -1)
				{
					likes.splice(indexOfLikes, 1);
				}
				Posts.updateLikesDislikes(JSON.stringify(likes), JSON.stringify(dislikes), parseInt(req.params.id))
				.then(() => {res.status(200).json({message: returnMessage})})
				.catch(error => {res.status(500).json({ error })});
			})
			.catch(error => res.status(401).json({ error }))
			break;
		default:
			res.status(302).json({error: "impossible d'effectuer cette action"})

	}
};