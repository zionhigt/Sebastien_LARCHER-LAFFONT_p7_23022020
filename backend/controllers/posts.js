const Posts = require('../models/Posts');
const fs = require('fs');


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
		res.status(200).json({ post });
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.posting = (req, res) => {
	let body = JSON.parse(req.body.body)
	let post = {
		title: (body.title) ? body.title : null,
		description: (body.text || body.text == "") ? body.text : null,
		profil_id: (req.session.profil.id) ? req.session.profil.id : null
	}
	if(req.file != undefined)
	{
		const imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		post = {
			...post,
			media: JSON.stringify({url: imagePath, type: req.file.mimetype.split('/')[0]}),
			
		}
	}
	Object.keys(post).forEach(k => {
		if(post[k] == null)
		{
			delete post[k]
		}
	});
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

exports.updateOne = (req, res) => {

	let body = JSON.parse(req.body.body)
	let isMedia = false;
	let post = {
		title: (body.title) ? body.title : null,
		description: (body.text || body.text == "") ? body.text : null,
	}
	if(req.file != undefined)
	{
		const imagePath = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
		isMedia = true;
		post = {
			...post,
			media: JSON.stringify({url: imagePath, type: req.file.mimetype.split('/')[0]}),
			
		}
		
	}
	Posts.getOnePost(parseInt(req.params.id))
	.then(p => {
		const old_post = p[0];
		if(isMedia)
		{
			const URL = JSON.parse(old_post.media).url;
			const filename = URL.split('/images/')[1];
			fs.unlink(`images/${filename}`, ()=>{});
		}
		if(old_post.posted_by_id == req.session.profil.id)
		{
			Posts.updateOnePost(post , parseInt(req.params.id))
			.then(() => {
				
				res.status(200).json({message: "Post mis a jour !"});		
			})
			.catch(error => {console.log(error); res.status(500).json({ error })});
		}
		else
		{
			res.status(403).json({error: "Vous n'avez pas les droits requis !" })
		}
	})
	.catch(error => {console.log(error); res.status(500).json({ error })});

	

};

exports.deleteOne = (req, res) => {

	Posts.getOnePost(parseInt(req.params.id))
	.then(p => {
		const old_post = p[0];
		const media = JSON.parse(old_post.media);
		let path;
		if(media)
		{
			const filename = media.url.split('/images/')[1];
			path = `images/${filename}`;
		}
		else
		{
			path = "";
		}
		fs.unlink(path, ()=>{
			if(old_post.posted_by_id == req.session.profil.id)
			{
				
				Posts.deleteOnePost(parseInt(req.params.id))
				.then(() => {
					
					res.status(200).json({message: "Post Supprimé !"});		
				})
				.catch(error => {console.log(error); res.status(500).json({ error })});
			}
			else
			{
				res.status(403).json({error: "Vous n'avez pas les droits requis !" })
			}
		});
		
	})
	.catch(error => {console.log(error); res.status(500).json({ error })});

	

};