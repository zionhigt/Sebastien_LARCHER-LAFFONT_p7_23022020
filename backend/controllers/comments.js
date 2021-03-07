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
	Comments.sendComment(body)
	.then(comments => {
		res.status(200).json({message: "Commentaire publié"});
	})
	.catch(error => {res.status(403).json({ error })});
};

exports.updateOne = (req, res) => {
	
	Comments.getOneById(parseInt(req.params.id))
	.then(c => {
		const old_comment = c[0];
		if(old_comment.profil_id == req.session.profil.id)
		{
			Comments.updateOneComment(req.body.text, parseInt(req.params.id))
			.then(() => {
				
				res.status(200).json({message: "Commentaire Mis a jour !"});		
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

exports.likeHandler = (req, res) => {
	switch(req.body.like)
	{
		case 1:
			Comments.getLikesDislikes(parseInt(req.params.id))
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
				Comments.updateLikesDislikes(JSON.stringify(likes), JSON.stringify(dislikes), parseInt(req.params.id))
				.then(() => {res.status(200).json({message: returnMessage})})
				.catch(error => res.status(500).json({ error }));
			})
			.catch(error => res.status(401).json({ error }))
			break;
		case -1:
			Comments.getLikesDislikes(parseInt(req.params.id))
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
				Comments.updateLikesDislikes(JSON.stringify(likes), JSON.stringify(dislikes), parseInt(req.params.id))
				.then(() => {res.status(200).json({message: returnMessage})})
				.catch(error => {res.status(500).json({ error })});
			})
			.catch(error => res.status(401).json({ error }))
			break;
		default:
			res.status(302).json({error: "impossible d'effectuer cette action"})

	}
};

exports.deleteOne = (req, res) => {

	Comments.getOneById(parseInt(req.params.id))
	.then(c => {
		const old_comment = c[0];
		if(old_comment.profil_id == req.session.profil.id)
		{
			
			Comments.deleteOneComment(parseInt(req.params.id))
			.then(() => {
				
				res.status(200).json({message: "Commentaire Supprimé !"});		
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